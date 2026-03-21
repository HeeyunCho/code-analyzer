# RESEARCH: code-analyzer MCP

## Objective
Develop a specialized MCP server that automates the "MCP Programming" SOP. It will provide tools to analyze source code for structural patterns, generate Mermaid diagrams for control flow, and extract JSDoc documentation for knowledge base creation.

## Technical Research
- **Language Analysis**: Use the `typescript` package (specifically `ts.createSourceFile` and `ts.forEachChild`) to parse files into an Abstract Syntax Tree (AST). This enables Lexical, Syntax, and Semantic analysis.
- **Visual Mapping**: Translate AST control flow nodes (IfStatement, TryStatement, etc.) into Mermaid syntax for flowchart generation.
- **Knowledge Base Creation**: Export data in Markdown (human-readable) and JSON (machine-readable) formats to support new project scaffolding.
- **Chain of Actions**: Trace function calls to map "action chains" horizontally across modules.

## Tool Requirements
- `analyze_code(filePath)`: Performs Static Analysis (AST parsing).
- `generate_mermaid_flow(filePath, functionName)`: Creates a control flow diagram.
- `extract_jsdoc(filePath)`: Parses and summarizes inline documentation.
- `map_action_chain(filePath, functionName)`: Traces call logic to identify dependencies.

## Potential Risks
- Complexity of handling large files/projects.
- Inconsistent coding styles affecting pattern recognition.
- Balancing detail vs. abstraction in Mermaid diagrams.
