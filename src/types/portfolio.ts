export type ProjectCategory =
  | "Commercial Product"
  | "Commercial Dashboard"
  | "Featured Case Study"
  | "Client Project"
  | "Client Landing Page"
  | "Open Source"
  | "Personal Tool"
  | "Pet Project"
  | "UX Experiment"

export type ProjectFilter =
  | "All"
  | "Commercial"
  | "Featured"
  | "Client"
  | "Open Source"
  | "Tools"
  | "Pet"

export type IconSize = "small" | "medium" | "large"

export type MenuLabel = "Portfolio" | "File" | "Filter" | "View" | "Window"

export interface PortfolioProject {
  id: string
  name: string
  category?: ProjectCategory
  tags?: string[]
  problem?: string
  role?: string
  challenges?: string
  outcome?: string
  descr?: string
  iconUrl?: string
  iconPosition?: string
  link?: string
  ghLink?: string
  gitlabLink?: string
  cvLink?: string
  embedBlocked?: boolean
  icon?: string
}

export type AppTile = PortfolioProject

export interface IconPosition {
  x: number
  y: number
}

export type IconPositions = Record<string, IconPosition>

export interface DragState {
  id: string
  pointerId: number
  offsetX: number
  offsetY: number
  width: number
  height: number
  moved: boolean
  startClientX: number
  startClientY: number
}

export const PROJECT_FILTER_CATEGORIES: Record<
  Exclude<ProjectFilter, "All">,
  ProjectCategory[]
> = {
  Commercial: ["Commercial Product", "Commercial Dashboard"],
  Featured: ["Featured Case Study"],
  Client: ["Client Project", "Client Landing Page"],
  "Open Source": ["Open Source"],
  Tools: ["Personal Tool"],
  Pet: ["Pet Project"],
}
