import { count } from "console";
import * as fs from "fs";
import * as yaml from "js-yaml";

// 戻りの矢印用のStack変数
const fromStack: string[] = [];
const toStack: string[] = [];
const returnMsgStack: string[] = [];

/**
 * Mermaid記法のシーケンス図を構築する関数
 */
export const generateMermaidSequence = (): string => {
  // YAMLを読み込む
  const yamlData = fs.readFileSync("sequence.yaml", "utf8");
  const data = yaml.load(yamlData) as any;

  let mermaid = "sequenceDiagram\n";

  data.flows.forEach((flow: any) => {
    const type = flow.type;
    if (type === "arrow") {
      mermaid += arrowStrBuild(flow);
    }
  });

  if (fromStack.length > 0) {
    mermaid += buildReturnArrowStr(fromStack.length);
  }

  return mermaid;
};

/**
 * type = arrow の時の文字列組み立て関数
 * build string function when type is arrow
 */
function arrowStrBuild(flow: ArrowFlow): string {
  const fromName = flow.from;
  const toName = flow.to;

  let buildStr = "";
  const description = flow.description || "";
  const retrunDescription = flow.returnmsg || "";
  const args = flow.args
    ? "<br>(" +
      flow.args.map((arg: any) => `${arg.name} : ${arg.type}`).join(", <br>") +
      ")"
    : "";

  let arrowOperator = "";
  let returnLine = "";

  const existIndex = fromStack.findIndex((from) => from === fromName);

  if (existIndex > -1) {
    let count = fromStack.length - existIndex;
    buildReturnArrowStr(count);
  } else if (fromName !== toName) {
    fromStack.push(fromName);
    toStack.push(toName);
    returnMsgStack.push(retrunDescription);
    arrowOperator = "+";
  }

  const returnStr =
    (buildStr += `${fromName} ->>${arrowOperator} ${toName}: ${description} ${args}\n`);
  return returnStr;
}

/**
 * 戻り矢印のMarmaid文字列を組み立てる関数
 * @param count ループの回数
 * @returns 戻り矢印のMarmaid文字列
 */
function buildReturnArrowStr(count: number) {
  let str = "";
  for (let i = 0; i < count; i++) {
    str += `${toStack.pop()} -->>- ${fromStack.pop()}: ${returnMsgStack.pop()}\n`;
  }
  return str;
}
