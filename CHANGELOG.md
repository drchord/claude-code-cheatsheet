## [2026-11] Monthly Update

New features found:
- Claude Code v2.1.316: CLAUDE_CODE_SUBAGENT_EFFORT env var (sets default subagent effort level); CLAUDE_CODE_DISABLE_ULTRATHINK env var
- Opus 4.8 Fast mode removed November 30; migrate to Opus 5.5
- Opus 5.5 Fast mode now GA (including Google Cloud)
- Claude Sonnet 4.5 API retirement November 30; migrate to Sonnet 5.5
- --restricted CLI flag (strips Bash/code tools for untrusted-input / compliance pipelines)
- Inference hooks (Enterprise beta): org-level allow/deny before inference
- Plugins in .claude/skills directories auto-load — no explicit /invoke needed
- Models API now reports per-model capabilities: web_search, code_execution, thinking_toggle
- Idle compaction in VS Code and Claude Desktop (long idle conversations auto-summarized)

Sections updated:
- §2 Hooks: added Enterprise Inference hooks bullet
- §3 Skills: added auto-loading plugins bullet
- §4 Non-Interactive Mode: added --restricted flag example and bullet
- §9 Parallel Agents: added CLAUDE_CODE_SUBAGENT_EFFORT env var bullet
- §12 Model Routing: replaced outdated "never call API directly" note with deprecation timeline (Opus 4.8 Fast + Sonnet 4.5 API both retire Nov 30)
- §13 MCP + New API Tools: added Models API per-model capabilities bullet
- §16 Daily Decision Tree: added --restricted flag branch

Sections removed: none

## [2026-10] Monthly Update

New features found:
- Prompt caching TTL extended from 5 minutes to 1 hour (Anthropic API)
- Files API GA (August 2026): upload once, reuse by file_id; 500 MB/file, 1 TB org cap
- Code Execution Tool (sandboxed Python, 90s/cell limit): `code_execution_20260521`
- MCP Connector (API-side): connect to remote MCP servers with no client code; tools subset only
- On-demand conversation compaction via Messages API (signed compaction block)
- Inline tools beta: define tools in mid-conversation system message (`inline-tools-2026-09-15`)
- Claude Sonnet 5.5 now default Sonnet: 1M context, $2/$10/M in/out, $0.20/M cache reads
- Fast Mode research preview for Claude Opus 5.5 on the API
- Claude Code 2.1.281–2.1.283: maxProseWidth setting, compaction spinner with token count, improved /artifacts rendering with PgUp/PgDn, allowClaudeInChromeWithManagedMcp setting

Sections updated:
- §6 Prompt Caching: TTL corrected 5 min → 1 hr; Sonnet 5.5 pricing added
- §7 Context Compaction: added on-demand API compaction bullet
- §12 Model Routing: added Sonnet 5.5 default pricing/context bullet
- §13 MCP Servers → MCP + New API Tools: rewrote to cover API MCP Connector, Code Execution Tool, Files API, inline tools beta
- §16 Daily Decision Tree: added Files API and code_execution decision branches

Sections removed: none
