import { Bytes } from "firebase/firestore";
import { compressToUint8Array, decompressFromUint8Array } from "lz-string";

// export class Character {
//   owner: string;
//   data: object;
//   layout: object;
//   constructor(owner = "", data = { name: "placeholder" }, layout = []) {
//     this.owner = owner;
//     this.data = data;
//     this.layout = layout;
//   }
// }

export const characterConverter = {
  toFirestore: (character) => {
    return {
      owner: character.owner,
      // name: character.name,
      data: character.data,
      layout: Bytes.fromUint8Array(
        compressToUint8Array(JSON.stringify(character.layout))
      ),
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return {
      owner: data.owner,
      data: data.data,
      layout: JSON.parse(decompressFromUint8Array(data.layout.toUint8Array())),
    };
  },
};
