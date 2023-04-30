import { op } from "../extension";
import { Template } from "./templateGen";

const name = "cwcyber";

const T = new Template(name);

T.node(1, 1, "text", "name", "Name");
T.node(13, 1, "text", "class", "Class");
T.node(25, 1, "number", "apprehension", "Apprehension");

T.node(42, 5, "stat", "stats.str", "Strength", statMethod("str"));
T.node(47, 5, "stat", "stats.dex", "Dexterity", statMethod("dex"));
T.node(52, 5, "stat", "stats.con", "Constitution", statMethod("con"));
T.node(42, 11.5, "stat", "stats.int", "Intelligence", statMethod("int"));
T.node(47, 11.5, "stat", "stats.wis", "Wisdom", statMethod("wis"));
T.node(52, 11.5, "stat", "stats.cha", "Charisma", statMethod("cha"));

T.node(35, 20, "textStep", "carry.light", "Light", {
  base: "30ft",
  style: "small row",
});
T.node(35, 23, "dynamicLabel", "", "max: ", carryMethod("L"));
T.node(45, 20, "textStep", "carry.medium", "Medium", {
  base: "20ft",
  style: "small row",
});
T.node(45, 23, "dynamicLabel", "", "max: ", carryMethod("M"));
T.node(55, 20, "textStep", "carry.heavy", "Heavy", {
  base: "10ft",
  style: "small row",
});
T.node(55, 23, "dynamicLabel", "", "max: ", carryMethod("H"));

export const template = T.exportTemplate();

function statMethod(stat: string) {
  const S = `stats.${stat}`;

  return {
    method: [
      {
        conditions: [["all", null, null]],
        converters: [
          ["cwStat", { op: op.Pass }, { value: S, DB: true }, null],
          ["numStringify", { op: op.Return, a: 0 }, null, null],
        ],
      },
    ],
    watch: [S],
  };
}

function carryMethod(w) {
  switch (w) {
    case "L":
      return {
        method: [
          {
            conditions: [["all", null, null]],
            converters: [
              [
                "max",
                { op: op.Return },
                { value: "stats.con", DB: true },
                { value: 1 },
              ],
            ],
          },
        ],
        watch: ["stats.con"],
      };
    case "M":
      return {
        method: [
          {
            conditions: [["all", null, null]],
            converters: [
              [
                "mul",
                { op: op.Pass },
                { value: "stats.con", DB: true },
                { value: 1.5 },
              ],
              ["max", { op: op.Return, a: 0 }, null, { value: 2 }],
            ],
          },
        ],
        watch: ["stats.con"],
      };
    case "H":
      return {
        method: [
          {
            conditions: [["all", null, null]],
            converters: [
              [
                "mul",
                { op: op.Pass },
                { value: "stats.con", DB: true },
                { value: 2 },
              ],
              ["max", { op: op.Return, a: 0 }, null, { value: 3 }],
            ],
          },
        ],
        watch: ["stats.con"],
      };
    default:
      break;
  }
}
