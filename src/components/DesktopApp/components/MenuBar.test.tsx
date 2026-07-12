import { fireEvent, render, screen } from "@testing-library/react"
import { createRef } from "react"
import { describe, expect, it, vi } from "vitest"
import type { MenuLabel } from "../../../types/portfolio"
import MenuBar from "./MenuBar"

function createProps(overrides?: Record<string, unknown>) {
  return {
    menuRef: createRef<HTMLElement>(),
    now: "Mon, Jul 12 02:30",
    openMenu: null as MenuLabel | null,
    setOpenMenu: vi.fn(),
    onOpenAbout: vi.fn(),
    onResetLayout: vi.fn(),
    onSetIconSize: vi.fn(),
    onCloseWindow: vi.fn(),
    projectFilter: "All" as const,
    setProjectFilter: vi.fn(),
    ...overrides,
  }
}

const CONTACT_LINKS = ["Telegram", "LinkedIn", "Email", "npm"]

describe("MenuBar", () => {
  it("renders all menu labels", () => {
    render(<MenuBar {...createProps()} />)
    expect(screen.getByText("Portfolio")).toBeTruthy()
    expect(screen.getByText("File")).toBeTruthy()
    expect(screen.getByText("Filter")).toBeTruthy()
    expect(screen.getByText("View")).toBeTruthy()
    expect(screen.getByText("Window")).toBeTruthy()
  })

  it("renders contact links", () => {
    render(<MenuBar {...createProps()} />)
    for (const label of CONTACT_LINKS) {
      expect(screen.getByText(label)).toBeTruthy()
    }
  })

  it("renders the apple logo button with About Me aria-label", () => {
    render(<MenuBar {...createProps()} />)
    expect(
      screen.getByRole("button", { name: "Open About Me" }),
    ).toBeTruthy()
  })

  it("shows the current time", () => {
    render(<MenuBar {...createProps({ now: "Mon, Jul 12 02:30" })} />)
    expect(screen.getByText("Mon, Jul 12 02:30")).toBeTruthy()
  })

  it("opens filter panel when Filter is clicked", () => {
    const setOpenMenu = vi.fn()
    render(<MenuBar {...createProps({ setOpenMenu })} />)

    fireEvent.click(screen.getByText("Filter"))

    expect(setOpenMenu).toHaveBeenCalledTimes(1)
  })

  it("shows filter options panel when openMenu is Filter", () => {
    render(
      <MenuBar
        {...createProps({ openMenu: "Filter" as MenuLabel })}
      />,
    )

    expect(screen.getByText("✓ All")).toBeTruthy()
    expect(screen.getByText("Commercial")).toBeTruthy()
    expect(screen.getByText("Featured")).toBeTruthy()
    expect(screen.getByText("Client")).toBeTruthy()
    expect(screen.getByText("Open Source")).toBeTruthy()
    expect(screen.getByText("Tools")).toBeTruthy()
    expect(screen.getByText("Pet")).toBeTruthy()
  })

  it("shows view options panel when openMenu is View", () => {
    render(
      <MenuBar {...createProps({ openMenu: "View" as MenuLabel })} />,
    )

    expect(screen.getByText("Icon Size: Small")).toBeTruthy()
    expect(screen.getByText("Icon Size: Medium")).toBeTruthy()
    expect(screen.getByText("Icon Size: Large")).toBeTruthy()
  })

  it("shows window options panel when openMenu is Window", () => {
    render(
      <MenuBar
        {...createProps({ openMenu: "Window" as MenuLabel })}
      />,
    )

    expect(screen.getByText("Close Active Window")).toBeTruthy()
  })

  it("shows file options panel when openMenu is File", () => {
    render(
      <MenuBar {...createProps({ openMenu: "File" as MenuLabel })} />,
    )

    expect(screen.getByText("Open About Me")).toBeTruthy()
    expect(screen.getByText("Reset Icon Layout")).toBeTruthy()
  })
})
