import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../entities/User";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    if (!token) return next();
    const { username }: any = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOneBy({ username });
    console.log("user: ", user);

    // 유저정보 없다면 throw error
    if (!user) throw new Error("Unauthenticated");

    // 유저정보 res.local.user에 넣어주기
    res.locals.user = user;
    return next();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: "Something went wrong" });
  }
};
