import { type KeyboardEvent, useEffect, useRef, useState } from "react"
import type { AppTile } from "../../../types/portfolio"
import s from "../style.module.css"

const WELCOME = `
╔══════════════════════════════════════╗
║     Maksym Opanasenko — Terminal    ║
║     Type 'help' for commands        ║
╚══════════════════════════════════════╝
`

const HELP = `
Available commands:
  about         — Who am I?
  skills        — Tech stack & expertise
  experience    — Work history
  projects      — List portfolio projects
  contact       — Get in touch
  open <name>   — Open a project (e.g. 'open reporadar')
  ls            — List all projects
  clear         — Clear terminal
  help          — Show this message
`

const PROJECT_NAMES: Record<string, string> = {
  reporadar: "RepoRadar",
  tgwrapper: "TGWrapper",
  portfolio: "Portfolio",
  catlab: "Catlab POS",
  lifestyle: "Lifestyle Ecosystem",
  stopcheck: "Stop Check",
  converter: "FormatFlow Converter",
  wishlist: "WishTracker",
  speech: "Speech Analyzer",
  mypersfin: "MyPersFin",
  bouquet: "Bouquet Constructor",
  uilibrary: "UI Construction Library",
}

interface TerminalProps {
  tiles: AppTile[]
  onOpenProject: (id: string) => void
  onClose: () => void
}

export function Terminal({ tiles, onOpenProject, onClose }: TerminalProps) {
  const [history, setHistory] = useState<string[]>([WELCOME])
  const [input, setInput] = useState("")
  const [commandIndex, setCommandIndex] = useState(-1)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    outputRef.current?.scrollTo(0, outputRef.current.scrollHeight)
  }, [])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    const parts = trimmed.split(/\s+/)
    const command = parts[0]
    const args = parts.slice(1)

    setCommandHistory((prev) => [...prev, cmd])
    setCommandIndex(-1)

    let response = ""

    switch (command) {
      case "about":
        response =
          "Senior Frontend & Full-Stack Engineer with 5+ years of experience building " +
          "polished product interfaces, dashboards, and internal tools. TypeScript advocate, " +
          "open-source contributor, and problem solver."
        break
      case "skills":
        response =
          "Languages:  TypeScript, JavaScript, Python\n" +
          "Frontend:   React 18/19, Vite, TanStack Query, Tailwind CSS\n" +
          "Backend:    Hono, Express, Fastify, NestJS\n" +
          "Database:   PostgreSQL, Drizzle ORM, Prisma, Redis\n" +
          "DevOps:     Docker, GitHub Actions, Cloudflare Workers, Tailscale\n" +
          "Testing:    Vitest, Playwright, Node --test"
        break
      case "experience":
        response =
          "Senior Full-Stack Engineer — Current\n" +
          "  Building production-grade full-stack applications with the 'proven stack' " +
          "(TypeScript, React, Hono, Drizzle ORM, PostgreSQL).\n\n" +
          "See projects for specific work samples."
        break
      case "projects":
        response = Object.values(PROJECT_NAMES)
          .map((name) => `  • ${name}`)
          .join("\n")
        break
      case "open":
        if (args.length === 0) {
          response = "Usage: open <project-name>. Try: open reporadar"
        } else {
          const matchKey = Object.keys(PROJECT_NAMES).find((k) =>
            k.startsWith(args[0]),
          )
          if (matchKey && PROJECT_NAMES[matchKey]) {
            const tile = tiles.find((t) =>
              t.name.toLowerCase().includes(matchKey),
            )
            if (tile) {
              onOpenProject(tile.id)
              response = `Opening ${PROJECT_NAMES[matchKey]}...`
            } else {
              response = `Project '${args[0]}' found but not available in the current view.`
            }
          } else {
            response = `Unknown project '${args[0]}'. Try: ls`
          }
        }
        break
      case "ls":
        response = Object.entries(PROJECT_NAMES)
          .map(([key, name]) => `  ${key.padEnd(15)} ${name}`)
          .join("\n")
        break
      case "contact":
        response =
          "GitHub:  github.com/jilimb0\nEmail:   maksym@example.com\nLinkedIn: linkedin.com/in/maksym-opanasenko"
        break
      case "clear":
        setHistory([])
        return
      case "help":
        response = HELP
        break
      default:
        if (cmd.trim()) {
          response = `Command not found: '${command}'. Type 'help' for available commands.`
        }
    }

    setHistory((prev) => [...prev, `$ ${cmd}`, response])
    setInput("")
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      runCommand(input)
      return
    }
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIdx =
          commandIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, commandIndex - 1)
        setCommandIndex(newIdx)
        setInput(commandHistory[newIdx])
      }
      return
    }
    if (e.key === "ArrowDown") {
      e.preventDefault()
      if (commandIndex >= 0) {
        const newIdx = commandIndex + 1
        if (newIdx >= commandHistory.length) {
          setCommandIndex(-1)
          setInput("")
        } else {
          setCommandIndex(newIdx)
          setInput(commandHistory[newIdx])
        }
      }
    }
  }

  return (
    <div
      className={s.terminalOverlay}
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose()
      }}
      role="button"
      tabIndex={0}
      aria-label="Close terminal overlay"
    >
      <div
        className={s.terminalWindow}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={() => {}}
        role="dialog"
        aria-label="Terminal"
      >
        <div className={s.terminalHeader}>
          <span>Terminal — bash</span>
          <button
            type="button"
            className={s.terminalClose}
            onClick={onClose}
            aria-label="Close terminal"
          >
            ✕
          </button>
        </div>
        <div ref={outputRef} className={s.terminalOutput}>
          {history.map((line, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: stable list, no reordering
            <pre key={i} className={s.terminalLine}>
              {line}
            </pre>
          ))}
        </div>
        <div className={s.terminalInputLine}>
          <span className={s.terminalPrompt}>$</span>
          <input
            ref={inputRef}
            type="text"
            className={s.terminalInput}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal input"
          />
        </div>
      </div>
    </div>
  )
}
