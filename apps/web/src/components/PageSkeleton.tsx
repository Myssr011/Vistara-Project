import styles from "./PageSkeleton.module.css";

type SkeletonKind = "home" | "about" | "service" | "directory" | "creators" | "article" | "detail" | "contact";

export default function PageSkeleton({ kind = "directory" }: { kind?: SkeletonKind }) {
  const hero = ["home", "about", "service"].includes(kind);
  const article = kind === "article";
  const detail = kind === "detail";
  return <main id="main-content" className={styles.page} data-kind={kind} aria-busy="true" aria-label="Memuat halaman">
    <span role="status" className="sr-only">Memuat halaman tujuan</span>
    <div aria-hidden="true">
      {hero && <div className={styles.hero}><div className={styles.wrap}><div className={styles.line} /><div className={styles.title} /><div className={styles.title} /><div className={styles.line} /></div></div>}
      <div className={styles.wrap}>
        {!hero && <header className={styles.heading}><div className={styles.line} /><div className={styles.title} /><div className={styles.line} /></header>}
        {article ? <><div className={styles.articleImage} /><div className={styles.prose}>{Array.from({ length: 7 }, (_, index) => <div key={index} className={styles.line} />)}</div></>
          : detail || kind === "contact" ? <div className={styles.detail}><div className={styles.detailImage} /><div className={styles.prose}>{Array.from({ length: 6 }, (_, index) => <div key={index} className={styles.field} />)}</div></div>
          : <>
            {hero ? <div className={styles.story}><div className={styles.title} /><div className={styles.prose}><div className={styles.line} /><div className={styles.line} /><div className={styles.line} /></div></div> : <div className={styles.filters}><div className={styles.field} /><div className={styles.field} /><div className={styles.field} /></div>}
            <div className={styles.grid}>{Array.from({ length: kind === "creators" ? 4 : 6 }, (_, index) => <div key={index} className={styles.card}><div className={styles.image} /><div className={styles.line} /><div className={styles.line} /></div>)}</div>
          </>}
      </div>
    </div>
  </main>;
}