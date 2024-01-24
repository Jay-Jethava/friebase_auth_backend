const firebase = require("firebase-admin");

exports.verifyUser = async (req, res, next) => {
  try {
    firebase
      .auth()
      .verifyIdToken(req.body.firebase_token)
      .then(async (data) => {
        ``;
        console.log(data);

        // Authentication
      })
      .catch((err) => {
        console.log(err);
        res.status(401).json({
          status: "fail",
          message: err.message,
        });
      });
  } catch (err) {
    next(err);
  }
};
