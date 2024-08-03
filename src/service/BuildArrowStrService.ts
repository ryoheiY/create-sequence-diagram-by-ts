import { ArrowFlow } from "../model/YamlDataTypeModel";
import { fromStack, toStack, returnMsgStack } from "./GenerateMarmeidSequenceService";

/**
 * type = arrow の時の文字列組み立て関数
 * build string function when type is arrow
 */
export function arrowStrBuild(flow: ArrowFlow): string {
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
export function buildReturnArrowStr(count: number) {
    let str = "";
    for (let i = 0; i < count; i++) {
      str += `${toStack.pop()} -->>- ${fromStack.pop()}: ${returnMsgStack.pop()}\n`;
    }
    return str;
  }