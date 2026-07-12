import { render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, it } from "vitest"
import DesktopApp from "./index"

describe("DesktopApp", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it("renders without crashing", () => {
    const { container } = render(<DesktopApp />)
    expect(container).toBeTruthy()
  })

  it("renders the desktop container", () => {
    render(<DesktopApp />)
    expect(screen.getByTestId("desktop")).toBeTruthy()
  })

  it("renders interactive buttons", () => {
    render(<DesktopApp />)
    const buttons = screen.getAllByRole("button")
    expect(buttons.length).toBeGreaterThan(0)
  })

  it("renders hero widget with developer name", () => {
    render(<DesktopApp />)
    const names = screen.getAllByText("Maksym Opanasenko")
    expect(names.length).toBeGreaterThanOrEqual(1)
  })

  it("renders the job title in the desktop hero section", () => {
    render(<DesktopApp />)
    const titles = screen.getAllByText("Frontend Engineer · UI/UX")
    expect(titles.length).toBeGreaterThan(0)
  })

  it("renders the dock toolbar", () => {
    render(<DesktopApp />)
    expect(
      screen.getByRole("toolbar", { name: "Application dock" }),
    ).toBeTruthy()
  })

  it("renders contact links navigation", () => {
    render(<DesktopApp />)
    expect(
      screen.getByRole("navigation", { name: "Contact links" }),
    ).toBeTruthy()
  })

  it("renders all menu bar labels", () => {
    render(<DesktopApp />)
    expect(screen.getByText("Portfolio")).toBeTruthy()
    expect(screen.getByText("File")).toBeTruthy()
    expect(screen.getByText("Filter")).toBeTruthy()
    expect(screen.getByText("View")).toBeTruthy()
    expect(screen.getByText("Window")).toBeTruthy()
  })

  it("opens About window by default on first visit", () => {
    render(<DesktopApp />)
    expect(
      screen.getByRole("dialog", { name: "About Me window" }),
    ).toBeTruthy()
  })

  it("renders project tiles from portfolio-db", () => {
    render(<DesktopApp />)
    expect(screen.getAllByText("Catlab POS").length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText("TGWrapper").length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText("RepoRadar").length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText("UI Construction Library").length).toBeGreaterThanOrEqual(
      1,
    )
  })
})
