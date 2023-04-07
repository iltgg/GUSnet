const name = "bnb";

const character = {
  owner: "",
  data: {
    name: "",
    class: "",
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  },
  layout: {
    order: ["name", "class", "stats"],
    name: {
      order: [],
      type: "TextField",
      props: {
        data: "name",
        label: "Name: ",
        method: "",
        style: "",
      },
      slot: {
        on: false,
        style: "",
      },
      nest: {},
    },
    class: {
      order: [],
      type: "TextField",
      props: {
        data: "class",
        label: "Class: ",
        method: "",
        style: "",
      },
      slot: {
        on: false,
        style: "",
      },
      nest: {},
    },
    stats: {
      order: ["s", "d", "c", "i", "w", "ch"],
      type: null,
      props: {},
      slot: {
        on: true,
        style: "flex",
      },
      nest: {
        s: {
          order: [],
          type: "StatBlock",
          props: {
            data: "strength",
            label: "Strength: ",
            method: "bnb.modifier",
            style: "",
          },
          slot: {
            on: false,
            style: "",
          },
          nest: {},
        },
        d: {
          order: [],
          type: "StatBlock",
          props: {
            data: "dexterity",
            label: "Dexterity: ",
            method: "bnb.modifier",
            style: "",
          },
          slot: {
            on: false,
            style: "",
          },
          nest: {},
        },
        c: {
          order: [],
          type: "StatBlock",
          props: {
            data: "constitution",
            label: "Constitution: ",
            method: "bnb.modifier",
            style: "",
          },
          slot: {
            on: false,
            style: "",
          },
          nest: {},
        },
        i: {
          order: [],
          type: "StatBlock",
          props: {
            data: "intelligence",
            label: "Intelligence: ",
            method: "bnb.modifier",
            style: "",
          },
          slot: {
            on: false,
            style: "",
          },
          nest: {},
        },
        w: {
          order: [],
          type: "StatBlock",
          props: {
            data: "wisdom",
            label: "Wisdom: ",
            method: "bnb.modifier",
            style: "",
          },
          slot: {
            on: false,
            style: "",
          },
          nest: {},
        },
        ch: {
          order: [],
          type: "StatBlock",
          props: {
            data: "charisma",
            label: "Charisma: ",
            method: "bnb.modifier",
            style: "",
          },
          slot: {
            on: false,
            style: "",
          },
          nest: {},
        },
      },
    },
  },
};

export const layout = {
  name: name,
  character: character,
};
