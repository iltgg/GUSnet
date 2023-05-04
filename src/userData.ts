import { auth, db } from "./firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  doc,
  collection,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  arrayUnion,
} from "firebase/firestore";
import { writable } from "svelte/store";
import { push } from "svelte-spa-router";

// store containing auth user object and db data
export const userData = writable({
  user: null,
  username: null,
  universes: null,
});

export function setAuthStateListener(f) {
  onAuthStateChanged(auth, f);
}

export async function updateUserData() {
  if (!auth.currentUser) {
    userData.set({
      user: null,
      username: null,
      universes: null,
    });

    return;
  }

  try {
    const userDoc = doc(db, "users", auth.currentUser.uid);

    const data = (await getDoc(userDoc)).data();

    const universes = {};
    for (const uni of data.universes) {
      // console.log(uni);
      const uniDoc = doc(db, "universes", uni);
      const uniData = (await getDoc(uniDoc)).data();
      universes[uni] = { id: uni, name: uniData.name };
      // console.log(universes[uni]);
    }
    // data.universes.forEach(async (uni) => {
    //   console.log(uni);
    //   const uniDoc = doc(db, "universes", uni);
    //   const uniData = (await getDoc(uniDoc)).data();
    //   universes[uni] = { id: uni, name: uniData.name };
    //   console.log(universes[uni]);
    // });
    // console.log(data.universes);

    userData.set({
      user: auth.currentUser,
      username: data.username,
      universes: universes,
    });
  } catch (error) {
    return error;
  }
}

export async function emailSignUp(email, password, username) {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const userDoc = doc(db, "users", user.uid);
    await setDoc(userDoc, { username: username, universes: [] });

    updateUserData();
  } catch (error) {
    return error;
  }
}

export async function emailSignIn(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);

    updateUserData();
  } catch (error) {
    return error;
  }
}

export async function addUniverse(id, password) {
  const universeDoc = doc(db, "universes", id);

  try {
    const snapshot = await getDoc(universeDoc);

    if (snapshot.exists()) {
      const userDoc = doc(db, "users", auth.currentUser.uid);

      const userUniverses = (await getDoc(userDoc)).data().universes;

      if (userUniverses.indexOf(id) !== -1) {
        return "already in universe";
      }

      await updateDoc(doc(db, "universes", id), {
        viewers: arrayUnion(auth.currentUser.uid),
        players: arrayUnion(auth.currentUser.uid), // right now viewers and players are effectively the same, don't forget to update firestore rules if this changes in the future
        password: password,
      });
      await updateDoc(userDoc, {
        universes: arrayUnion(id),
      });

      await updateUserData();
    } else {
      return "universe does not exist";
    }
  } catch (error) {
    if (error.code === "permission-denied") {
      return "invalid or wrong password";
    }
    return error.code;
  }
}

export async function userSignOut() {
  push("/login");
  await signOut(auth);
}

export async function emailPasswordReset(email) {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    return error;
  }
}
