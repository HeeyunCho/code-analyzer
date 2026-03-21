import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import ts from "typescript";

const server = new Server(
  {
    name: "code-analyzer",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

/**
 * Tool handler for analyzing code to extract symbols like classes and functions.
 * @param code The TypeScript/JavaScript code to analyze.
 */
function analyzeCode(code: string) {
  const sourceFile = ts.createSourceFile("temp.ts", code, ts.ScriptTarget.Latest, true);
  const symbols: { name: string; kind: string; line: number }[] = [];

  function visit(node: ts.Node) {
    if (ts.isFunctionDeclaration(node) && node.name) {
      symbols.push({
        name: node.name.text,
        kind: "Function",
        line: sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1,
      });
    } else if (ts.isClassDeclaration(node) && node.name) {
      symbols.push({
        name: node.name.text,
        kind: "Class",
        line: sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1,
      });
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return symbols;
}

/**
 * Tool handler for generating a Mermaid flowchart from if/else structures in code.
 * @param code The code snippet containing conditional logic.
 */
function generateMermaid(code: string): string {
  const sourceFile = ts.createSourceFile("temp.ts", code, ts.ScriptTarget.Latest, true);
  let mermaid = "graph TD\n";
  let nodeCount = 0;

  function visit(node: ts.Node) {
    if (ts.isIfStatement(node)) {
      const condition = node.expression.getText(sourceFile);
      const currentId = `node${nodeCount++}`;
      mermaid += `  ${currentId}{"${condition}"}\n`;

      if (node.thenStatement) {
        const thenId = `node${nodeCount++}`;
        mermaid += `  ${currentId} -- Yes --> ${thenId}["Then Block"]\n`;
      }

      if (node.elseStatement) {
        const elseId = `node${nodeCount++}`;
        mermaid += `  ${currentId} -- No --> ${elseId}["Else Block"]\n`;
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return mermaid;
}

/**
 * Tool handler for extracting JSDoc comments from the provided code.
 * @param code The code to extract JSDoc from.
 */
function extractJSDoc(code: string) {
  const sourceFile = ts.createSourceFile("temp.ts", code, ts.ScriptTarget.Latest, true);
  const docs: { symbol: string; comment: string }[] = [];

  function visit(node: ts.Node) {
    const jsDoc = (node as any).jsDoc as ts.JSDoc[] | undefined;
    if (jsDoc && jsDoc.length > 0) {
      let symbolName = "anonymous";
      if (ts.isFunctionDeclaration(node) && node.name) symbolName = node.name.text;
      if (ts.isClassDeclaration(node) && node.name) symbolName = node.name.text;
      if (ts.isMethodDeclaration(node) && node.name) symbolName = node.name.getText();

      docs.push({
        symbol: symbolName,
        comment: jsDoc.map(doc => doc.comment).join("\n"),
      });
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return docs;
}

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "analyze_code",
        description: "Analyze code to extract classes and functions",
        inputSchema: {
          type: "object",
          properties: {
            code: { type: "string" },
          },
          required: ["code"],
        },
      },
      {
        name: "generate_mermaid",
        description: "Generate a Mermaid flowchart from if/else statements",
        inputSchema: {
          type: "object",
          properties: {
            code: { type: "string" },
          },
          required: ["code"],
        },
      },
      {
        name: "extract_jsdoc",
        description: "Extract JSDoc comments from code",
        inputSchema: {
          type: "object",
          properties: {
            code: { type: "string" },
          },
          required: ["code"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === "analyze_code") {
      const result = analyzeCode(String(args?.code));
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
    if (name === "generate_mermaid") {
      const result = generateMermaid(String(args?.code));
      return { content: [{ type: "text", text: result }] };
    }
    if (name === "extract_jsdoc") {
      const result = extractJSDoc(String(args?.code));
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    }
    throw new Error(`Tool not found: ${name}`);
  } catch (error: any) {
    return {
      content: [{ type: "text", text: `Error: ${error.message}` }],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Code Analyzer MCP server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
