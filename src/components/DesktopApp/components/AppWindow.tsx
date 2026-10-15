import { Badge, Button, Card, Progress } from "@ui-construction-library/core"
import {
  ExternalLinkIcon,
  GithubIcon,
  GitlabIcon,
} from "@ui-construction-library/icons"
import { useEffect, useState } from "react"
import type { AppTile } from "../../../types/portfolio"
import s from "../style.module.css"

const AUDIT_METRICS = [
  {
    label: "Performance",
    score: "98",
    unit: "/100",
    color: "#34d399",
    pct: 98,
  },
  {
    label: "Accessibility",
    score: "100",
    unit: "/100",
    color: "#34d399",
    pct: 100,
  },
  {
    label: "Best Practices",
    score: "100",
    unit: "/100",
    color: "#34d399",
    pct: 100,
  },
  { label: "SEO", score: "100", unit: "/100", color: "#34d399", pct: 100 },
  {
    label: "Test Suites",
    score: "34/34",
    unit: "passed",
    color: "#60a5fa",
    pct: 100,
  },
  {
    label: "Type Safety",
    score: "100%",
    unit: "strict",
    color: "#a78bfa",
    pct: 100,
  },
]

interface AppWindowProps {
  tile: AppTile | null
  onClose: () => void
}

export default function AppWindow({ tile, onClose }: AppWindowProps) {
  const [showLivePreview, setShowLivePreview] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)

  // biome-ignore lint/correctness/useExhaustiveDependencies: tile.id changes require resetting window loading state
  useEffect(() => {
    setShowLivePreview(false)
    setIframeLoaded(false)
  }, [tile?.id])

  if (!tile) return null

  const canEmbedLivePreview = Boolean(tile.link) && !tile.embedBlocked
  const isAbout = tile.id === "about"
  const isAudit = tile.id === "audit"

  const infoLines = isAbout
    ? String(tile.descr || "")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
    : null

  const caseStudySections = !isAbout
    ? [
        { label: "Problem", value: tile.problem },
        { label: "Role", value: tile.role },
        { label: "Challenges", value: tile.challenges },
        { label: "Outcome", value: tile.outcome },
      ].filter((section) => section.value)
    : []

  const tags = Array.isArray(tile.tags) ? tile.tags : []

  return (
    <section className={s.windowLayer}>
      <button
        type="button"
        className={s.windowBackdrop}
        onClick={onClose}
        aria-label="Close window"
      />
      <article
        className={s.window}
        role="dialog"
        aria-label={`${tile.name} window`}
      >
        <div className={s.windowBar}>
          <div className={s.windowControls}>
            <button
              className={`${s.control} ${s.controlClose}`}
              type="button"
              onClick={onClose}
              aria-label="Close window"
            />
            <span className={`${s.control} ${s.controlMin}`} />
            <span className={`${s.control} ${s.controlMax}`} />
          </div>
          <div className={s.windowTitleGroup}>
            <h2 className={s.windowTitle}>{tile.name}</h2>
            {tile.category && (
              <Badge variant="info" className={s.windowCategory}>
                {tile.category}
              </Badge>
            )}
          </div>
        </div>

        <div
          className={`${s.windowBody} ${isAbout ? s.windowBodyAbout : s.windowBodyCase}`}
        >
          <div className={s.windowPreviewWrap}>
            {showLivePreview && canEmbedLivePreview ? (
              <>
                <div className={s.iframeLoading} data-loaded={iframeLoaded}>
                  <span className={s.spinner} />
                </div>
                <iframe
                  className={s.windowIframe}
                  src={tile.link}
                  title={`${tile.name} live preview`}
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                  onLoad={() => setIframeLoaded(true)}
                />
                <img
                  className={s.windowPreviewLiveFallback}
                  src={tile.icon}
                  alt={tile.name}
                />
              </>
            ) : (
              <img
                className={`${s.windowPreview} ${isAbout ? s.windowPreviewAbout : ""}`}
                src={tile.icon}
                alt={tile.name}
              />
            )}
          </div>

          <div className={s.windowInfo}>
            {isAbout ? (
              <div className={s.infoText}>
                {infoLines?.map((line) => (
                  <p key={`${tile.id}-${line.slice(0, 20)}`}>{line}</p>
                ))}
              </div>
            ) : (
              <div className={s.caseStudy}>
                {isAudit && (
                  <div className={s.auditGrid} data-testid="audit-grid">
                    {AUDIT_METRICS.map((metric) => (
                      <Card
                        key={metric.label}
                        elevation="flat"
                        className={s.auditMetricCard}
                      >
                        <span
                          className={s.auditMetricScore}
                          style={{ color: metric.color }}
                        >
                          {metric.score}
                          <small className={s.auditMetricUnit}>
                            {metric.unit}
                          </small>
                        </span>
                        <span className={s.auditMetricLabel}>
                          {metric.label}
                        </span>
                        <Progress
                          value={metric.pct}
                          aria-label={`${metric.label} score`}
                          style={{ marginTop: "0.4rem", height: "4px" }}
                        />
                      </Card>
                    ))}
                  </div>
                )}

                {caseStudySections.map(({ label, value }) => (
                  <Card
                    key={label}
                    elevation="flat"
                    className={s.caseSection}
                    style={{
                      background: "transparent",
                      border: "none",
                      padding: 0,
                    }}
                  >
                    <span className={s.caseSectionLabel}>{label}</span>
                    <p className={s.caseSectionText}>{value}</p>
                  </Card>
                ))}

                {tags.length > 0 && (
                  <div className={s.tagList}>
                    {tags.map((tag) => (
                      <Badge key={tag} variant="default" className={s.tag}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className={s.actions}>
              {canEmbedLivePreview && !showLivePreview && (
                <Button
                  type="button"
                  variant="default"
                  className={s.actionBtnPrimary}
                  onClick={() => setShowLivePreview(true)}
                >
                  Open In Window
                </Button>
              )}
              {tile.link && (
                <Button
                  as="a"
                  href={tile.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant={showLivePreview ? "default" : "outline"}
                  className={showLivePreview ? s.actionBtn : s.actionBtnGhost}
                  rightIcon={
                    <ExternalLinkIcon style={{ width: 14, height: 14 }} />
                  }
                >
                  {showLivePreview ? "Open in New Tab" : "Open Website"}
                </Button>
              )}
              {tile.ghLink && (
                <Button
                  as="a"
                  href={tile.ghLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  className={s.actionBtnGhost}
                  leftIcon={<GithubIcon style={{ width: 14, height: 14 }} />}
                >
                  GitHub
                </Button>
              )}
              {tile.gitlabLink && (
                <Button
                  as="a"
                  href={tile.gitlabLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  className={s.actionBtnGhost}
                  leftIcon={<GitlabIcon style={{ width: 14, height: 14 }} />}
                >
                  GitLab
                </Button>
              )}
              {tile.cvLink && (
                <Button
                  as="a"
                  href={tile.cvLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  className={s.actionBtnGhost}
                >
                  View CV
                </Button>
              )}
            </div>
          </div>
        </div>
      </article>
    </section>
  )
}
