import { Router } from "express";
import jwt from "jsonwebtoken";
import { sample_users } from "../data";
import asyncHandler from "express-async-handler";
import { User, UserModel } from "../models/user.model";

const router = Router();

router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const usersCount = await UserModel.countDocuments();
    if (usersCount) {
      res.send("seed is already done");
      return;
    }
    await UserModel.create(sample_users);
    res.send("seed is done!");
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email, password });
    if (user) {
      res.send(generateTokenResponse(user));
    } else {
      res.status(400).send("User name or password is not valid!");
    }
  })
);

const generateTokenResponse = (user: User) => {
  const token = jwt.sign(
    {
      email: user.email,
      isAdmin: user.isAdmin,
    },
    "someRandomText",
    {
      expiresIn: "30d",
    }
  );

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    address: user.address,
    isAdmin: user.isAdmin,
    token: token,
  };
};

export default router;
