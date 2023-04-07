export class Character {
  owner: string;
  data: object;
  layout: object;
  constructor(
    owner = "",
    data = { name: "placeholder" },
    layout = { order: [] }
  ) {
    this.owner = owner;
    // this.name = name;
    this.data = data;
    this.layout = layout;
  }
}

export const characterConverter = {
  toFirestore: (character) => {
    return {
      owner: character.owner,
      // name: character.name,
      data: character.data,
      layout: JSON.stringify(character.layout),
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Character(
      data.owner,
      // data.name,
      data.data,
      JSON.parse(data.layout)
    );
  },
};
