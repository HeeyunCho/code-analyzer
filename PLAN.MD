# PLAN: code-analyzer MCP

## Phase 1: Project Setup
- [ ] Initialize Node.js project.
- [ ] Install `@modelcontextprotocol/sdk` and `typescript` as dependencies.
- [ ] Set up `tsconfig.json`.

## Phase 2: Tool Implementation
- `analyze_code(filePath)`:
  - Load file content.
  - Create AST using `typescript` parser.
  - Extract Lexical and Syntax information.
  - Map variables and their scopes (Semantic Analysis).
- `generate_mermaid(filePath, functionName)`:
  - Identify target function node in AST.
  - Traverse child nodes (If, While, For).
  - Generate Mermaid `graph TD` syntax based on traversal.
- `extract_jsdoc(filePath)`:
  - Extract function/class declarations.
  - Parse associated JSDoc comments.
  - Format output as Markdown for "Cheat Sheets".

## Phase 3: Verification
- [ ] Create test cases for each tool.
- [ ] Perform Static Analysis on the `code-analyzer` itself.
- [ ] Perform Scenario Analysis (e.g., Analyzing a recursive function).

## Review Comments
- *Comment [Reviewer]: Ensure the Mermaid generator handles nested `if` statements and `try/catch` blocks for robust flow visualization.*
- *Comment [Reviewer]: Include a JSON output option for `analyze_code` to support machine-readable templates as per the SOP.*
