import { op } from "../extension";
import type { node } from "./templateTypes";

const name = "cwcyber";

const data = {
  name: "",
  class: "",
  apprehension: "",

  inventory: "",

  stats: {
    str: 0,
    dex: 0,
    con: 0,
    int: 0,
    wis: 0,
    cha: 0,
  },

  inj: {
    fat0: "",
    dan0: "",
    dan1: "",
    pai0: "",
    pai1: "",
    pai2: "",
    dis0: "",
    dis1: "",
    dis2: "",
    dis3: "",
    ann0: "",
    ann1: "",
    ann2: "",
    ann3: "",
    ann4: "",
  },
  skills: {
    acroP: false,
    acroE: false,
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
  // Top
  { x: 1, y: 1, type: "text", data: "name", label: "Name" },
  { x: 13, y: 1, type: "text", data: "class", label: "Class" },
  { x: 25, y: 1, type: "number", data: "apprehension", label: "Apprehension" },

  // Stats
  {
    x: 40,
    y: 5,
    type: "number",
    data: "stats.str",
    label: "Strength",
    style: "stat",
  },
  {
    x: 42,
    y: 8.5,
    type: "dynamicLabel",
    label: "",
    method: [
      {
        conditions: [["all", null, null]],
        converters: [
          ["cwStat", { op: op.Pass }, { value: "stats.str", DB: true }, null],
          ["numStringify", { op: op.Return, a: 0 }, null, null],
        ],
      },
    ],
    watch: ["stats.str"],
  },
  {
    x: 45,
    y: 5,
    type: "number",
    data: "stats.dex",
    label: "Dexterity",
    style: "stat",
  },
  {
    x: 47,
    y: 8.5,
    type: "dynamicLabel",
    label: "",
    method: [
      {
        conditions: [["all", null, null]],
        converters: [
          ["cwStat", { op: op.Pass }, { value: "stats.dex", DB: true }, null],
          ["numStringify", { op: op.Return, a: 0 }, null, null],
        ],
      },
    ],
    watch: ["stats.dex"],
  },
  {
    x: 50,
    y: 5,
    type: "number",
    data: "stats.con",
    label: "Constitution",
    style: "stat",
  },
  {
    x: 52,
    y: 8.5,
    type: "dynamicLabel",
    label: "",
    method: [
      {
        conditions: [["all", null, null]],
        converters: [
          ["cwStat", { op: op.Pass }, { value: "stats.con", DB: true }, null],
          ["numStringify", { op: op.Return, a: 0 }, null, null],
        ],
      },
    ],
    watch: ["stats.con"],
  },
  {
    x: 40,
    y: 10,
    type: "number",
    data: "stats.int",
    label: "Intelligence",
    style: "stat",
  },
  {
    x: 42,
    y: 13.5,
    type: "dynamicLabel",
    label: "",
    method: [
      {
        conditions: [["all", null, null]],
        converters: [
          ["cwStat", { op: op.Pass }, { value: "stats.int", DB: true }, null],
          ["numStringify", { op: op.Return, a: 0 }, null, null],
        ],
      },
    ],
    watch: ["stats.int"],
  },
  {
    x: 45,
    y: 10,
    type: "number",
    data: "stats.wis",
    label: "Wisdom",
    style: "stat",
  },
  {
    x: 47,
    y: 13.5,
    type: "dynamicLabel",
    label: "",
    method: [
      {
        conditions: [["all", null, null]],
        converters: [
          ["cwStat", { op: op.Pass }, { value: "stats.wis", DB: true }, null],
          ["numStringify", { op: op.Return, a: 0 }, null, null],
        ],
      },
    ],
    watch: ["stats.wis"],
  },
  {
    x: 50,
    y: 10,
    type: "number",
    data: "stats.cha",
    label: "Charisma",
    style: "stat",
  },
  {
    x: 52,
    y: 13.5,
    type: "dynamicLabel",
    label: "",
    method: [
      {
        conditions: [["all", null, null]],
        converters: [
          ["cwStat", { op: op.Pass }, { value: "stats.cha", DB: true }, null],
          ["numStringify", { op: op.Return, a: 0 }, null, null],
        ],
      },
    ],
    watch: ["stats.cha"],
  },
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
