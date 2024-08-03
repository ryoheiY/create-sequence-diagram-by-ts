
import * as fs from "fs";
import { generateMermaidSequence } from "./service/GenerateMarmeidSequenceService";

// Mermaid記法の生成
const mermaidOutput = generateMermaidSequence();

// Mermaid記法の出力をファイルに保存
fs.writeFileSync("output.md", `\`\`\`mermaid\n${mermaidOutput}\`\`\``);
console.log("Mermaid記法のシーケンス図が生成されました。");
