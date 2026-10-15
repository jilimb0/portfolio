import { Badge, Button, Card, Progress } from "@ui-construction-library/core"
import {
  BriefcaseIcon,
  CheckCircleIcon,
  ExternalLinkIcon,
  GithubIcon,
  SparklesIcon,
  XIcon,
} from "@ui-construction-library/icons"
import type React from "react"
import logo from "../../../assets/logo.webp"

interface ResumeViewProps {
  onClose: () => void
  isTMA?: boolean
}

export const ResumeView: React.FC<ResumeViewProps> = ({ onClose, isTMA }) => {
  return (
    <div
      role="dialog"
      aria-label="Resume View"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        overflowY: "auto",
        background: "rgba(10, 15, 30, 0.94)",
        backdropFilter: "blur(16px)",
        color: "#f1f5f9",
        padding: "2rem 1rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: "780px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        {/* Header Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <img
              src={logo}
              alt="Logo"
              style={{ width: "48px", height: "48px", borderRadius: "12px" }}
            />
            <div>
              <h1 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 700 }}>
                Maksym Opanasenko
              </h1>
              <p style={{ margin: 0, color: "#94a3b8", fontSize: "0.95rem" }}>
                Frontend Engineer · UI/UX Specialist · TMA Architect
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={onClose}
            aria-label="Close Resume"
            leftIcon={<XIcon style={{ width: 18, height: 18 }} />}
          >
            {isTMA ? "Close" : "Desktop"}
          </Button>
        </div>

        {/* Status Card */}
        <Card
          elevation="raised"
          style={{
            padding: "1.25rem",
            background: "rgba(30, 41, 59, 0.7)",
            border: "1px solid rgba(148, 163, 184, 0.15)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "0.75rem",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <Badge variant="success">Open to Work</Badge>
              {isTMA && <Badge variant="info">Telegram Mini App Mode</Badge>}
              <span style={{ fontSize: "0.85rem", color: "#cbd5e1" }}>
                3+ Years Production Experience · 10+ Launched Projects
              </span>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Button
                as="a"
                href="https://t.me/MaksymOp"
                target="_blank"
                rel="noopener noreferrer"
                variant="default"
                size="sm"
                rightIcon={
                  <ExternalLinkIcon style={{ width: 14, height: 14 }} />
                }
              >
                Telegram
              </Button>
              <Button
                as="a"
                href="https://github.com/jilimb0"
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="sm"
                leftIcon={<GithubIcon style={{ width: 14, height: 14 }} />}
              >
                GitHub
              </Button>
            </div>
          </div>
        </Card>

        {/* Engineering Metrics */}
        <div>
          <h2
            style={{
              fontSize: "1.1rem",
              marginBottom: "0.75rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <SparklesIcon style={{ width: 18, height: 18, color: "#38bdf8" }} />{" "}
            Engineering Guardrails & Quality
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "0.75rem",
            }}
          >
            <Card
              elevation="flat"
              style={{
                padding: "0.85rem",
                background: "rgba(30, 41, 59, 0.5)",
                border: "1px solid rgba(148, 163, 184, 0.1)",
              }}
            >
              <div
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: "#34d399",
                }}
              >
                100%
              </div>
              <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                Test Coverage / Vitest
              </div>
              <Progress
                value={100}
                style={{ marginTop: "0.4rem", height: "4px" }}
              />
            </Card>
            <Card
              elevation="flat"
              style={{
                padding: "0.85rem",
                background: "rgba(30, 41, 59, 0.5)",
                border: "1px solid rgba(148, 163, 184, 0.1)",
              }}
            >
              <div
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: "#60a5fa",
                }}
              >
                0 Errors
              </div>
              <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                Biome & TypeCheck
              </div>
              <Progress
                value={100}
                style={{ marginTop: "0.4rem", height: "4px" }}
              />
            </Card>
            <Card
              elevation="flat"
              style={{
                padding: "0.85rem",
                background: "rgba(30, 41, 59, 0.5)",
                border: "1px solid rgba(148, 163, 184, 0.1)",
              }}
            >
              <div
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: "#a78bfa",
                }}
              >
                98+
              </div>
              <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                Lighthouse Core Vitals
              </div>
              <Progress
                value={98}
                style={{ marginTop: "0.4rem", height: "4px" }}
              />
            </Card>
            <Card
              elevation="flat"
              style={{
                padding: "0.85rem",
                background: "rgba(30, 41, 59, 0.5)",
                border: "1px solid rgba(148, 163, 184, 0.1)",
              }}
            >
              <div
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: "#f472b6",
                }}
              >
                13 Repos
              </div>
              <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                Unified Core Stack
              </div>
              <Progress
                value={100}
                style={{ marginTop: "0.4rem", height: "4px" }}
              />
            </Card>
          </div>
        </div>

        {/* Tech Stack */}
        <div>
          <h2
            style={{
              fontSize: "1.1rem",
              marginBottom: "0.75rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <BriefcaseIcon
              style={{ width: 18, height: 18, color: "#38bdf8" }}
            />{" "}
            Core Technologies & Ecosystem
          </h2>
          <Card
            elevation="flat"
            style={{
              padding: "1.25rem",
              background: "rgba(30, 41, 59, 0.5)",
              border: "1px solid rgba(148, 163, 184, 0.1)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "#94a3b8",
                  marginBottom: "0.5rem",
                }}
              >
                DESIGN SYSTEM & UI
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                <Badge variant="default">
                  @ui-construction-library/core@0.9.0
                </Badge>
                <Badge variant="default">
                  @ui-construction-library/icons@0.6.0
                </Badge>
                <Badge variant="default">
                  @ui-construction-library/tokens@0.6.0
                </Badge>
                <Badge variant="default">React 19</Badge>
                <Badge variant="default">TypeScript 5.8+</Badge>
                <Badge variant="default">Tailwind CSS</Badge>
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "#94a3b8",
                  marginBottom: "0.5rem",
                }}
              >
                TELEGRAM ECOSYSTEM & BOT API
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                <Badge variant="info">@tgwrapper/core@0.20.1</Badge>
                <Badge variant="info">Telegram Mini Apps (TMA)</Badge>
                <Badge variant="info">Telegram Stars & Payments</Badge>
                <Badge variant="info">HMAC-SHA256 Auth</Badge>
                <Badge variant="info">Bot API 8.0+</Badge>
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "#94a3b8",
                  marginBottom: "0.5rem",
                }}
              >
                ARCHITECTURE & TOOLING
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                <Badge variant="success">Vite 6 / Rolldown</Badge>
                <Badge variant="success">Vitest / Testing Library</Badge>
                <Badge variant="success">Biome Fast Linter</Badge>
                <Badge variant="success">pnpm Workspaces</Badge>
                <Badge variant="success">Docker / Netlify Edge</Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Experience Highlights */}
        <div>
          <h2
            style={{
              fontSize: "1.1rem",
              marginBottom: "0.75rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <CheckCircleIcon
              style={{ width: 18, height: 18, color: "#34d399" }}
            />{" "}
            Featured Production Architecture
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            <Card
              elevation="flat"
              style={{
                padding: "1rem",
                background: "rgba(30, 41, 59, 0.5)",
                border: "1px solid rgba(148, 163, 184, 0.1)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.3rem",
                }}
              >
                <strong style={{ fontSize: "0.95rem" }}>
                  Catlab POS & FinTech Ecosystem
                </strong>
                <Badge variant="info">Lead Frontend</Badge>
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.85rem",
                  color: "#cbd5e1",
                  lineHeight: 1.5,
                }}
              >
                Real-time Point of Sale & Treasury terminal with offline sync,
                Telegram Mini App cashier interface, and hardware fiscal printer
                integration.
              </p>
            </Card>

            <Card
              elevation="flat"
              style={{
                padding: "1rem",
                background: "rgba(30, 41, 59, 0.5)",
                border: "1px solid rgba(148, 163, 184, 0.1)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.3rem",
                }}
              >
                <strong style={{ fontSize: "0.95rem" }}>
                  UI Construction Library Design System
                </strong>
                <Badge variant="success">Core Author</Badge>
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.85rem",
                  color: "#cbd5e1",
                  lineHeight: 1.5,
                }}
              >
                Zero-runtime-overhead design system with 25+ accessible
                components, 150+ SVG icons, CSS token theming, and full keyboard
                navigation.
              </p>
            </Card>

            <Card
              elevation="flat"
              style={{
                padding: "1rem",
                background: "rgba(30, 41, 59, 0.5)",
                border: "1px solid rgba(148, 163, 184, 0.1)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.3rem",
                }}
              >
                <strong style={{ fontSize: "0.95rem" }}>
                  TGWrapper Multi-Framework Bot SDK
                </strong>
                <Badge variant="warning">Architect</Badge>
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.85rem",
                  color: "#cbd5e1",
                  lineHeight: 1.5,
                }}
              >
                High-performance TypeScript Bot API & Mini App framework with
                native Stars invoicing, webhook streaming, and pluggable state
                persistence.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
