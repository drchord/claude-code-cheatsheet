const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  BorderStyle, WidthType, ShadingType, LevelFormat, PageOrientation, AlignmentType
} = require('docx');
const fs = require('fs');

const BLUE    = "1F5C99";
const LBLUE   = "DCE8F5";
const GBG     = "F3F3F3";
const TOTAL_W = 14400;
const DIVIDER = 360;
const COL_W   = (TOTAL_W - DIVIDER) / 2;

const bdr  = (c = "CCCCCC") => ({ style: BorderStyle.SINGLE, size: 1, color: c });
const ab   = (c = "CCCCCC") => ({ top: bdr(c), bottom: bdr(c), left: bdr(c), right: bdr(c) });
const nb   = ()              => ({ style: BorderStyle.NIL });

const h = (text) => new Paragraph({
  children: [new TextRun({ text, bold: true, size: 17, color: BLUE, font: "Arial" })],
  spacing: { before: 80, after: 26 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 5, color: BLUE, space: 2 } },
});

const b = (text) => new Paragraph({
  numbering: { reference: "bullets", level: 0 },
  children: [new TextRun({ text, size: 14, font: "Arial" })],
  spacing: { before: 6, after: 6 },
});

const code = (lines) => new Table({
  width: { size: COL_W, type: WidthType.DXA },
  columnWidths: [COL_W],
  rows: [new TableRow({
    children: [new TableCell({
      borders: ab(),
      shading: { fill: GBG, type: ShadingType.CLEAR },
      margins: { top: 44, bottom: 44, left: 100, right: 100 },
      width: { size: COL_W, type: WidthType.DXA },
      children: lines.map(l => new Paragraph({
        children: [new TextRun({ text: l, size: 13, font: "Courier New" })],
        spacing: { before: 0, after: 0 },
      })),
    })]
  })]
});

const TW = [500, 2200, 2720, 1600];
const trow = (cells, bg = "FFFFFF", bold = false) => new TableRow({
  children: cells.map(([t, w]) => new TableCell({
    width: { size: w, type: WidthType.DXA },
    shading: { fill: bg, type: ShadingType.CLEAR },
    margins: { top: 28, bottom: 28, left: 80, right: 80 },
    borders: ab(),
    children: [new Paragraph({ children: [new TextRun({ text: t, size: 13, font: "Arial", bold })] })]
  }))
});

const routingTable = new Table({
  width: { size: COL_W, type: WidthType.DXA },
  columnWidths: TW,
  rows: [
    trow([["T","500"],["Model tier","2200"],["Use case","2720"],["Cost","1600"]], LBLUE, true),
    trow([["T1","500"],["Fast local / small","2200"],["Lookup, format, classify","2720"],["~$0","1600"]]),
    trow([["T2","500"],["Mid-size","2200"],["Summarize, draft, edit","2720"],["Low","1600"]], "F9F9F9"),
    trow([["T3","500"],["Large","2200"],["Analysis, multi-step","2720"],["Moderate","1600"]]),
    trow([["T4","500"],["Large + long ctx","2200"],["Complex reasoning, 100K+","2720"],["Higher","1600"]], "F9F9F9"),
    trow([["T5","500"],["Orchestrator","2200"],["Planning, supervision","2720"],["Premium","1600"]], LBLUE, true),
  ]
});

const outerTable = (left, right) => new Table({
  width: { size: TOTAL_W, type: WidthType.DXA },
  columnWidths: [COL_W, DIVIDER, COL_W],
  rows: [new TableRow({
    children: [
      new TableCell({
        width: { size: COL_W, type: WidthType.DXA },
        borders: { top: nb(), bottom: nb(), left: nb(), right: nb() },
        margins: { top: 0, bottom: 0, left: 0, right: 120 },
        children: left,
      }),
      new TableCell({
        width: { size: DIVIDER, type: WidthType.DXA },
        borders: { top: nb(), bottom: nb(), right: nb(),
                   left: { style: BorderStyle.SINGLE, size: 6, color: BLUE } },
        margins: { top: 0, bottom: 0, left: 0, right: 0 },
        children: [new Paragraph({ children: [] })],
      }),
      new TableCell({
        width: { size: COL_W, type: WidthType.DXA },
        borders: { top: nb(), bottom: nb(), left: nb(), right: nb() },
        margins: { top: 0, bottom: 0, left: 120, right: 0 },
        children: right,
      }),
    ]
  })]
});

const titlePara = (text, sub, pageBreak = false) => new Paragraph({
  pageBreakBefore: pageBreak,
  children: [
    new TextRun({ text, bold: true, size: 26, color: BLUE, font: "Arial" }),
    new TextRun({ text: sub, size: 18, color: "888888", font: "Arial" }),
  ],
  spacing: { before: 0, after: 80 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: BLUE, space: 4 } },
});

const p1_left = [
  h("1 · CLAUDE.md — Your Persistent Rules"),
  code([
    "~/.claude/CLAUDE.md   <- global (all projects)",
    "<project>/CLAUDE.md   <- project (overrides global)",
    "<subdir>/CLAUDE.md    <- folder-level override",
  ]),
  b("Read every session start — survives context clears and compaction"),
  b("Put behavioral rules, banned patterns, tool prefs, hard constraints here"),
  b("Subdir CLAUDE.md overrides project — use for framework-specific rules"),
  h("2 · Hooks — Automated Behaviors"),
  code([
    "PreToolCall      -> validate / block before tool runs",
    "PostToolCall     -> log / alert / transform results",
    "SessionStart     -> inject infra status, journals, memory",
    "UserPromptSubmit -> per-message context injection",
  ]),
  b("Hook stdout enters Claude context — pull live state Claude can't read itself"),
  b("Use for: spend tracking, infra health, memory index, mode flags"),
  b("Hooks run shell commands — full access to your environment"),
  h("3 · Skills — Reusable Workflows"),
  code([
    "/skill-name -> loads SKILL.md -> Claude follows exactly",
    "",
    "Process skills first  (HOW to approach the task)",
    "Implementation second (WHAT to build)",
  ]),
  b("1% chance it applies -> invoke it. No rationalizing."),
  b("Rigid skills (TDD, debugging): follow exactly. Flexible: adapt."),
  b("Chain: brainstorming skill -> then domain implementation skill"),
  h("4 · Non-Interactive Mode"),
  code([
    "# Single-shot, exits after response",
    "claude --print 'analyze this' < file.txt",
    "# Structured JSON output",
    "claude --output-format json --print 'prompt'",
    "# Pipe into downstream scripts",
    "echo 'summarize' | claude --print | downstream_tool",
  ]),
  b("--print exits after one response — no REPL loop"),
  b("Use for CI pipelines, scheduled tasks, shell automation"),
];

const p1_right = [
  h("5 · Context Management — The Silent Killer"),
  code([
    "GATHER  -> ctx_batch_execute()   replaces 30+ individual calls",
    "FOLLOW  -> ctx_search()          multi-query, single call",
    "PROCESS -> ctx_execute_file()    analyze without loading file",
    "WEB     -> ctx_fetch_and_index() then ctx_search()",
    "STORE   -> ctx_index()           index content for later search",
  ]),
  b("Read(big_file) = up to 56KB dumped — eats ~6% of a 1M context window"),
  b("ctx_execute_file() -> only printed summary enters context"),
  b("Write artifacts to FILES always; return only path + 1-line description"),
  h("6 · Prompt Caching — 90% Cost Reduction"),
  code([
    "System prompt ───────────── cached  (stable, put FIRST)",
    "Tool definitions ─────────── cached  (stable)",
    "Early conversation turns ─── cached  (stable)",
    "                <-- 5-min TTL; 90% savings on cache hits -->",
    "Variable content (last) ──── NOT cached  (always billed)",
  ]),
  b("Design: stable content first, variable content last in each message"),
  b("5-min TTL: sleeping >300s = cold cache on next turn (pay full price)"),
  b("Track cache hit rate in CodeBurn — target >80% for long sessions"),
  h("7 · Context Compaction — Survival Design"),
  code([
    "~90% context window -> auto-compaction triggers",
    "",
    "LOST after compaction:    in-context data, exact wording",
    "SURVIVES compaction:      file-written artifacts, STATUS.md",
    "",
    "Rule: write artifacts to FILES, not inline in responses",
  ]),
  b("Compaction summarizes prior turns — exact details gone"),
  b("Never rely on specific text from 20+ turns ago staying verbatim"),
  b("Long tasks: checkpoint to files every ~10 major steps"),
];

const p2_left = [
  h("8 · Extended & Interleaved Thinking"),
  code([
    "// Extended thinking (API)",
    "thinking: { type: 'enabled', budget_tokens: 10000 }",
    "",
    "// Interleaved: thinking between each tool call",
    "betas: ['interleaved-thinking-2025-05-14']",
    "thinking: { type: 'enabled', budget_tokens: 5000 }",
  ]),
  b("Best for: multi-step reasoning, math, strategic planning chains"),
  b("Interleaved keeps model on-task across complex tool sequences"),
  b("Don't parse thinking blocks — they're for the model, not you"),
  b("Higher budget != always better; tune to task complexity"),
  h("9 · Parallel Agents — When It Works"),
  code([
    "// Send in ONE message -> runs simultaneously",
    "Agent({ prompt: 'task A', run_in_background: true })",
    "Agent({ prompt: 'task B', run_in_background: true })",
    "// Opus supervises -> Sonnet workers in isolated contexts",
  ]),
  b("Works when: tasks are independent, each >10 min, clearly scoped"),
  b("Workers output OLD/NEW patch files — Opus applies sequentially"),
  h("10 · Parallel Agents — When It Hurts"),
  b("N workers x full context = N times token burn — size matters"),
  b("Coordination overhead beats benefit for tasks under 10 min each"),
  b("Vague scope = workers duplicate work (pay 2x for same output)"),
  b("Same file without patch files = write collision, changes lost"),
  b("Deduplicate scopes BEFORE dispatch — not after"),
  h("11 · Git Worktrees — Agent Isolation"),
  code([
    "Agent({",
    "  isolation: 'worktree',  // isolated git branch per agent",
    "  prompt: '...',",
    "})",
    "// Auto-cleaned if no changes made",
    "// Returns branch path if changes were made",
  ]),
  b("Essential for parallel code generation — eliminates file collisions"),
  b("Branch auto-deleted on no-op — zero cleanup overhead"),
];

const p2_right = [
  h("12 · Model Routing — Principles"),
  routingTable,
  b("Classify tier BEFORE dispatching — not after work is scoped"),
  b("T5 orchestrator via subscription ONLY: Agent(model='opus')"),
  b("Never call provider API directly for orchestration-tier work"),
  h("13 · MCP Servers — Universal Pattern"),
  code([
    "Claude Code",
    "    +--> MCP client",
    "             +--> browser automation server",
    "             +--> file system / database server",
    "             +--> external APIs (email, calendar, ...)",
    "             +--> custom domain tools (KB, lit, ...)",
    "Configure: .claude/settings.json -> mcpServers",
  ]),
  b("MCP = Model Context Protocol: tools injected at runtime"),
  b("Each server exposes tools + resources Claude calls natively"),
  h("14 · Memory System + Failure Modes"),
  code([
    "MEMORY.md  (index, loaded every session)",
    "  user_*.md       preferences, expertise",
    "  feedback_*.md   behavioral guardrails  <- most critical",
    "  project_*.md    active work state",
    "  reference_*.md  where to find things",
  ]),
  b("Priority: STATUS.md > memory > journal > assumption"),
  b("Failure: memory names file X -> grep first (may be renamed/gone)"),
  b("Failure: memory says 'active' -> read STATUS.md (may be stale)"),
  b("Save corrections AND confirmed unusual choices (both matter)"),
  h("15 · Session End Ritual"),
  code([
    "Append JOURNAL_<project>.md:",
    "  date | machine | duration",
    "  Focus:    what was worked on",
    "  Decided:  key decisions + reasoning",
    "  Left off: exact state, open threads",
    "  Next:     context needed to resume cleanly",
  ]),
  b("Missing 4+ days -> NEXUS-class chaos on resume — never skip"),
  b("POST to LightRAG API if up — surfaces cross-project connections"),
  h("16 · Daily Decision Tree"),
  code([
    "Skill applies?         -> invoke FIRST, then act",
    "Large data to read?    -> ctx_* tools, not Read/Bash",
    "Independent subtasks?  -> parallel agents (1 message)",
    "Each task < 10 min?    -> DON'T parallelize (overhead wins)",
    "Needs orchestrator?    -> Agent(model='opus'), sub only",
    "Pushing code?          -> explicit 'go' each exchange",
    "Session ending?        -> JOURNAL_<project>.md always",
  ]),
];

const doc = new Document({
  numbering: {
    config: [{
      reference: "bullets",
      levels: [{
        level: 0, format: LevelFormat.BULLET, text: "•",
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 360, hanging: 240 } } },
      }]
    }]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840, orientation: PageOrientation.LANDSCAPE },
        margin: { top: 720, right: 720, bottom: 720, left: 720 },
      }
    },
    children: [
      titlePara("Claude Code  —  Power User Cheat Sheet  (p.1/2)", "   •   Core Mechanics", false),
      outerTable(p1_left, p1_right),
      titlePara("Claude Code  —  Power User Cheat Sheet  (p.2/2)", "   •   Advanced Patterns", true),
      outerTable(p2_left, p2_right),
    ]
  }]
});

const OUT = process.env.OUT || "claude_power_user_cheatsheet.docx";
Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(OUT, buf);
  console.log("Written:", OUT);
}).catch(err => { console.error(err.message); process.exit(1); });
