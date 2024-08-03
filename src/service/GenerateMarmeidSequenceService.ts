import * as fs from "fs";
import * as yaml from "js-yaml";
import { arrowStrBuild, buildReturnArrowStr } from "./BuildArrowStrService";
import { flowType } from "../model/YamlDataTypeModel";
import { generateAiliasStr } from "./GenerateAiliasService";
import { rootCertificates } from "tls";

// 戻りの矢印用のStack変数
export const fromStack: string[] = [];
export const toStack: string[] = [];
export const returnMsgStack: string[] = [];

/**
 * Mermaid記法のシーケンス図を構築する関数
 */
export const generateMermaidSequence = (): string => {
  // YAMLを読み込む
  const yamlData = fs.readFileSync("/Users/ryo/vscoide/uml-create/sequence.yaml", "utf8");
  const data = yaml.load(yamlData) as any;
  // declare sequenceDiagram
  let mermaid = "sequenceDiagram\n";
  // declare alias block
  mermaid += generateAiliasStr(data.classes);
  // build sequence diagram
  data.flows.forEach((flow: any) => {
    const type = flow.type;
    if (type === flowType.Arrow) {
      mermaid += arrowStrBuild(flow, fromStack, toStack, returnMsgStack);
    }
  });
  // 最後にStackが残っていれば処理
  if (fromStack.length > 0) {
    mermaid += buildReturnArrowStr(fromStack.length, fromStack, toStack, returnMsgStack);
  }

  return mermaid;
};


