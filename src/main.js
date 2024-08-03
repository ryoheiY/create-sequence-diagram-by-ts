"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const yaml = __importStar(require("js-yaml"));
// YAMLを読み込む
const yamlData = fs.readFileSync("test.yaml", "utf8");
const data = yaml.load(yamlData);
// 戻りの矢印用のStack変数
const fromStack = [];
const toStack = [];
const returnMsgStack = [];
/**
 * Mermaid記法のシーケンス図を構築する関数
 */
const generateMermaidSequence = (data) => {
    let mermaid = "sequenceDiagram\n";
    data.flows.forEach((flow) => {
        const type = flow.type;
        if (type === "arrow") {
            mermaid += arrowStrBuild(flow);
        }
    });
    if (fromStack.length > 0) {
        mermaid += BuildReturnArrowStr(fromStack.length);
    }
    return mermaid;
};
/**
 * type = arrow の時の文字列組み立て関数
 * build string function when type is arrow
 */
function arrowStrBuild(flow) {
    const fromName = flow.from;
    const toName = flow.to;
    let buildStr = "";
    const description = flow.description || "";
    const retrunDescription = flow.returnmsg || "";
    const args = flow.args
        ? "<br>(" +
            flow.args.map((arg) => `${arg.name} : ${arg.type}`).join(", <br>") +
            ")"
        : "";
    let arrowOperator = "";
    let returnLine = "";
    const existIndex = fromStack.findIndex((from) => from === fromName);
    if (existIndex > -1) {
        let count = fromStack.length - existIndex;
        for (let i = 0; i < count; i++) {
            buildStr += `${toStack.pop()} -->>- ${fromStack.pop()}: ${returnMsgStack.pop()}\n`;
        }
    }
    else if (fromName !== toName) {
        fromStack.push(fromName);
        toStack.push(toName);
        returnMsgStack.push(retrunDescription);
        arrowOperator = "+";
    }
    const returnStr = (buildStr += `${fromName} ->>${arrowOperator} ${toName}: ${description} ${args}\n`);
    return returnStr;
}
/**
 * 戻り矢印のMarmaid文字列を組み立てる関数
 * @param count ループの回数
 * @returns 戻り矢印のMarmaid文字列
 */
function BuildReturnArrowStr(count) {
    let str = "";
    for (let i = 0; i < count; i++) {
        str += `${toStack.pop()} -->>- ${fromStack.pop()}: ${returnMsgStack.pop()}\n`;
    }
    return str;
}
// Mermaid記法の生成
const mermaidOutput = generateMermaidSequence(data);
// Mermaid記法の出力をファイルに保存
fs.writeFileSync("output.md", `\`\`\`mermaid\n${mermaidOutput}\`\`\``);
console.log("Mermaid記法のシーケンス図が生成されました。");
