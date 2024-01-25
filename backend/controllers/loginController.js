const firebase = require("firebase-admin");

exports.socialAuth = async (req, res, next) => {
  console.log("payload", req.body);

  firebase
    .auth()
    .verifyIdToken(req.body.firebaseToken)
    .then(async (firebaseUser) => {
      console.log(firebaseUser);

      return;

      if (firebaseUser.email_verified !== true)
        return next(
          createError(401, "Email is not verified, Try with another email.")
        );

      let [user] = await userService.get({
        where: { email: firebaseUser.email },
      });

      console.log(user);

      if (!user)
        user = await userService.create({
          email: firebaseUser.email,
          name: firebaseUser.name,
        });

      // Sign a JWT Token as Login Token
      const token = jwt.sign(
        {
          // id: user.id,
          // email: user.email,
          ...user.toJSON(),
          role: "user",
        },
        process.env.JWT_SECRET
      );
      res.status(200).json({
        status: 200,
        token,
      });
    })
    .catch(async (err) => {
      console.log(err);
      // TODO: Remove this temp cath
      const firebaseUser = jwt.verify(
        req.body.firebase_token,
        process.env.JWT_SECRET
      );

      const [user] = await userService.get({
        where: { email: firebaseUser.email },
      });

      if (!user)
        user = await userService.create({
          email: firebaseUser.email,
          name: firebaseUser.name,
        });

      // Sign a JWT Token as Login Token
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: "user",
        },
        process.env.JWT_SECRET
      );

      res.status(200).json({
        status: 200,
        token,
      });
    })
    .catch((err) => next(err));
};
