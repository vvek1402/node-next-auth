import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { storeUser, getUserByEmail } from "../services/AuthService";
import User from "../interfaces/User";

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
      return;
    }

    const user: User | null = await getUserByEmail({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token: string = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY as string,
        {
          expiresIn: "5h",
        }
      );

      user.token = token;

      res.status(200).json(user);
    } else {
      res.status(400).json({ error: "Invalid Credential" });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    if (!(email && password && username)) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    const oldUser: User | null = await getUserByEmail({ email });

    if (oldUser) {
      res.status(409).json({ error: "User Already Exists" });
      return;
    }

    const encryptedUserPassword: string = await bcrypt.hash(password, 10);

    const data: User = {
      username,
      email: email.toLowerCase(),
      password: encryptedUserPassword,
    };

    const user: User = await storeUser(data);

    const token: string = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY as string,
      {
        expiresIn: "5h",
      }
    );

    user.token = token;

    res.status(201).json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
