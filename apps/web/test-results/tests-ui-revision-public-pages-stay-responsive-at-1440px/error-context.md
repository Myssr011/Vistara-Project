# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/ui-revision.spec.ts >> public pages stay responsive at 1440px
- Location: tests/ui-revision.spec.ts:183:7

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "http://localhost:3001/about", waiting until "networkidle"

```

```
Error: browserContext.close: Target page, context or browser has been closed
```