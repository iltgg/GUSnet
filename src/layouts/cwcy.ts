import type { node } from "./templateTypes";

const name = "cwcyber";

const data = {
  name: "",
  stats: {
    str: 0,
    dex: 0,
  },
};

/*
x
y
type
data
label
style

method
watch

*/

const layout: node[] = [{ x: 1, y: 1, type: "TextField", data: "name", label: "Name" }];

const character = {
  owner: "",
  data: data,
  layout: layout,
};

export const template = {
  name: name,
  character: character,
};
