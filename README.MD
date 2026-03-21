# code-analyzer MCP: The "MCP Programming" Engine

This MCP server provides advanced static and structural analysis tools for TypeScript/JavaScript codebases, specifically designed to automate the "MCP Programming" SOP.

## 🚀 Core Features

### 1. `analyze_code(filePath)`
Performs deep **Static Analysis** using the TypeScript Compiler API.
- **Lexical/Syntax**: Tokenizes and parses into an AST.
- **Semantic**: Identifies variable scopes, function declarations, and type structures.
- **Output**: Detailed JSON report of the file's architectural "logic map".

### 2. `generate_mermaid(filePath, functionName)`
Automates **Visual Mapping** by generating Mermaid.js flowchart syntax.
- Maps `if/else`, `try/catch`, `switch`, and loops into a clear visual map.
- Ideal for "Horizontal Reading" across complex modules.

### 3. `extract_jsdoc(filePath)`
Creates **Knowledge Base Templates** from inline documentation.
- Extracts `@param`, `@returns`, and `@description` tags.
- Formats output into clean Markdown "Cheat Sheets" for rapid project scaffolding.

## 🛠️ Usage
1.  Initialize the workflow using `init_workflow`.
2.  Use `analyze_code` to establish context (Preparation).
3.  Use `generate_mermaid` to visualize the "Chain of Actions".
4.  Refactor and document using the extracted JSDoc templates.

---
*Developed for the Professional MCP Portfolio Suite.*
