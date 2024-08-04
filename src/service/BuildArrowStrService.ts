import {ArrowFlow} from "../model/YamlDataTypeModel";

/**
 * type = arrow の時の文字列組み立て関数
 * build string function when type is arrow
 * @param flow yaml
 * @param fromStack stack for from data
 * @param toStack stack for to data
 * @param returnMsgStack stack for return message
 */
export function arrowStrBuild(
  flow: ArrowFlow,
  fromStack: string[],
  toStack: string[],
  returnMsgStack: string[]
): string {
  console.log(flow);
  const fromName = flow.from;
  const toName = flow.to;

  let buildStr = "";
  const action = flow.action;
  const description = flow.description || "";
  const rerunDescription = flow.returnmsg || "";
  const args = flow.args
    ? "<br>(" +
      flow.args.map((arg: any) => `${arg.name} : ${arg.type}`).join(", <br>") +
      ")"
    : "";

  let arrowOperator = "";

  const existIndex = fromStack.lastIndexOf(fromName);
  if (existIndex > -1) {
    // 階層が上がっているか確認、上がっていれば上昇分だけ戻り矢印の処理を組み立てる。
    let count = fromStack.length - existIndex;
    buildStr += buildReturnArrowStr(count, fromStack, toStack, returnMsgStack);
  } 
  if (fromName !== toName) {
    // 内部処理でないか確認、内部処理でなければStackに追加する。
    fromStack.push(fromName);
    toStack.push(toName);
    returnMsgStack.push(rerunDescription);
    arrowOperator = "+";
  }

  buildStr += `${fromName} ->>${arrowOperator} ${toName}: ${action} ${args}\n`;
  if (description) {
    buildStr += `Note over ${fromName},${toName}: ${description}\n`;
  }

  return buildStr;
}

/**
 * 戻り同期処理のシーケンス組み立て用関数
 * @param count
 * @param fromStack
 * @param toStack
 * @param returnMsgStack
 */
export function buildReturnArrowStr(
  count: number,
  fromStack: string[],
  toStack: string[],
  returnMsgStack: string[]
) {
  let str = "";
  for (let i = 0; i < count; i++) {
    str += `${toStack.pop()} -->>- ${fromStack.pop()}: ${returnMsgStack.pop()}\n`;
  }
  return str;
}
