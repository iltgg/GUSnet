const name = "cwcyber";

const character = {
  owner: "",
  data: {
    main: {
      name: "",
      class: "",
      apprehension: "",
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
      carryL: 1,
      carryM: 2,
      carryH: 3,
      inventory: "",
    },
    inj: {
      fatal0: "",
      danger0: "",
      danger1: "",
      pain0: "",
      pain1: "",
      pain2: "",
      distraction0: "",
      distraction1: "",
      distraction2: "",
      distraction3: "",
      annoyance0: "",
      annoyance1: "",
      annoyance2: "",
      annoyance3: "",
      annoyance4: "",
    },
    skills: {
      acroP: false,
      acroE: false,
    },
  },
  layout: {
    order: ["info", "fields", "skills"],
    info: {
      order: ["name", "class", "apprehension"],
      type: null,
      props: null,
      slot: {
        style: "flex j-center",
      },
      nest: {
        name: {
          order: [],
          type: "TextField",
          props: {
            data: "name",
            label: "Name: ",
            style: "",
          },
          slot: null,
          nest: null,
        },
        class: {
          order: [],
          type: "TextField",
          props: {
            data: "class",
            label: "Class: ",
            style: "",
          },
          slot: null,
          nest: null,
        },
        apprehension: {
          order: [],
          type: "NumberField",
          props: {
            data: "apprehension",
            label: "Apprehension: ",
            style: "",
          },
          slot: null,
          nest: null,
        },
      },
    },

    fields: {
      order: ["injury", "statInv"],
      type: null,
      props: null,
      slot: {
        style: "flex a-start",
      },
      nest: {
        injury: {
          order: ["fatal", "danger", "pain", "distraction", "annoyance"],
          type: null,
          props: null,
          slot: {
            style: "flex col a-center",
          },
          nest: {
            fatal: {
              order: [],
              type: "MultiTextBlock",
              props: {
                data: "",
                label: "Fatal",
                style: "",
                multi: ["inj.fatal0"],
              },
              slot: null,
              nest: null,
            },
            danger: {
              order: [],
              type: "MultiTextBlock",
              props: {
                data: "",
                label: "Dangers",
                style: "",
                multi: ["inj.danger0", "inj.danger1"],
              },
              slot: null,
              nest: null,
            },
            pain: {
              order: [],
              type: "MultiTextBlock",
              props: {
                data: "",
                label: "Pains",
                style: "",
                multi: ["inj.pain0", "inj.pain1", "inj.pain2"],
              },
              slot: null,
              nest: null,
            },
            distraction: {
              order: [],
              type: "MultiTextBlock",
              props: {
                data: "",
                label: "Distractions",
                style: "",
                multi: [
                  "inj.distraction0",
                  "inj.distraction1",
                  "inj.distraction2",
                  "inj.distraction3",
                ],
              },
              slot: null,
              nest: null,
            },
            annoyance: {
              order: [],
              type: "MultiTextBlock",
              props: {
                data: "",
                label: "Annoyances",
                style: "",
                multi: [
                  "inj.annoyance0",
                  "inj.annoyance1",
                  "inj.annoyance2",
                  "inj.annoyance3",
                  "inj.annoyance4",
                ],
              },
              slot: null,
              nest: null,
            },
          },
        },
        statInv: {
          order: ["stat", "carry", "inv"],
          type: null,
          props: null,
          slot: { style: "flex col a-center" },
          nest: {
            stat: {
              order: ["s", "d", "c", "i", "w", "ch"],
              type: null,
              props: null,
              slot: {
                style: "grid y2 x3",
              },
              nest: {
                s: {
                  order: [],
                  type: "StatBlock",
                  props: {
                    data: "strength",
                    label: "Strength: ",
                    method: "cw.modifier",
                    style: "",
                  },
                  slot: null,
                  nest: null,
                },
                d: {
                  order: [],
                  type: "StatBlock",
                  props: {
                    data: "dexterity",
                    label: "Dexterity: ",
                    method: "cw.modifier",
                    style: "",
                  },
                  slot: null,
                  nest: null,
                },
                c: {
                  order: [],
                  type: "StatBlock",
                  props: {
                    data: "constitution",
                    label: "Constitution: ",
                    method: "cw.modifier",
                    style: "",
                  },
                  slot: null,
                  nest: null,
                },
                i: {
                  order: [],
                  type: "StatBlock",
                  props: {
                    data: "intelligence",
                    label: "Intelligence: ",
                    method: "cw.modifier",
                    style: "",
                  },
                  slot: null,
                  nest: null,
                },
                w: {
                  order: [],
                  type: "StatBlock",
                  props: {
                    data: "wisdom",
                    label: "Wisdom: ",
                    method: "cw.modifier",
                    style: "",
                  },
                  slot: null,
                  nest: null,
                },
                ch: {
                  order: [],
                  type: "StatBlock",
                  props: {
                    data: "charisma",
                    label: "Charisma: ",
                    method: "cw.modifier",
                    style: "",
                  },
                  slot: null,
                  nest: null,
                },
              },
            },
            carry: {
              order: ["l", "m", "h"],
              type: null,
              props: null,
              slot: { style: "flex row" },
              nest: {
                l: {
                  order: [],
                  type: "NumberFieldMethod",
                  props: {
                    data: "carryL",
                    label: "Light | 30ft",
                    method: "cw.carryWeight",
                    methodProps: {
                      data: { case: "L" },
                      send: [{ data: "constitution", name: "con" }],
                    },
                    style: "",
                  },
                  slot: null,
                  nest: null,
                },
                m: {
                  order: [],
                  type: "NumberFieldMethod",
                  props: {
                    data: "carryM",
                    label: "Medium | 20ft",
                    method: "cw.carryWeight",
                    methodProps: {
                      data: { case: "M" },
                      send: [{ data: "constitution", name: "con" }],
                    },
                    style: "",
                  },
                  slot: null,
                  nest: null,
                },
                h: {
                  order: [],
                  type: "NumberFieldMethod",
                  props: {
                    data: "carryH",
                    label: "Heavy | 10ft",
                    method: "cw.carryWeight",
                    methodProps: {
                      data: { case: "H" },
                      send: [{ data: "constitution", name: "con" }],
                    },
                    style: "",
                  },
                  slot: null,
                  nest: null,
                },
              },
            },
            inv: {
              order: [],
              type: "TextBlock",
              props: {
                data: "inventory",
                label: "Inventory",
                style: "large resize",
              },
              slot: null,
              nest: null,
            },
          },
        },
      },
    },

    skills: {
      order: ["label", "acro"],
      type: null,
      props: null,
      slot: {
        style: "flex col w-fit-content a-end",
      },
      nest: {
        label: {
          order: ["p", "e"],
          type: null,
          props: null,
          slot: { style: "flex row a-center" },
          nest: {
            p: {
              order: [],
              type: "Label",
              props: {
                data: "",
                label: "Proficiency",
                style: "w-6 center",
              },
              slot: null,
              nest: null,
            },
            e: {
              order: [],
              type: "Label",
              props: {
                data: "",
                label: "Expertise",
                style: "w-6 center",
              },
              slot: null,
              nest: null,
            },
          },
        },
        acro: {
          order: ["s", "p", "e"],
          type: null,
          props: null,
          slot: { style: "flex row a-center" },
          nest: {
            s: {
              order: [],
              type: "MethodValue",
              props: {
                data: "",
                label: "Acrobatic (Dex/Con)",
                method: "cw.skills",
                methodProps: {
                  data: { case: 0 },
                  send: [
                    { data: "dexterity", name: "dex" },
                    { data: "constitution", name: "con" },
                  ],
                },
                style: "",
              },
              slot: null,
              nest: null,
            },
            p: {
              order: [],
              type: "OnOff",
              props: {
                data: "skills.acroP",
                label: "",
                style: "",
              },
              slot: null,
              nest: null,
            },
            e: {
              order: [],
              type: "OnOff",
              props: {
                data: "skills.acroE",
                label: "",
                style: "",
              },
              slot: null,
              nest: null,
            },
          },
        },
      },
    },
  },
};

export const layout = {
  name: name,
  character: character,
};
