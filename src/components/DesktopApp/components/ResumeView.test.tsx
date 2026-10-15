import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { ResumeView } from "./ResumeView"

describe("ResumeView", () => {
  it("renders developer profile and core headings", () => {
    render(<ResumeView onClose={() => {}} />)
    expect(screen.getAllByText("Maksym Opanasenko").length).toBeGreaterThan(0)
    expect(
      screen.getByText("Frontend Engineer · UI/UX Specialist · TMA Architect"),
    ).toBeTruthy()
    expect(screen.getByText("Open to Work")).toBeTruthy()
    expect(screen.getByText("Engineering Guardrails & Quality")).toBeTruthy()
    expect(screen.getByText("Core Technologies & Ecosystem")).toBeTruthy()
    expect(screen.getByText("Featured Production Architecture")).toBeTruthy()
  })

  it("renders TMA mode badge when isTMA is true", () => {
    render(<ResumeView onClose={() => {}} isTMA={true} />)
    expect(screen.getByText("Telegram Mini App Mode")).toBeTruthy()
  })

  it("renders contact action buttons", () => {
    render(<ResumeView onClose={() => {}} />)
    expect(screen.getByText("Telegram")).toBeTruthy()
    expect(screen.getByText("GitHub")).toBeTruthy()
  })

  it("calls onClose when close button is clicked", () => {
    const handleClose = vi.fn()
    render(<ResumeView onClose={handleClose} />)
    fireEvent.click(screen.getByRole("button", { name: "Close Resume" }))
    expect(handleClose).toHaveBeenCalledTimes(1)
  })
})
