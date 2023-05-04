import { op } from "../extension";
import { Template } from "./templateGen";

const name = "Cleared Waters";

const T = new Template(name);

T.newPage("Character");

const top = 3;

T.node(1, top, "text", "name", "Name");
T.node(13, top, "text", "antexis", "Antecedent Existence");
T.node(25, top, "text", "prevoc", "Preliminary Vocation");
T.node(37, top, "number", "apprehension", "Apprehension");

T.node(42+5, top, "stat", "stats.str", "Strength", statMethod("str"));
T.node(50+5, top, "stat", "stats.dex", "Dexterity", statMethod("dex"));
T.node(58+5, top, "stat", "stats.con", "Constitution", statMethod("con"));
T.node(42+5, top + 8, "stat", "stats.int", "Intelligence", statMethod("int"));
T.node(50+5, top + 8, "stat", "stats.wis", "Wisdom", statMethod("wis"));
T.node(58+5, top + 8, "stat", "stats.cha", "Charisma", statMethod("cha"));

const inj = (a) => 1 + 12 * a;
const hi = (a) => top + 4 + 7 * a;

T.node(inj(0), hi(0), "textarea", "injury.fat1", "Fatal", { style: "short" });

T.node(inj(0), hi(1), "textarea", "injury.dan1", "Dangers", { style: "short" });
T.node(inj(1), hi(1), "textarea", "injury.dan2", "-", { style: "short" });

T.node(inj(0), hi(2), "textarea", "injury.pai1", "Pains", { style: "short" });
T.node(inj(1), hi(2), "textarea", "injury.pai2", "-", { style: "short" });
T.node(inj(2), hi(2), "textarea", "injury.pai3", "-", { style: "short" });

T.node(inj(0), hi(3), "textarea", "injury.dis1", "Distractions", {
  style: "short",
});
T.node(inj(1), hi(3), "textarea", "injury.dis2", "-", { style: "short" });
T.node(inj(2), hi(3), "textarea", "injury.dis3", "-", { style: "short" });
T.node(inj(3), hi(3), "textarea", "injury.dis4", "-", { style: "short" });

T.node(inj(0), hi(4), "textarea", "injury.ann1", "Annoyances", {
  style: "short",
});
T.node(inj(1), hi(4), "textarea", "injury.ann2", "-", { style: "short" });
T.node(inj(2), hi(4), "textarea", "injury.ann3", "-", { style: "short" });
T.node(inj(3), hi(4), "textarea", "injury.ann4", "-", { style: "short" });
T.node(inj(4), hi(4), "textarea", "injury.ann5", "-", { style: "short" });

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
const ta = (a) => s + a * 25;

T.node(s, top + 6, "textarea", "inv.hold", "Holding", {
  style: "large small-text",
});
T.node(ta(1), top + 6, "textarea", "inv.perm", "Permanent", {
  style: "large small-text",
});
T.node(ta(2), top + 6, "textarea", "inv.abil", "Abilities", {
  style: "large small-text",
});
T.node(ta(3), top + 6, "textarea", "inv.less", "Weightless", {
  style: "large small-text",
});
T.node(s, top + 6 + 18, "textarea", "inv.store", "Storage", {
  style: "large small-text",
});
T.node(ta(1), top + 6 + 18, "textarea", "inv.misc1", "Miscellaneous", {
  style: "large small-text",
});
T.node(ta(2), top + 6 + 18, "textarea", "inv.misc2", "Miscellaneous", {
  style: "large small-text",
});
T.node(ta(3), top + 6 + 18, "textarea", "inv.misc3", "Miscellaneous", {
  style: "large small-text",
});

T.newPage("Prowesses");

T.node(1, top, "number", "prow.app", "Accumulated Peculiarity Points");

T.node(1, top + 5, "label", "", "Accumulated Statistical Training");
T.node(1, top + 6, "number", "prow.aststr", "Strength", { style: "small row" });
T.node(1, top + 8, "number", "prow.astdex", "Dexterity", {
  style: "small row",
});
T.node(1, top + 10, "number", "prow.astcon", "Constitution", {
  style: "small row",
});
T.node(1, top + 12, "number", "prow.astint", "Intelligence", {
  style: "small row",
});
T.node(1, top + 14, "number", "prow.astwis", "Wisdom", { style: "small row" });
T.node(1, top + 16, "number", "prow.astcha", "Charisma", {
  style: "small row",
});

T.node(11, top + 6.5, "label", "", "/5");
T.node(11, top + 8.5, "label", "", "/5");
T.node(11, top + 10.5, "label", "", "/5");
T.node(11, top + 12.5, "label", "", "/5");
T.node(11, top + 14.5, "label", "", "/5");
T.node(11, top + 16.5, "label", "", "/5");

T.node(1, top + 20, "number", "prow.apt", "Accumulated Peculiarity Training");
T.node(11.5, top + 21.5 + 0.15, "label", "", "/5");

T.node(1, top + 25, "label", "", "Wound Recuperation");
T.node(1, top + 27, "text", "prow.rec", "Recovering Wound");
T.node(1, top + 31, "number", "prow.req", "Weeks Required");

T.node(20, top, "textarea", "prow.pec", "Peculiarities", {
  style: "skinny-tall",
});
T.node(37, top, "textarea", "prow.lore", "Lore", { style: "skinny-tall" });
T.node(54, top, "textarea", "prow.notes", "Notes", { style: "skinny-tall" });
T.node(71, top, "textarea", "prow.info", "Info", { style: "skinny-tall" });

T.newPage("Skills");

const two = 15;
const row = (a, b) => top + 2.5 * (a + 1) + (b ? 0.5 : 0);

T.node(two, top, "label", "", "Proficiency");
T.node(two + 6, top, "label", "", "Expertise");

T.node(1, row(0, 1), "label", "", "Acrobatics (dex/con)");
T.node(
  two - 2,
  row(0, 1),
  "dynamicLabel",
  "",
  "",
  skillMethodDouble("dex", "con")
);
T.node(two - 1.7, row(0, 0), "checkbox", "skill.acroP", "");
T.node(two + 6 - 1.7, row(0, 0), "checkbox", "skill.acroE", "");

T.node(1, row(1, 1), "label", "", "Animal Handling (wis)");
T.node(two - 2, row(1, 1), "dynamicLabel", "", "", skillMethodSingle("wis"));
T.node(two - 1.7, row(1, 0), "checkbox", "skill.aniP", "");
T.node(two + 6 - 1.7, row(1, 0), "checkbox", "skill.aniE", "");

T.node(1, row(2, 1), "label", "", "Antiquary (wis/int)");
T.node(
  two - 2,
  row(2, 1),
  "dynamicLabel",
  "",
  "",
  skillMethodDouble("wis", "int")
);
T.node(two - 1.7, row(2, 0), "checkbox", "skill.antP", "");
T.node(two + 6 - 1.7, row(2, 0), "checkbox", "skill.antE", "");

T.node(1, row(3, 1), "label", "", "Athletics (str/con)");
T.node(
  two - 2,
  row(3, 1),
  "dynamicLabel",
  "",
  "",
  skillMethodDouble("str", "con")
);
T.node(two - 1.7, row(3, 0), "checkbox", "skill.athP", "");
T.node(two + 6 - 1.7, row(3, 0), "checkbox", "skill.athE", "");

T.node(1, row(4, 1), "label", "", "Coercion (cha)");
T.node(two - 2, row(4, 1), "dynamicLabel", "", "", skillMethodSingle("cha"));
T.node(two - 1.7, row(4, 0), "checkbox", "skill.coeP", "");
T.node(two + 6 - 1.7, row(4, 0), "checkbox", "skill.coeE", "");

T.node(1, row(5, 1), "label", "", "Cognizance (wis)");
T.node(two - 2, row(5, 1), "dynamicLabel", "", "", skillMethodSingle("wis"));
T.node(two - 1.7, row(5, 0), "checkbox", "skill.cogP", "");
T.node(two + 6 - 1.7, row(5, 0), "checkbox", "skill.cogE", "");

T.node(1, row(6, 1), "label", "", "Deceit (cha)");
T.node(two - 2, row(6, 1), "dynamicLabel", "", "", skillMethodSingle("cha"));
T.node(two - 1.7, row(6, 0), "checkbox", "skill.decP", "");
T.node(two + 6 - 1.7, row(6, 0), "checkbox", "skill.decE", "");

T.node(1, row(7, 1), "label", "", "Driving (dex/int)");
T.node(
  two - 2,
  row(7, 1),
  "dynamicLabel",
  "",
  "",
  skillMethodDouble("dex", "int")
);
T.node(two - 1.7, row(7, 0), "checkbox", "skill.driP", "");
T.node(two + 6 - 1.7, row(7, 0), "checkbox", "skill.driE", "");

T.node(1, row(8, 1), "label", "", "Examination (int)");
T.node(two - 2, row(8, 1), "dynamicLabel", "", "", skillMethodSingle("int"));
T.node(two - 1.7, row(8, 0), "checkbox", "skill.exaP", "");
T.node(two + 6 - 1.7, row(8, 0), "checkbox", "skill.exaE", "");

T.node(1, row(9, 1), "label", "", "Machinery (wis/str)");
T.node(
  two - 2,
  row(9, 1),
  "dynamicLabel",
  "",
  "",
  skillMethodDouble("wis", "str")
);
T.node(two - 1.7, row(9, 0), "checkbox", "skill.macP", "");
T.node(two + 6 - 1.7, row(9, 0), "checkbox", "skill.macE", "");

T.node(1, row(10, 1), "label", "", "Medicine (wis)");
T.node(two - 2, row(10, 1), "dynamicLabel", "", "", skillMethodSingle("wis"));
T.node(two - 1.7, row(10, 0), "checkbox", "skill.medP", "");
T.node(two + 6 - 1.7, row(10, 0), "checkbox", "skill.medE", "");

T.node(1, row(11, 1), "label", "", "Munitions (int/wis)");
T.node(
  two - 2,
  row(11, 1),
  "dynamicLabel",
  "",
  "",
  skillMethodDouble("int", "wis")
);
T.node(two - 1.7, row(11, 0), "checkbox", "skill.munP", "");
T.node(two + 6 - 1.7, row(11, 0), "checkbox", "skill.munE", "");

T.node(1, row(12, 1), "label", "", "Nature (int)");
T.node(two - 2, row(12, 1), "dynamicLabel", "", "", skillMethodSingle("int"));
T.node(two - 1.7, row(12, 0), "checkbox", "skill.natP", "");
T.node(two + 6 - 1.7, row(12, 0), "checkbox", "skill.natE", "");

T.node(1, row(13, 1), "label", "", "Occult (wis)");
T.node(two - 2, row(13, 1), "dynamicLabel", "", "", skillMethodSingle("wis"));
T.node(two - 1.7, row(13, 0), "checkbox", "skill.occP", "");
T.node(two + 6 - 1.7, row(13, 0), "checkbox", "skill.occE", "");

T.node(1, row(14, 1), "label", "", "Persuasion (cha)");
T.node(two - 2, row(14, 1), "dynamicLabel", "", "", skillMethodSingle("cha"));
T.node(two - 1.7, row(14, 0), "checkbox", "skill.perP", "");
T.node(two + 6 - 1.7, row(14, 0), "checkbox", "skill.perE", "");

T.node(1, row(15, 1), "label", "", "Sleight of Hand (dex)");
T.node(two - 2, row(15, 1), "dynamicLabel", "", "", skillMethodSingle("dex"));
T.node(two - 1.7, row(15, 0), "checkbox", "skill.sleP", "");
T.node(two + 6 - 1.7, row(15, 0), "checkbox", "skill.sleE", "");

T.node(1, row(16, 1), "label", "", "Software (int)");
T.node(two - 2, row(16, 1), "dynamicLabel", "", "", skillMethodSingle("int"));
T.node(two - 1.7, row(16, 0), "checkbox", "skill.sofP", "");
T.node(two + 6 - 1.7, row(16, 0), "checkbox", "skill.sofE", "");

T.node(1, row(17, 1), "label", "", "Stealth (dex)");
T.node(two - 2, row(17, 1), "dynamicLabel", "", "", skillMethodSingle("dex"));
T.node(two - 1.7, row(17, 0), "checkbox", "skill.steP", "");
T.node(two + 6 - 1.7, row(17, 0), "checkbox", "skill.steE", "");

T.node(1, row(18, 1), "label", "", "Theology (wis)");
T.node(two - 2, row(18, 1), "dynamicLabel", "", "", skillMethodSingle("wis"));
T.node(two - 1.7, row(18, 0), "checkbox", "skill.theP", "");
T.node(two + 6 - 1.7, row(18, 0), "checkbox", "skill.theE", "");

T.node(1, row(19, 1), "label", "", "Tracking (int/wis)");
T.node(
  two - 2,
  row(19, 1),
  "dynamicLabel",
  "",
  "",
  skillMethodDouble("int", "wis")
);
T.node(two - 1.7, row(19, 0), "checkbox", "skill.traP", "");
T.node(two + 6 - 1.7, row(19, 0), "checkbox", "skill.traE", "");

T.node(1, row(20, 1), "label", "", "Verdure (str)");
T.node(two - 2, row(20, 1), "dynamicLabel", "", "", skillMethodSingle("str"));
T.node(two - 1.7, row(20, 0), "checkbox", "skill.verP", "");
T.node(two + 6 - 1.7, row(20, 0), "checkbox", "skill.verE", "");

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
              ["floor", { op: op.Pass, a: 0 }, null, null],
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
              ["floor", { op: op.Pass, a: 0 }, null, null],
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
