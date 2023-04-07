import { layout as bnb } from "./bnb";
import { layout as cwcyber } from "./cw-cy";

const layoutList = [bnb.name, cwcyber.name];
const layouts = { bnb: bnb, cwcyber: cwcyber };

export const layout = {
  layoutList: layoutList,
  layouts: layouts,
};
