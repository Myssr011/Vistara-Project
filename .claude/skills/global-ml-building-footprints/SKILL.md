---
name: global-ml-building-footprints
description: "Skill untuk memakai dataset Microsoft Global ML Building Footprints (1,4 miliar footprint bangunan dunia hasil deteksi ML dari citra Bing Maps, lisensi CDLA Permissive 2.0) — unduh per negara/quadkey, konversi ke GeoJSON, filter area (mis. Makassar), dan integrasi ke peta web/GIS. Use Microsoft's Global ML Building Footprints dataset: download building polygons by country/quadkey, convert GeoJSONL to GeoJSON, filter by bounding box, and integrate with web maps (OSMBuildings, Leaflet, deck.gl) or GIS (QGIS/ArcGIS). Use when asked about building footprints, ML-detected buildings, GlobalMLBuildingFootprints, atau data bangunan untuk peta."
---

# Global ML Building Footprints (Microsoft)

Dataset terbuka **1,4 miliar footprint bangunan** hasil deteksi deep learning dari citra Bing Maps (Maxar, Airbus, IGN France, Vexcel; 2014–2024/2025). Repo: <https://github.com/microsoft/GlobalMLBuildingFootprints>.

## Fakta kunci

| Hal | Nilai |
|---|---|
| Lisensi | **CDLA Permissive 2.0** (bebas dipakai, sertakan atribusi lisensi) |
| CRS | **EPSG:4326** (lat/lon) |
| Format | Line-delimited GeoJSON (**GeoJSONL**) di dalam file **`.csv.gz`** (isi sebenarnya geojsonl — perlu di-gunzip & di-rename) |
| Partisi | Per **negara + Bing quadkey level 9** (±30.340 tile, 225 region) |
| Properti fitur | `height` (meter; **-1 = tidak ada estimasi**), `confidence` (0–1; **-1 = placeholder** untuk rilis lama) |
| Indeks unduhan | `dataset-links.csv` — kolom `Location`, `QuadKey`, `Url`, `Size` |
| Cakupan Indonesia | Ada (gabungan rilis [IdMyPhBuildingFootprints](https://github.com/microsoft/IdMyPhBuildingFootprints)) — relevan untuk Makassar/Borong Indah |

**URL `dataset-links.csv`** berpindah-pindah hosting. Urutan yang dicoba (terbaru dulu):
1. `https://bfppub.blob.core.windows.net/%24web/2026-08-13/dataset-links.csv` (aktif per Agu 2026; segmen tanggal berubah tiap update — cek README repo untuk yang terkini)
2. `https://minedbuildings.z5.web.core.windows.net/global-buildings/dataset-links.csv` (lokasi lama, masih berisi data hingga pindah)

Alternatif akses terkelola: [Microsoft Planetary Computer — ms-buildings](https://planetarycomputer.microsoft.com/dataset/ms-buildings).

## Workflow standar (AOI → GeoJSON)

1. Tentukan AOI sebagai bbox/poligon EPSG:4326.
2. Hitung **quadkey zoom 9** yang beririsan dengan AOI (`mercantile.tiles(minx, miny, maxx, maxy, zooms=9)` → `mercantile.quadkey(tile)`).
3. Baca `dataset-links.csv`, filter baris `QuadKey` cocok (dan/atau `Location == 'Indonesia'`).
4. Unduh tiap `Url` (`.csv.gz`), baca sebagai JSON line-delimited.
5. Filter fitur yang berada dalam AOI, gabungkan, simpan GeoJSON.

### Contoh Python (pandas + geopandas + mercantile + shapely)

```python
import pandas as pd, geopandas as gpd, mercantile
from shapely import geometry

# AOI: kawasan Borong Indah, Makassar
minx, miny, maxx, maxy = 119.459, -5.171, 119.475, -5.155
aoi = geometry.box(minx, miny, maxx, maxy)

quad_keys = {mercantile.quadkey(t) for t in mercantile.tiles(minx, miny, maxx, maxy, zooms=9)}

links = pd.read_csv("https://bfppub.blob.core.windows.net/%24web/2026-08-13/dataset-links.csv", dtype=str)
rows = links[links.QuadKey.isin(quad_keys)]

parts = []
for _, r in rows.iterrows():
    df = pd.read_json(r.Url, lines=True)          # .csv.gz berisi geojsonl, pandas bisa langsung baca
    df["geometry"] = df["geometry"].apply(geometry.shape)
    gdf = gpd.GeoDataFrame(df, crs=4326)
    parts.append(gdf[gdf.geometry.within(aoi)])

out = pd.concat(parts, ignore_index=True)
gpd.GeoDataFrame(out, crs=4326).to_file("buildings-aoi.geojson", driver="GeoJSON")
```

### Varian ringan tanpa geopandas (stdlib + gzip)

```python
import csv, gzip, json, urllib.request, io

def load_tile(url, bbox):
    minx, miny, maxx, maxy = bbox
    with urllib.request.urlopen(url) as r, gzip.open(io.BytesIO(r.read()), "rt") as f:
        for line in f:
            ft = json.loads(line)
            x, y = ft["geometry"]["coordinates"][0][0]  # titik pertama, cukup utk prefilter
            if minx <= x <= maxx and miny <= y <= maxy:
                yield ft
```

## Integrasi

- **OSMBuildings / peta 3D proyek ini**: hasil GeoJSON langsung kompatibel dengan `osmb.addGeoJSON({type:'FeatureCollection', features})` — petakan `height` ke `properties.height` (abaikan/ganti nilai `-1` dengan estimasi, mis. `levels * 3.2`). Cocok sebagai pelengkap Overpass ketika bangunan OSM tidak lengkap.
- **QGIS/ArcGIS**: gunakan `scripts/make-gis-friendly.py` (repo) atau contoh di atas; intinya gunzip `.csv.gz` → `.geojsonl` → konversi.
- **File besar**: baca per-baris / pecah dengan `scripts/read-files.py` (repo), atau Dask/Spark.

## Peringatan

- Kualitas bervariasi (urban padat < rural); IoU eval ±63–68%, false positive ±1–2%. Jangan impor mentah ke OpenStreetMap tanpa ikuti [pedoman impor OSM](https://wiki.openstreetmap.org/wiki/Import/Guidelines).
- Ada kotak-kotak area kosong (tile citra pra-2014 atau probabilitas deteksi rendah dikecualikan).
- Footprint tidak punya atribut nama/fungsi (beda dengan tag OSM) — hanya geometri + `height`/`confidence`.
- Butuh jalan juga? Lihat [microsoft/RoadDetections](https://github.com/microsoft/RoadDetections).
