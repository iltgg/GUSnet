import type { node } from "./templateTypes";

const name = "cwcyber";

const data = {
  name: "",
  hp: 20,
  backstory: "hello hello",
  alive: true,
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

const layout: node[] = [
  { x: 1, y: 1, type: "text", data: "name", label: "Name" },
  { x: 20, y: 1, type: "number", data: "hp", label: "Health" },
  { x: 1, y: 5, type: "textarea", data: "backstory", label: "Backstory" },
  { x: 1, y: 15, type: "checkbox", data: "alive", label: "Alive" },
  { x: 30, y: 1, type: "label", label: "test" },
  {
    x: 30,
    y: 5,
    type: "number",
    data: "stats.str",
    label: "strength",
    style: "stat",
  },
  {
    x: 40,
    y: 1,
    type: "dynamicLabel",
    label: "",
    method:
      '[{"conditions":[["all",null,null]],"converters":[["sub",{"op":0},{"value":"stats.str","DB":true},{"value":10}],["div",{"op":0,"a":0},null,{"value":2}],["floor",{"op":0,"a":0},null,null],["numStringify",{"op":3,"a":0},null,null]]}]',
    watch: ["stats.str"],
  },
  { x: 2, y: 100, type: "label", label: "scrolly" },
];

const character = {
  owner: "",
  data: data,
  layout: layout,
};

export const template = {
  name: name,
  character: character,
};
