# UNITTEST.md - Code Analyzer Testing Specification

## Static Analysis

### Lexical Analysis (Verified tokens and syntax markers)
- **Objective:** Ensure the TypeScript compiler (`ts.createSourceFile`) correctly tokenizes the input string.
- **Verification:** 
    - Check that keywords (e.g., `class`, `function`, `if`, `else`) are correctly identified as `ts.SyntaxKind` tokens.
    - Verify that delimiters (e.g., `{`, `}`, `(`, `)`) are appropriately categorized.
    - Ensure string literals and identifiers are correctly extracted without corruption.

### Syntax Analysis (AST generation check)
- **Objective:** Confirm the creation of a valid Abstract Syntax Tree (AST) from source code.
- **Verification:**
    - Validate that `ts.createSourceFile` returns a `SourceFile` object.
    - Assert that the root node is a `SourceFile` and children nodes represent expected declarations (e.g., `FunctionDeclaration`, `ClassDeclaration`).
    - Verify that nested structures (e.g., functions inside classes) are correctly represented in the AST hierarchy.

### Semantic Analysis (Type safety and variable resolution check)
- **Objective:** Although the tool primarily performs structural analysis, verify the correct identification of symbol types.
- **Verification:**
    - Confirm that `ts.isFunctionDeclaration` and `ts.isClassDeclaration` correctly distinguish between different symbol kinds.
    - Check that symbol names are accurately extracted from the `Identifier` nodes.
    - Ensure that line numbers are correctly calculated using `sourceFile.getLineAndCharacterOfPosition`.

### Control/Data Flow Analysis (Mapping analyze_code execution path)
- **Objective:** Verify the recursive traversal logic used to map the code structure.
- **Verification:**
    - Trace the `visit` function's execution path through the AST using `ts.forEachChild`.
    - Ensure every node in the tree is reached during the traversal.
    - Validate that the collection of symbols (`symbols` array) matches the expected linear execution of the visitor pattern.

## Dynamic Analysis

### Scenario Analysis (Testing AST parsing on a sample recursive function and a complex if-else chain)
- **Scenario 1: Recursive Function**
    - **Input:** A function that calls itself (e.g., `factorial`).
    - **Expected Output:** `analyze_code` should identify one `Function` symbol with the correct name and line number.
- **Scenario 2: Complex If-Else Chain**
    - **Input:** Nested `if-else if-else` statements.
    - **Expected Output:** `generate_mermaid` should produce a `graph TD` string with appropriate nodes (`node0`, `node1`, etc.) and edges representing "Yes" and "No" branches for each condition.
- **Scenario 3: JSDoc with Multiple Symbols**
    - **Input:** Multiple functions/classes with JSDoc comments.
    - **Expected Output:** `extract_jsdoc` should return an array of objects mapping each symbol name to its corresponding comment text.

## Test Cases (Checklist for init, analyze, and mermaid generation)

### 1. Initialization and Setup
- [ ] `Server` instance is correctly initialized with name "code-analyzer".
- [ ] `StdioServerTransport` connects without error.
- [ ] Tool definitions for `analyze_code`, `generate_mermaid`, and `extract_jsdoc` are correctly registered.

### 2. `analyze_code` Tool
- [ ] Successfully parses a file containing only classes.
- [ ] Successfully parses a file containing only functions.
- [ ] Correctly identifies line numbers for each symbol.
- [ ] Handles empty input or code with syntax errors gracefully.

### 3. `generate_mermaid` Tool
- [ ] Generates a valid Mermaid syntax header (`graph TD`).
- [ ] Correctly extracts conditions from `if` statements.
- [ ] Creates "Then Block" nodes for truthy branches.
- [ ] Creates "Else Block" nodes for falsy branches.
- [ ] Handles nested `if` statements by generating unique node IDs.

### 4. `extract_jsdoc` Tool
- [ ] Extracts JSDoc from function declarations.
- [ ] Extracts JSDoc from class declarations.
- [ ] Extracts JSDoc from method declarations inside classes.
- [ ] Returns "anonymous" for symbols without names (if applicable) or handles missing names.
- [ ] Concatenates multiple JSDoc lines correctly.
