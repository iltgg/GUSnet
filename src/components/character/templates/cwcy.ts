import { op } from "../extension";
import { Template } from "./templateGen";

const name = "cwcyber";

const T = new Template(name);

T.newPage("Character");

const top = 3;

T.node(1, top, "text", "name", "Name");
T.node(13, top, "text", "class", "Class");
T.node(25, top, "number", "apprehension", "Apprehension");

T.node(42, top, "stat", "stats.str", "Strength", statMethod("str"));
T.node(50, top, "stat", "stats.dex", "Dexterity", statMethod("dex"));
T.node(58, top, "stat", "stats.con", "Constitution", statMethod("con"));
T.node(42, top + 8, "stat", "stats.int", "Intelligence", statMethod("int"));
T.node(50, top + 8, "stat", "stats.wis", "Wisdom", statMethod("wis"));
T.node(58, top + 8, "stat", "stats.cha", "Charisma", statMethod("cha"));

const inj = (a) => 1 + 12 * a;
const hi = (a) => top + 5 + 9 * a;

T.node(inj(0), top + 5, "textarea", "injury.fat1", "Fatal");

T.node(inj(0), hi(1), "textarea", "injury.dan1", "Dangers");
T.node(inj(1), hi(1), "textarea", "injury.dan2", "-");

T.node(inj(0), hi(2), "textarea", "injury.pai1", "Pains");
T.node(inj(1), hi(2), "textarea", "injury.pai2", "-");
T.node(inj(2), hi(2), "textarea", "injury.pai3", "-");

T.node(inj(0), hi(3), "textarea", "injury.dis1", "Distractions");
T.node(inj(1), hi(3), "textarea", "injury.dis2", "-");
T.node(inj(2), hi(3), "textarea", "injury.dis3", "-");
T.node(inj(3), hi(3), "textarea", "injury.dis4", "-");

T.node(inj(0), hi(4), "textarea", "injury.ann1", "Annoyances");
T.node(inj(1), hi(4), "textarea", "injury.ann2", "-");
T.node(inj(2), hi(4), "textarea", "injury.ann3", "-");
T.node(inj(3), hi(4), "textarea", "injury.ann4", "-");
T.node(inj(4), hi(4), "textarea", "injury.ann5", "-");

T.newPage("Inventory");

T.node(1, top, "textStep", "carry.light", "Light", {
  base: "30ft",
  style: "small row",
});
T.node(1, top + 3, "dynamicLabel", "", "max: ", carryMethod("L"));
T.node(11, top, "textStep", "carry.medium", "Medium", {
  base: "20ft",
  style: "small row",
});
T.node(11, top + 3, "dynamicLabel", "", "max: ", carryMethod("M"));
T.node(21, top, "textStep", "carry.heavy", "Heavy", {
  base: "10ft",
  style: "small row",
});
T.node(21, top + 3, "dynamicLabel", "", "max: ", carryMethod("H"));

T.node(30, top, "number", "money", "Money");

const s = 1;
const ta = (a) => s + a * 17;

T.node(s, top + 6, "textarea", "inv.hold", "Holding", { style: "skinny" });
T.node(ta(1), top + 6, "textarea", "inv.perm", "Permanent", {
  style: "skinny",
});
T.node(ta(2), top + 6, "textarea", "inv.abil", "Abilities", {
  style: "skinny",
});
T.node(ta(3), top + 6, "textarea", "inv.less", "Weightless", {
  style: "skinny",
});
T.node(s, top + 6 + 23, "textarea", "inv.store", "Storage", {
  style: "skinny",
});
T.node(ta(1), top + 6 + 23, "textarea", "inv.misc1", "Miscellaneous", {
  style: "skinny",
});
T.node(ta(2), top + 6 + 23, "textarea", "inv.misc2", "Miscellaneous", {
  style: "skinny",
});
T.node(ta(3), top + 6 + 23, "textarea", "inv.misc3", "Miscellaneous", {
  style: "skinny",
});

T.newPage("Skills");

const two = 15;
const row = (a, b) => top + 2.5 * (a + 1) + (b ? 0.5 : 0);

T.node(two, top, "label", "", "Proficiency");
T.node(two + 6, top, "label", "", "Expertise");

T.node(1, top + 2.5, "label", "", "Acrobatics (dex/con)");
T.node(
  two - 2,
  top + 2.5,
  "dynamicLabel",
  "",
  "",
  skillMethodDouble("dex", "con")
);
T.node(two - 1.7, top + 2, "checkbox", "stat.acroP", "");
T.node(two + 6 - 1.7, top + 2, "checkbox", "stat.acroE", "");

T.node(1, row(1, 1), "label", "", "Animal Handling (wis)");
T.node(two - 2, row(1, 1), "dynamicLabel", "", "", skillMethodSingle("wis"));
T.node(two - 1.7, row(1, 0), "checkbox", "stat.aniP", "");
T.node(two + 6 - 1.7, row(1, 0), "checkbox", "stat.aniE", "");

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

function skillMethodSingle(stat) {
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

function skillMethodDouble(stat1, stat2) {
  const S1 = `stats.${stat1}`;
  const S2 = `stats.${stat2}`;

  return {
    method: [
      {
        conditions: [["all", null, null]],
        converters: [
          ["cwStat", { op: op.Pass }, { value: S1, DB: true }, null],
          ["cwStat", { op: op.Append }, { value: S2, DB: true }, null],
          ["add", { op: op.Pass, a: 0, b: 1 }, null, null],
          ["div", { op: op.Pass, a: 0 }, null, { value: 2 }],
          ["floor", { op: op.Pass, a: 0 }, null, null],
          ["numStringify", { op: op.Return, a: 0 }, null, null],
        ],
      },
    ],
    watch: [S1, S2],
  };
}

function skillsMethod(s) {
  switch (s) {
    case "acro":
      return {
        method: [
          {
            conditions: [["all", null, null]],
            converters: [
              [
                "cwStat",
                { op: op.Pass },
                { value: "stats.dex", DB: true },
                null,
              ],
              [
                "cwStat",
                { op: op.Append },
                { value: "stats.con", DB: true },
                null,
              ],
              ["add", { op: op.Pass, a: 0, b: 1 }, null, null],
              ["div", { op: op.Pass, a: 0 }, null, { value: 2 }],
              ["floor", { op: op.Pass, a: 0 }, null, null],
              ["numStringify", { op: op.Return, a: 0 }, null, null],
            ],
          },
        ],
        watch: ["stats.dex", "stats.con"],
      };
    default:
      break;
  }
}
