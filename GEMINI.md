# Code Analyzer (GEMINI.md)

## Purpose
This MCP server acts as the **Static Analysis Engine** for the Gemini CLI ecosystem. It leverages the TypeScript Compiler API to provide deep structural insights into codebases, enabling automated mapping, refactoring, and documentation generation.

## Usage for Agents
- **`analyze_code`**: Performs deep Lexical and Semantic analysis. Use this to establish a high-fidelity "logic map" of a project.
- **`generate_mermaid`**: Visualizes the control flow of functions. Essential for "Horizontal Reading" of complex logic.
- **`extract_jsdoc`**: Automatically creates documentation templates from code. Use this to ensure all new features are idiomatically documented.

## Strategic Role
`code-analyzer` provides the **Structural Intelligence** required for "MCP Programming." It bridges the gap between raw source code and high-level architectural understanding, allowing agents to navigate complex projects with precision.
