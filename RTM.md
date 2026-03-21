# RTM.md - Requirements Traceability Matrix

## Project: Code Analyzer

| ID | Requirement | Description | Test Case(s) in UNITTEST.md |
|---|---|---|---|
| **REQ-01** | **AST Parsing** | The tool must correctly parse TypeScript/JavaScript source code into an Abstract Syntax Tree (AST) using the TypeScript compiler API. | Static Analysis: Syntax Analysis; Scenario 1 & 2 in Dynamic Analysis |
| **REQ-02** | **Symbol Extraction** | The tool must extract function and class declarations from the AST, including their names, kinds, and line numbers. | Test Cases: 2. `analyze_code` Tool |
| **REQ-03** | **Mermaid Generation** | The tool must generate a Mermaid flowchart representing the control flow of `if-else` statements in the provided code. | Test Cases: 3. `generate_mermaid` Tool; Scenario 2 in Dynamic Analysis |
| **REQ-04** | **JSDoc Extraction** | The tool must extract JSDoc comments associated with functions, classes, and methods. | Test Cases: 4. `extract_jsdoc` Tool; Scenario 3 in Dynamic Analysis |
| **REQ-05** | **MCP Integration** | The tool must be exposed as an MCP server with functional tool handlers for `analyze_code`, `generate_mermaid`, and `extract_jsdoc`. | Test Cases: 1. Initialization and Setup |
| **REQ-06** | **Lexical Accuracy** | The tool must accurately identify syntax markers and tokens to correctly extract symbol properties. | Static Analysis: Lexical Analysis |
| **REQ-07** | **Semantic Soundness** | The tool must correctly distinguish between different types of code constructs (classes vs. functions) during traversal. | Static Analysis: Semantic Analysis |
| **REQ-08** | **Flow Mapping** | The tool must accurately map the execution path through code constructs to collect analysis results. | Static Analysis: Control/Data Flow Analysis |
| **REQ-09** | **Error Handling** | The tool must handle syntax errors or invalid input code without crashing. | Test Cases: 2. `analyze_code` Tool (Item 4) |
