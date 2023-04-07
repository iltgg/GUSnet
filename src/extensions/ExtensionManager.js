import { extension as test } from "./test";
import { extension as bnb } from "./bnb";
import { extension as cw } from "./cw";

const extensionList = [test.name, bnb.name, cw.name];
const extensions = { test: test, bnb: bnb, cw: cw };

export const extension = {
  extensionList: extensionList,
  extensions: extensions,
};
