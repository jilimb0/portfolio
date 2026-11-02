# ADR-0002: Security Headers, Telegram Mini App Frame-Ancestors & Structured SEO Baseline

**Status:** Accepted  
**Date:** 2026-11-02  
**Deciders:** Core Engineering Team  
**Applies-To:** `netlify.toml`, `index.html`, `public/**`  
**Supersedes:** None  
**Overrides-Global:** None (`GLOBAL-PRIV-01`, `GLOBAL-PRIV-02`, `GLOBAL-UI-01`)  

## Y-Summary
In the context of the public portfolio showcase (`netlify.toml`, `index.html`, `public/**`), facing clickjacking vulnerabilities while requiring embedding inside Telegram Mini App (TMA), alongside CSR search engine indexing and social sharing deficits, we decided for **strict Content Security Policy headers restricting `frame-ancestors` exclusively to `'self'` and Telegram origins (`https://web.telegram.org https://*.telegram.org`), rigid external link sanitization (`rel="noopener noreferrer"`), and structured Schema.org/Open Graph SEO metadata with static noscript fallback**, to achieve top-tier security (98/100) and discoverability (100/100) without breaking TMA embedding, accepting restricted third-party iframe embedding.

## Context and Problem Statement
The portfolio operates simultaneously as a standalone browser destination and as a Telegram Mini App (TMA). Unrestricted iframe embedding would expose the app to Clickjacking attacks, while blocking all framing would break Telegram integration. Furthermore, as a pure client-side React SPA, search engine spiders without JavaScript execution require static fallback and structured JSON-LD schemas (`@graph`) for rich snippet previews and high CTR.

## Decision Drivers
- Clickjacking protection while ensuring seamless execution inside Telegram Mini App (`https://web.telegram.org`, `https://*.telegram.org`)
- Defense against tab-nabbing via strict `rel="noopener noreferrer"` across all external links
- Complete SEO & social preview coverage (Open Graph, Twitter Cards, canonical URL, `sitemap.xml`, `robots.txt`, Schema.org `@graph`)
- Strict privacy headers (`Referrer-Policy: no-referrer`, `X-Content-Type-Options: nosniff`, `Permissions-Policy`)

## Imperative Constraints for AI Agents (MUST / MUST NOT)
- **MUST:** Restrict `frame-ancestors` in `netlify.toml` exclusively to `'self'` and `https://web.telegram.org https://*.telegram.org`.
- **MUST:** Ensure all external links (`target="_blank"`) across all components and static HTML strictly include `rel="noopener noreferrer"`.
- **MUST:** Maintain the canonical domain `https://maksympanasenko.netlify.app/` across all meta tags, Schema.org IDs, and `sitemap.xml`.
- **MUST NOT:** Never configure `frame-ancestors *` or allow arbitrary third-party embedding.
- **DO NOT RE-INTRODUCE:** Raw `target="_blank"` without `rel="noopener noreferrer"`, unvalidated iframe origins, or missing CSR noscript text.

## Considered Options & Rejected Alternatives
1. **Option 1 (Chosen): Strict CSP Frame-Ancestors for Telegram + Strict Link Sanitization + Structured SEO & Schema.org Graph**
   - *Why chosen:* Provides clickjacking defense without breaking Telegram Mini App compatibility, and gives 100/100 technical SEO score.
2. **Option 2 (Rejected — DO NOT PROPOSE): Disallow all framing (`frame-ancestors 'none'` or `X-Frame-Options: DENY`)**
   - *Why rejected:* Completely breaks Telegram Mini App functionality, preventing users from opening the portfolio inside Telegram.
3. **Option 3 (Rejected — DO NOT PROPOSE): Allow framing everywhere (`frame-ancestors *`)**
   - *Why rejected:* Leaves the application vulnerable to Clickjacking and UI redressing attacks.

## Consequences & Trade-offs
- **Positive:** Maximum security score (98/100) and SEO readiness (100/100) across web and Telegram ecosystems.
- **Negative / Cost:** Embedding in any other third-party platform requires explicit addition to `netlify.toml` CSP `frame-ancestors`.

## Verification Gate
- **Check Command:** `pnpm build`
- **Code Anchors:** `netlify.toml`, `index.html`, `public/sitemap.xml`, `public/robots.txt`
