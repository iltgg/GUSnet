import { db, auth } from "./firebase";

import {
  doc,
  collection,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  arrayUnion,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { writable } from "svelte/store";

import { characterConverter } from "./character";

// import { character } from "./layouts/cw-cy";

export const universeData = writable({
  id: null,
  name: null,
  players: null,
  viewers: null,
  password: null,
  admins: null,
});

export const characterData = writable({
  characters: {},
});

/*
Load universe
Subscribe to data
 */

export async function loadUniverse(id) {
  let unsubscribe = [];

  const universeDoc = doc(db, "universes", id);
  const characterCollection = collection(
    db,
    "universes",
    id,
    "characters"
  ).withConverter(characterConverter);

  // const universeData = (await getDoc(universeDoc)).data();
  // const characterQuerySnapshot = await getDocs(characterCollection);

  unsubscribe.push(
    onSnapshot(universeDoc, (doc) => {
      let data = doc.data();
      universeData.set({
        id: id,
        name: data.name,
        players: data.players,
        viewers: data.viewers,
        password: data.password,
        admins: data.admins,
      });
    })
  );

  unsubscribe.push(
    onSnapshot(characterCollection, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        if (change.type == "added") {
          characterData.update((store) => {
            store.characters[change.doc.id] = change.doc.data();
            return store;
          });
        }
        if (change.type == "modified") {
          characterData.update((store) => {
            store.characters[change.doc.id] = change.doc.data();
            return store;
          });
        }
        if (change.type == "removed") {
          characterData.update((store) => {
            delete store.characters[change.doc.id];
            return store;
          });
        }
      });
    })
  );

  return unsubscribe;
}

export async function updateCharacter(universeId, characterId, data) {
  // TODO
  const characterDoc = doc(
    db,
    "universes",
    universeId,
    "characters",
    characterId
  );

  await updateDoc(characterDoc, data);
}

export async function addCharacter(id, character) {
  const newCharacter = await addDoc(
    collection(db, "universes", id, "characters").withConverter(
      characterConverter
    ),
    character
  );
}

export async function subscribeToData() {}
