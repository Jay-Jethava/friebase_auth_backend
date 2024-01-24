const admin = require("firebase-admin");

const serviceAccount = require("./auth-tes-4b6e1-firebase-adminsdk-5qtp5-327d4c0ca1.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
