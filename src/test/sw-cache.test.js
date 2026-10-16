import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { describe, expect, it } from "vitest"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, "../..")

describe("Service Worker & Edge Caching Configuration", () => {
  it("defines valid Service Worker with pre-cache list and fetch handler", () => {
    const swPath = join(ROOT, "public/sw.js")
    const swContent = readFileSync(swPath, "utf-8")

    expect(swContent).toContain("portfolio-static-v2")
    expect(swContent).toContain("portfolio-runtime-v2")
    expect(swContent).toContain('request.mode === "navigate"')
    expect(swContent).toContain('url.pathname.startsWith("/assets/")')
  })

  it("configures immutable asset caching and fresh entrypoint headers in netlify.toml", () => {
    const tomlPath = join(ROOT, "netlify.toml")
    const tomlContent = readFileSync(tomlPath, "utf-8")

    expect(tomlContent).toContain('for = "/assets/*"')
    expect(tomlContent).toContain("public, max-age=31536000, immutable")

    expect(tomlContent).toContain('for = "/sw.js"')
    expect(tomlContent).toContain("public, max-age=0, must-revalidate")

    expect(tomlContent).toContain('for = "/index.html"')
  })

  it("includes logo.webp preload link in index.html head for fast LCP", () => {
    const indexPath = join(ROOT, "index.html")
    const indexContent = readFileSync(indexPath, "utf-8")

    expect(indexContent).toContain('rel="preload" href="/logo.webp" as="image"')
  })
})
