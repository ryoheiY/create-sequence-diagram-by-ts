import { ArrowFlow } from "../model/YamlDataTypeModel";

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
  const retrunDescription = flow.returnmsg || "";
  const args = flow.args
    ? "<br>(" +
      flow.args.map((arg: any) => `${arg.name} : ${arg.type}`).join(", <br>") +
      ")"
    : "";

  let arrowOperator = "";

  const existIndex = fromStack.lastIndexOf(fromName);
  console.log("existIndex:", existIndex);
  console.log("fromStack before:", fromStack);
  console.log("toStack before:", toStack);
  console.log("returnMsgStack before:", returnMsgStack);
  if (existIndex > -1) {
    // 階層が上がっているか確認、上がっていれば上昇分だけ戻り矢印の処理を組み立てる。
    let count = fromStack.length - existIndex;
    console.log("Building return arrows, count:", count);
    buildStr += buildReturnArrowStr(count, fromStack, toStack, returnMsgStack);
  } 
  if (fromName !== toName) {
    // 内部処理でないか確認、内部処理でなければStackに追加する。
    console.log("Pushing to stacks:", fromName, toName, retrunDescription);
    fromStack.push(fromName);
    toStack.push(toName);
    returnMsgStack.push(retrunDescription);
    arrowOperator = "+";
  }

  buildStr += `${fromName} ->>${arrowOperator} ${toName}: ${action} ${args}\n`;
  if (description) {
    buildStr += `Note over ${fromName},${toName}: ${description}\n`;
  }

  return buildStr;
}

export function buildReturnArrowStr(
  count: number,
  fromStack: string[],
  toStack: string[],
  returnMsgStack: string[]
) {
  console.log("Before pop operations:", count, fromStack, toStack, returnMsgStack);
  let str = "";
  for (let i = 0; i < count; i++) {
    str += `${toStack.pop()} -->>- ${fromStack.pop()}: ${returnMsgStack.pop()}\n`;
  }
  console.log("After pop operations:", fromStack, toStack, returnMsgStack);
  return str;
}
