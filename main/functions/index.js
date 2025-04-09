/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started
/*
 exports.helloWorld = onRequest((request, response) => {
   logger.info("Hello logs!", {structuredData: true});
   response.send("Hello from Firebase!");
 });
*/

const admin = require("firebase-admin");
admin.initializeApp(); // Initialize the admin SDK
const db = admin.firestore();

exports.addCoupon = onRequest(async (request, response) => {
  if (request.method !== "POST") {
    response.status(405).send("Only POST requests are allowed");
    return;
  }

  const { store, code, discount } = request.body;

  if (!store || !code || !discount) {
    response.status(400).send("Invalid coupon format");
    return;
  }

  try {
    await db.collection("coupons").add({ store, code, discount });
    response.status(200).send("Coupon added successfully");
  } catch (error) {
    console.error("Error adding coupon ", error);
    response.status(500).send("Internal Server Error");
  }
});
