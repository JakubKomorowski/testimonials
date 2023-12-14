export interface IChild {
  _type: string;
  marks: any[];
  text: string;
  _key: string;
}

export interface IHeading {
  markDefs: any[];
  children: IChild[];
  _type: string;
  style: string;
  _key: string;
  subheadings: any[];
}
