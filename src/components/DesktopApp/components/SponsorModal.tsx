import { Badge, Button, Card, Modal } from "@ui-construction-library/core"
import { useState } from "react"

interface SponsorModalProps {
  open: boolean
  onClose: () => void
}

const SPONSOR_TIERS = [
  {
    stars: 50,
    title: "Virtual Coffee",
    desc: "Support open source development and UI construction library maintenance.",
    emoji: "☕",
    badge: "Supporter",
  },
  {
    stars: 100,
    title: "Code Consultation",
    desc: "15-minute 1-on-1 architecture review or frontend roadmap consultation.",
    emoji: "💡",
    badge: "Popular",
  },
  {
    stars: 500,
    title: "Ecosystem Sponsor",
    desc: "Permanent sponsor logo placement in README and Telegram ecosystem projects.",
    emoji: "⭐",
    badge: "VIP Sponsor",
  },
] as const

export function SponsorModal({ open, onClose }: SponsorModalProps) {
  const [selectedTier, setSelectedTier] = useState<number>(100)

  if (!open) return null

  const handleSupport = () => {
    // Open Telegram with pre-filled support message or TMA bot invoice
    const url = `https://t.me/MaksymOp?text=${encodeURIComponent(`Hi Maksym! I want to support your projects with ${selectedTier} Telegram Stars ⭐`)}`
    window.open(url, "_blank")
    onClose()
  }

  return (
    <Modal open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Modal.Content
        size="md"
        className="backdrop-blur-2xl bg-slate-900/95 border border-slate-700/60 text-white rounded-2xl shadow-2xl p-6"
      >
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            <div>
              <h3 className="font-bold text-lg leading-tight">
                Support with Telegram Stars
              </h3>
              <p className="text-xs text-slate-400">
                Directly sponsor open source libraries and ecosystem tools
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white text-lg p-1"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-3 mb-6">
          {SPONSOR_TIERS.map((tier) => (
            <Card
              key={tier.stars}
              elevation="flat"
              interactive
              onClick={() => setSelectedTier(tier.stars)}
              className={`p-3.5 rounded-xl text-left border cursor-pointer transition-all ${
                selectedTier === tier.stars
                  ? "border-amber-500/80 bg-slate-800/90 ring-2 ring-amber-500/50"
                  : "border-slate-800 bg-slate-800/40 opacity-80 hover:opacity-100 hover:border-slate-700"
              }`}
            >
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{tier.emoji}</span>
                  <span className="font-semibold text-white">{tier.title}</span>
                </div>
                <Badge
                  variant={tier.stars === 500 ? "warning" : "default"}
                  className="text-xs font-semibold"
                >
                  {tier.stars} ⭐
                </Badge>
              </div>
              <p className="text-xs text-slate-400 pl-7">{tier.desc}</p>
            </Card>
          ))}
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-slate-400"
          >
            Cancel
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleSupport}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4"
          >
            Sponsor {selectedTier} ⭐ via Telegram
          </Button>
        </div>
      </Modal.Content>
    </Modal>
  )
}
