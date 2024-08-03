interface Arg {
  type: string;
  name: string;
}

interface ArrowFlow {
  type: string;
  from: string;
  to: string;
  description: string;
  returnmsg: string;
  args: Arg[];
}
