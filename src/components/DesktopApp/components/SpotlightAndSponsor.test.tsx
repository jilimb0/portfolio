import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import type { AppTile } from "../../../types/portfolio"
import { SponsorModal } from "./SponsorModal"
import { SpotlightModal } from "./SpotlightModal"

const mockTiles: AppTile[] = [
  {
    id: "reporadar",
    name: "RepoRadar",
    descr: "Repository metrics and alerts",
    ghLink: "https://github.com",
    icon: "/icon.png",
    category: "Featured Case Study",
    problem: "Tracking GitHub metrics efficiently",
  },
  {
    id: "catlabpos",
    name: "Catlab POS",
    descr: "Point of sale for coffee shop",
    ghLink: "https://github.com",
    icon: "/icon.png",
    category: "Commercial Product",
    problem: "Real-time checkout syncing",
  },
]

describe("SpotlightModal", () => {
  it("renders search input and quick actions when open", () => {
    const onSelectTile = vi.fn()
    const onClose = vi.fn()
    render(
      <SpotlightModal
        open={true}
        onClose={onClose}
        tiles={mockTiles}
        onSelectTile={onSelectTile}
        onOpenResume={vi.fn()}
        onOpenTerminal={vi.fn()}
        onOpenSponsor={vi.fn()}
      />,
    )

    expect(screen.getByPlaceholderText(/Search projects/i)).toBeTruthy()
    expect(screen.getByText("RepoRadar")).toBeTruthy()
    expect(screen.getByText("Catlab POS")).toBeTruthy()
  })

  it("filters projects by query", async () => {
    const onSelectTile = vi.fn()
    render(
      <SpotlightModal
        open={true}
        onClose={vi.fn()}
        tiles={mockTiles}
        onSelectTile={onSelectTile}
        onOpenResume={vi.fn()}
        onOpenTerminal={vi.fn()}
        onOpenSponsor={vi.fn()}
      />,
    )

    const input = screen.getByPlaceholderText(/Search projects/i)
    fireEvent.change(input, { target: { value: "Radar" } })

    await waitFor(() => {
      expect(screen.getByText("RepoRadar")).toBeTruthy()
      expect(screen.queryByText("Catlab POS")).toBeNull()
    })
  })
})

describe("SponsorModal", () => {
  it("renders sponsorship tiers and support button", () => {
    const onClose = vi.fn()
    render(<SponsorModal open={true} onClose={onClose} />)

    expect(screen.getByText(/Support with Telegram Stars/i)).toBeTruthy()
    expect(screen.getByText("Virtual Coffee")).toBeTruthy()
    expect(screen.getByText("Code Consultation")).toBeTruthy()
    expect(screen.getByText("Ecosystem Sponsor")).toBeTruthy()
  })

  it("changes selected tier on click", () => {
    render(<SponsorModal open={true} onClose={vi.fn()} />)

    const coffeeTier = screen.getByText("Virtual Coffee")
    fireEvent.click(coffeeTier)

    expect(screen.getByText(/Sponsor 50 ⭐ via Telegram/i)).toBeTruthy()
  })
})
