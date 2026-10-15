import { Badge, Kbd, Modal, SearchInput } from "@ui-construction-library/core"
import { useMemo, useState } from "react"
import type { AppTile } from "../../../types/portfolio"

interface SpotlightModalProps {
  open: boolean
  onClose: () => void
  tiles: AppTile[]
  onSelectTile: (id: string) => void
  onOpenResume: () => void
  onOpenTerminal: () => void
  onOpenSponsor: () => void
}

export function SpotlightModal({
  open,
  onClose,
  tiles,
  onSelectTile,
  onOpenResume,
  onOpenTerminal,
  onOpenSponsor,
}: SpotlightModalProps) {
  const [query, setQuery] = useState("")

  const filteredTiles = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return tiles.slice(0, 8)
    return tiles.filter((t) => {
      const matchName = t.name.toLowerCase().includes(q)
      const matchDescr = t.descr?.toLowerCase().includes(q)
      const matchTags = t.tags?.some((tag) => tag.toLowerCase().includes(q))
      const matchCategory = t.category?.toLowerCase().includes(q)
      return matchName || matchDescr || matchTags || matchCategory
    })
  }, [tiles, query])

  if (!open) return null

  return (
    <Modal open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Modal.Content
        size="md"
        className="backdrop-blur-xl bg-slate-900/90 border border-slate-700/60 text-white rounded-2xl shadow-2xl p-4 overflow-hidden"
      >
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800">
          <div className="flex-1">
            <SearchInput
              value={query}
              onChange={(val) => setQuery(val)}
              debounceMs={0}
              placeholder="Search projects, tags, commands... (⌘K)"
              className="w-full bg-slate-800/80 border-slate-700 text-white placeholder-slate-400"
            />
          </div>
          <Kbd className="bg-slate-800 border-slate-700 text-slate-300 text-xs px-2 py-1">
            ESC
          </Kbd>
        </div>

        {/* Quick Actions */}
        <div className="mb-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              onClose()
              onOpenResume()
            }}
            className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
          >
            <span>📄</span>
            <span>Resume & TMA</span>
          </button>
          <button
            type="button"
            onClick={() => {
              onClose()
              onOpenTerminal()
            }}
            className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
          >
            <span>💻</span>
            <span>Terminal</span>
          </button>
          <button
            type="button"
            onClick={() => {
              onClose()
              onOpenSponsor()
            }}
            className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-colors"
          >
            <span>⭐</span>
            <span>Support via Stars</span>
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[320px] overflow-y-auto flex flex-col gap-1.5 pr-1">
          {filteredTiles.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-sm">
              No results found for «{query}»
            </div>
          ) : (
            filteredTiles.map((tile) => (
              <button
                key={tile.id}
                type="button"
                onClick={() => {
                  onClose()
                  onSelectTile(tile.id)
                }}
                className="w-full text-left flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/80 active:bg-slate-800 border border-transparent hover:border-slate-700/60 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={tile.icon}
                    alt={tile.name}
                    className="w-8 h-8 rounded-lg object-contain bg-slate-800 p-1 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-white group-hover:text-blue-400 truncate">
                        {tile.name}
                      </span>
                      {tile.category && (
                        <Badge
                          variant="default"
                          className="text-[10px] py-0 px-1.5 bg-slate-800 text-slate-400 border border-slate-700"
                        >
                          {tile.category}
                        </Badge>
                      )}
                    </div>
                    {tile.problem && (
                      <p className="text-xs text-slate-400 truncate mt-0.5">
                        {tile.problem}
                      </p>
                    )}
                  </div>
                </div>
                <div className="shrink-0 flex items-center gap-1">
                  <Kbd className="bg-slate-800/70 border-slate-700 text-slate-400 text-[10px] px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    ↵
                  </Kbd>
                </div>
              </button>
            ))
          )}
        </div>
      </Modal.Content>
    </Modal>
  )
}
