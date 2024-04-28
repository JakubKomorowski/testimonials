/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
// import { CallableFunction } from "firebase-functions/v2/https";

// import { onRequest } from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";
import admin = require("firebase-admin");
import {getFirestore} from "firebase-admin/firestore";
import functions = require("firebase-functions");

try {
  admin.initializeApp();
} catch (e) {
  console.log(e);
}

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const updateUserDoc = functions.auth.user().onCreate(async (user) => {
  // Your new auth record will have the uid and email on it because
  // you used email as the way to create the auth record
  const db = getFirestore();
  return await db.collection("users").doc(user.uid).set({
    email: user.email,
  });
});

export const updateProjectDocWhenLoginByGoogle = functions.firestore
  .document("/users/{id}")
  .onCreate(async (snapshot, context) => {
    // Your new auth record will have the uid and email on it because
    // you used email as the way to create the auth record
    const db = getFirestore();
    return await db.collection("projects").doc().create({
      userId: snapshot.id,
    });
  });
