import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import DesktopApp from "./index"

describe("DesktopApp", () => {
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
})
