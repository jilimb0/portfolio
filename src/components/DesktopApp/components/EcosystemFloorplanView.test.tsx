import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import ecosystemFloorplan from "../../../../public/ecosystem-floorplan.json"
import { EcosystemFloorplanView } from "./EcosystemFloorplanView"

describe("EcosystemFloorplanView", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ecosystemFloorplan,
      }),
    )
  })

  it("renders all 22 ecosystem projects, Plain/Architect switcher, and domain multi-zoom", async () => {
    render(<EcosystemFloorplanView />)

    await waitFor(() => {
      expect(screen.getByText(/22 projects/i)).toBeTruthy()
    })

    expect(screen.getByText("GateBar")).toBeTruthy()
    expect(screen.getByText("ReadMD")).toBeTruthy()
    expect(screen.getByText("Gavel")).toBeTruthy()
    expect(screen.getByText("RepoRadar")).toBeTruthy()

    const architectBtn = screen.getByRole("button", { name: /architect/i })
    fireEvent.click(architectBtn)
    expect(screen.getByText("services-and-apps/gatebar")).toBeTruthy()
    expect(screen.getByText("services-and-apps/readmd")).toBeTruthy()

    const coreFilterBtn = screen.getByRole("button", {
      name: /core infrastructure/i,
    })
    fireEvent.click(coreFilterBtn)
    expect(screen.getByText("core-infra/ui-library")).toBeTruthy()
    expect(screen.queryByText("services-and-apps/gatebar")).toBeNull()
  })

  it("displays cross-repo edges and enforces rel=noopener noreferrer on external links", async () => {
    const { container } = render(<EcosystemFloorplanView />)

    await waitFor(() => {
      expect(screen.getByText("ReadMD")).toBeTruthy()
    })

    fireEvent.click(screen.getByRole("button", { name: /select readmd/i }))

    expect(screen.getByText(/edge:readmd->gatebar/i)).toBeTruthy()
    expect(screen.getByText(/local_ipc/i)).toBeTruthy()

    const links = container.querySelectorAll("a[target='_blank']")
    for (const anchor of links) {
      expect(anchor.getAttribute("rel")).toBe("noopener noreferrer")
    }
  })

  it("renders error state cleanly when fetch fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 503,
      }),
    )

    render(<EcosystemFloorplanView />)

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeTruthy()
    })
  })
})
