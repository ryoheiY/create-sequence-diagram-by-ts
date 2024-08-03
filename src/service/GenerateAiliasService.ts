import { AttrOfClass } from "../model/YamlDataTypeModel";

/**
 * aliasブロックを作成する。
 * @param classes 
 */
export function generateAiliasStr(classes : AttrOfClass[]){
    console.log(classes);
    let buildStr = '';
    classes.map(attr => {
        buildStr += `participant ${attr.alias} as ${attr.name}\n`
    });
    console.log(buildStr);
    return buildStr;
}