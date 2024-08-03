export const enum flowType {
  Arrow = 'arrow'
};

export interface Arg {
  type: string;
  name: string;
}

export interface ArrowFlow {
  type: string;
  from: string;
  to: string;
  description: string;
  returnmsg: string;
  args: Arg[];
}

export interface AttrOfClass{
  name: string;
  alias : string;
}
