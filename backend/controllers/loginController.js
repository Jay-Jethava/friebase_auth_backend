const firebase = require("firebase-admin");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

exports.socialAuth = async (req, res, next) => {
  console.log("payload", req.body);

  firebase
    .auth()
    .verifyIdToken(req.body.firebaseToken)
    .then(async (firebaseUser) => {
      console.log(firebaseUser);

      if (firebaseUser.email_verified !== true)
        return next(
          createError(401, "Email is not verified, Try with another email.")
        );

      // Fetch user from DB with required attributes to sign login token

      // Sign a JWT Token as Login Token
      const token = jwt.sign(
        {
          // id: user.id,
          // email: user.email,
          email: firebaseUser.email,
          role: "user",
        },
        process.env.JWT_SECRET
      );

      return res.status(200).json({
        status: "success",
        message: "Login successful",
        token,
      });
    })
    .catch((err) => next(err));
};
