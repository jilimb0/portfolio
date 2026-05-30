import PropTypes from "prop-types"
import { useEffect, useState } from "react"
import s from "../style.module.css"

export default function AppWindow({ tile, onClose }) {
  const [showLivePreview, setShowLivePreview] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)

  // Reset loading and preview flags when window tile changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: tile.id changes require resetting window loading state
  useEffect(() => {
    setShowLivePreview(false)
    setIframeLoaded(false)
  }, [tile?.id])

  if (!tile) return null

  const canEmbedLivePreview = Boolean(tile.link) && !tile.embedBlocked
  const isAbout = tile.id === "about"

  // About tile: simple text lines
  const infoLines = isAbout
    ? String(tile.descr || "")
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean)
    : null

  // Case-study sections
  const caseStudySections = !isAbout
    ? [
        { label: "Problem", value: tile.problem },
        { label: "Role", value: tile.role },
        { label: "Challenges", value: tile.challenges },
        { label: "Outcome", value: tile.outcome },
      ].filter((s) => s.value)
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
        {/* Title bar */}
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
              <span className={s.windowCategory}>{tile.category}</span>
            )}
          </div>
        </div>

        {/* Body */}
        <div
          className={`${s.windowBody} ${isAbout ? s.windowBodyAbout : s.windowBodyCase}`}
        >
          {/* Preview panel */}
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

          {/* Info panel */}
          <div className={s.windowInfo}>
            {isAbout ? (
              /* About Me — simple paragraphs */
              <div className={s.infoText}>
                {infoLines.map((line) => (
                  <p key={`${tile.id}-${line.slice(0, 20)}`}>{line}</p>
                ))}
              </div>
            ) : (
              /* Case Study */
              <div className={s.caseStudy}>
                {caseStudySections.map(({ label, value }) => (
                  <div key={label} className={s.caseSection}>
                    <span className={s.caseSectionLabel}>{label}</span>
                    <p className={s.caseSectionText}>{value}</p>
                  </div>
                ))}

                {tags.length > 0 && (
                  <div className={s.tagList}>
                    {tags.map((tag) => (
                      <span key={tag} className={s.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className={s.actions}>
              {canEmbedLivePreview && !showLivePreview && (
                <button
                  type="button"
                  className={s.actionBtnPrimary}
                  onClick={() => setShowLivePreview(true)}
                >
                  Open In Window
                </button>
              )}
              {tile.link && (
                <a
                  href={tile.link}
                  target="_blank"
                  rel="noreferrer"
                  className={showLivePreview ? s.actionBtn : s.actionBtnGhost}
                >
                  {showLivePreview ? "Open in New Tab" : "Open Website"}
                </a>
              )}
              {tile.ghLink && (
                <a
                  href={tile.ghLink}
                  target="_blank"
                  rel="noreferrer"
                  className={s.actionBtnGhost}
                >
                  GitHub
                </a>
              )}
              {tile.gitlabLink && (
                <a
                  href={tile.gitlabLink}
                  target="_blank"
                  rel="noreferrer"
                  className={s.actionBtnGhost}
                >
                  GitLab
                </a>
              )}
            </div>
          </div>
        </div>
      </article>
    </section>
  )
}

AppWindow.propTypes = {
  tile: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string,
    descr: PropTypes.string,
    problem: PropTypes.string,
    role: PropTypes.string,
    challenges: PropTypes.string,
    outcome: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    icon: PropTypes.string,
    link: PropTypes.string,
    ghLink: PropTypes.string,
    gitlabLink: PropTypes.string,
    embedBlocked: PropTypes.bool,
  }),
  onClose: PropTypes.func.isRequired,
}
