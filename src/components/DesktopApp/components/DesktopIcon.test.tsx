import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import type { AppTile } from "../../../types/portfolio"
import DesktopIcon from "./DesktopIcon"
import s from "../style.module.css"

const baseTile: AppTile = {
  id: "test-project",
  name: "Test Project",
  icon: "test-icon.png",
}

const featuredTile: AppTile = {
  ...baseTile,
  category: "Featured Case Study",
}

describe("DesktopIcon", () => {
  it("renders the tile name", () => {
    render(
      <DesktopIcon
        tile={baseTile}
        isActive={false}
        iconSizeClass={s.iconMedium}
        position={{ x: 20, y: 80 }}
        headerSafeTop={54}
        onPointerDown={vi.fn()}
        onKeyDown={vi.fn()}
        index={0}
      />,
    )
    expect(screen.getByText("Test Project")).toBeTruthy()
  })

  it("renders category badge when tile has category", () => {
    render(
      <DesktopIcon
        tile={featuredTile}
        isActive={false}
        iconSizeClass={s.iconMedium}
        position={{ x: 20, y: 80 }}
        headerSafeTop={54}
        onPointerDown={vi.fn()}
        onKeyDown={vi.fn()}
        index={0}
      />,
    )
    expect(screen.getByText("Featured")).toBeTruthy()
  })

  it("does not render badge when tile has no category", () => {
    render(
      <DesktopIcon
        tile={baseTile}
        isActive={false}
        iconSizeClass={s.iconMedium}
        position={{ x: 20, y: 80 }}
        headerSafeTop={54}
        onPointerDown={vi.fn()}
        onKeyDown={vi.fn()}
        index={0}
      />,
    )
    expect(screen.queryByText("Featured")).toBeNull()
    expect(screen.queryByText("Commercial")).toBeNull()
  })

  it("applies active class when isActive is true", () => {
    const { container } = render(
      <DesktopIcon
        tile={baseTile}
        isActive={true}
        iconSizeClass={s.iconMedium}
        position={{ x: 20, y: 80 }}
        headerSafeTop={54}
        onPointerDown={vi.fn()}
        onKeyDown={vi.fn()}
        index={0}
      />,
    )
    const button = container.querySelector("button")
    expect(button?.className).toContain("iconTileActive")
  })
})
