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
