import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import type { AppTile } from "../../../types/portfolio"
import AppWindow from "./AppWindow"

const aboutTile: AppTile = {
  id: "about",
  name: "About Me",
  descr: "Frontend engineer focused on product UI.\n3+ Years Production Experience",
  icon: "logo.png",
}

const projectTile: AppTile = {
  id: "test-project",
  name: "Test Project",
  category: "Commercial Product",
  tags: ["React", "TypeScript"],
  problem: "A common business problem that needed solving",
  role: "Lead developer on the project",
  challenges: "Complex state management across multiple surfaces",
  outcome: "Successfully deployed to production with 99.9% uptime",
  link: "https://example.com",
  ghLink: "https://github.com/test/test",
  icon: "test-icon.png",
}

describe("AppWindow", () => {
  it("returns null when tile is null", () => {
    const { container } = render(
      <AppWindow tile={null} onClose={() => {}} />,
    )
    expect(container.innerHTML).toBe("")
  })

  it("renders the tile name", () => {
    render(<AppWindow tile={projectTile} onClose={() => {}} />)
    expect(screen.getByText("Test Project")).toBeTruthy()
  })

  it("renders project category", () => {
    render(<AppWindow tile={projectTile} onClose={() => {}} />)
    expect(screen.getByText("Commercial Product")).toBeTruthy()
  })

  it("shows case study sections for non-about tiles", () => {
    render(<AppWindow tile={projectTile} onClose={() => {}} />)
    expect(screen.getByText("Problem")).toBeTruthy()
    expect(screen.getByText("Role")).toBeTruthy()
    expect(screen.getByText("Challenges")).toBeTruthy()
    expect(screen.getByText("Outcome")).toBeTruthy()
  })

  it("shows tags for project tiles", () => {
    render(<AppWindow tile={projectTile} onClose={() => {}} />)
    expect(screen.getByText("React")).toBeTruthy()
    expect(screen.getByText("TypeScript")).toBeTruthy()
  })

  it("renders GitHub link when tile has ghLink", () => {
    render(<AppWindow tile={projectTile} onClose={() => {}} />)
    const ghLink = screen.getByText("GitHub")
    expect(ghLink).toBeTruthy()
    expect(ghLink.getAttribute("href")).toBe("https://github.com/test/test")
  })

  it("renders Open Website link when tile has link", () => {
    render(<AppWindow tile={projectTile} onClose={() => {}} />)
    expect(screen.getByText("Open Website")).toBeTruthy()
  })

  it("renders Open In Window button when link exists and embed is not blocked", () => {
    render(<AppWindow tile={projectTile} onClose={() => {}} />)
    expect(screen.getByText("Open In Window")).toBeTruthy()
  })

  it("shows close button", () => {
    render(<AppWindow tile={projectTile} onClose={() => {}} />)
    expect(
      screen.getAllByRole("button", { name: "Close window" }).length,
    ).toBeGreaterThan(0)
  })

  it("renders informative text for about tile", () => {
    render(<AppWindow tile={aboutTile} onClose={() => {}} />)
    expect(
      screen.getByText("Frontend engineer focused on product UI."),
    ).toBeTruthy()
    expect(
      screen.getByText("3+ Years Production Experience"),
    ).toBeTruthy()
  })
})
