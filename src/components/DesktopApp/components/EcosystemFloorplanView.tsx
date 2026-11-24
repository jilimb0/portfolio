import { Badge, Button, Card } from "@ui-construction-library/core"
import { useEffect, useMemo, useState } from "react"

interface FloorplanNodeItem {
  id: string
  repoId: string
  parentId: string | null
  kind: string
  technicalName: string
  plainTitle: string
  plainSummary: string
  filePath: string | null
  httpRoute?: string
  changedInLastCommit: boolean
}

interface FloorplanEdgeItem {
  id: string
  sourceNodeId: string
  targetNodeId: string
  kind: string
  isCrossRepo: boolean
  confidenceBps: number
  verifiedByContract: boolean
}

interface EcosystemFloorplanPayload {
  schemaTag: string
  snapshotId: string
  repositories: Array<{
    repoId: string
    framework: string
  }>
  nodes: FloorplanNodeItem[]
  edges: FloorplanEdgeItem[]
  metrics: {
    assignedFilesBps: number
    edgeResolutionCoverageBps: number
  }
}

export function EcosystemFloorplanView() {
  const [data, setData] = useState<EcosystemFloorplanPayload | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"plain" | "architect">("plain")
  const [activeDomainId, setActiveDomainId] = useState<string>("all")
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }
    let cancelled = false
    fetch("/ecosystem-floorplan.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch ecosystem map (${res.status})`)
        }
        return res.json() as Promise<EcosystemFloorplanPayload>
      })
      .then((payload) => {
        if (!cancelled) {
          setData(payload)
          setLoading(false)
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load ecosystem floorplan",
          )
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  const domainNodes = useMemo(() => {
    if (!data) return []
    return data.nodes.filter((n) => n.kind === "part")
  }, [data])

  const repoNodes = useMemo(() => {
    if (!data) return []
    const repos = data.nodes.filter((n) => n.kind === "repo")
    if (activeDomainId === "all") return repos
    return repos.filter((n) => n.parentId === activeDomainId)
  }, [data, activeDomainId])

  const selectedNode = useMemo(() => {
    if (!data || !selectedNodeId) return null
    return data.nodes.find((n) => n.id === selectedNodeId) ?? null
  }, [data, selectedNodeId])

  const selectedEdges = useMemo(() => {
    if (!data || !selectedNodeId) return []
    return data.edges.filter(
      (e) =>
        e.sourceNodeId === selectedNodeId || e.targetNodeId === selectedNodeId,
    )
  }, [data, selectedNodeId])

  if (loading) {
    return (
      <section role="status" aria-busy="true" aria-label="Ecosystem Map">
        <p>Loading ecosystem architecture map...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section role="alert" aria-label="Ecosystem Map Error">
        <p>{error}</p>
      </section>
    )
  }

  if (!data || repoNodes.length === 0) {
    return (
      <section aria-label="Ecosystem Map Empty">
        <p>No ecosystem repositories found.</p>
      </section>
    )
  }

  return (
    <section
      aria-label="Ecosystem Architecture Map"
      data-testid="ecosystem-floorplan-view"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        color: "var(--ucl-foreground, inherit)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Badge variant="info">{data.repositories.length} projects</Badge>
          <span style={{ fontSize: "0.75rem", opacity: 0.75 }}>
            Snapshot {data.snapshotId.slice(0, 8)}
          </span>
        </div>
        <div
          role="group"
          aria-label="Detail level"
          style={{ display: "flex", gap: "0.35rem" }}
        >
          <Button
            type="button"
            variant={viewMode === "plain" ? "default" : "outline"}
            onClick={() => setViewMode("plain")}
          >
            Plain
          </Button>
          <Button
            type="button"
            variant={viewMode === "architect" ? "default" : "outline"}
            onClick={() => setViewMode("architect")}
          >
            Architect
          </Button>
        </div>
      </div>

      <div
        role="group"
        aria-label="Domain zoom filter"
        style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}
      >
        <Button
          type="button"
          variant={activeDomainId === "all" ? "default" : "outline"}
          onClick={() => setActiveDomainId("all")}
        >
          All Domains
        </Button>
        {domainNodes.map((domain) => (
          <Button
            key={domain.id}
            type="button"
            variant={activeDomainId === domain.id ? "default" : "outline"}
            onClick={() => setActiveDomainId(domain.id)}
          >
            {domain.plainTitle}
          </Button>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
          gap: "0.5rem",
        }}
      >
        {repoNodes.map((node) => {
          const title =
            viewMode === "plain" ? node.plainTitle : node.technicalName
          const isSelected = selectedNodeId === node.id
          return (
            <Card
              key={node.id}
              elevation="flat"
              style={{
                padding: "0.65rem",
                border: isSelected
                  ? "1px solid var(--ucl-primary, #60a5fa)"
                  : "1px solid var(--ucl-border, rgba(255,255,255,0.14))",
                background: "var(--ucl-surface, rgba(255,255,255,0.03))",
                display: "flex",
                flexDirection: "column",
                gap: "0.35rem",
              }}
            >
              <button
                type="button"
                aria-label={`Select ${node.plainTitle}`}
                onClick={() => setSelectedNodeId(node.id)}
                style={{
                  textAlign: "left",
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  color: "inherit",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                }}
              >
                {title}
              </button>
              <p style={{ margin: 0, fontSize: "0.75rem", opacity: 0.8 }}>
                {node.plainSummary}
              </p>
              {node.httpRoute ? (
                <a
                  href={node.httpRoute}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "0.72rem", color: "#60a5fa" }}
                >
                  Open project
                </a>
              ) : null}
            </Card>
          )
        })}
      </div>

      {selectedNode ? (
        <Card
          elevation="flat"
          style={{
            padding: "0.75rem",
            border: "1px solid var(--ucl-border, rgba(255,255,255,0.18))",
          }}
        >
          <div style={{ fontWeight: 600, fontSize: "0.85rem" }}>
            {selectedNode.plainTitle} · Cross-Repo Links ({selectedEdges.length}
            )
          </div>
          {selectedEdges.length === 0 ? (
            <p style={{ margin: "0.35rem 0 0", fontSize: "0.75rem" }}>
              Standalone node with no recorded cross-repo edges.
            </p>
          ) : (
            <ul
              style={{
                margin: "0.4rem 0 0",
                paddingLeft: "1rem",
                fontSize: "0.75rem",
              }}
            >
              {selectedEdges.map((edge) => (
                <li key={edge.id}>
                  {edge.id} ({edge.kind} ·{" "}
                  {Math.floor(edge.confidenceBps / 100)}%)
                </li>
              ))}
            </ul>
          )}
        </Card>
      ) : null}
    </section>
  )
}
