import "server-only";

// Server-only. This module must never be imported by a client component, so the
// activation code and instructions are never shipped in the client bundle —
// they're only rendered/returned to an authenticated, eligible claimed owner.

export const MCP_SERVER_URL = "https://aarm-conformance-mcp.herman-d10.workers.dev/";

// Configurable via env; falls back to the current code. Not exposed to the client.
export const ACTIVATION_CODE = process.env.AARM_ACTIVATION_CODE || "lab-decline-original-taxi";

export const CLAUDE_CODE_INSTALL = `claude mcp add --transport http aarm-conformance ${MCP_SERVER_URL}`;

export const CLAUDE_DESKTOP_CONFIG = `{
  "mcpServers": {
    "aarm-conformance": {
      "type": "http",
      "url": "${MCP_SERVER_URL}"
    }
  }
}`;

export const VALIDATION_STEPS = [
  {
    n: "01",
    title: "Request an activation key",
    body: "Use the activation code below with your organization name, product name, and target conformance level (Core or Extended). Only listed organizations can run the assessment.",
  },
  {
    n: "02",
    title: "Connect to the AARM MCP server",
    body: "Add the server to Claude Desktop or Claude Code using the instructions below.",
  },
  {
    n: "03",
    title: "Run the assessment",
    body: "Start a conversation with Claude and ask it to run the AARM conformance assessment. The agent walks through each check, collects evidence, and produces a validation report.",
  },
] as const;
