import { AUTH, CREDENTIALS } from "../../constants/constants.js";
import Users from "../../schema/user/user-schema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default class AuthController {
    // SignUp Function
    static signUp(req, res) {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return res.status(400).json({ error: "Please enter all values" });
        }

        Users.findOne({ email })
            .then((existingUserWithEmail) => {
                if (existingUserWithEmail) {
                    return res.status(409).json({ error: "User already exists with this email" });
                }

                Users.findOne({ username })
                    .then((existingUserWithUsername) => {
                        if (existingUserWithUsername) {
                            return res.status(409).json({ error: "Username not available" });
                        }

                        bcrypt.hash(password, 12)
                            .then((hashedPassword) => {
                                const newUser = new Users({
                                    email,
                                    password: hashedPassword,
                                    username,
                                    dp: AUTH.NO_DP
                                });

                                newUser.save()
                                    .then(() => {
                                        res.json({ message: "User successfully created" });
                                    })
                                    .catch((err) => {
                                        return res.status(502).json({ error: err.message || "Database error" });
                                    });
                            })
                            .catch(() => {
                                return res.status(500).json({ error: "Server error" });
                            });
                    })
                    .catch(() => {
                        res.status(502).json({ error: "Database error" });
                    });
            })
            .catch(() => {
                return res.status(502).json({ error: "Database error" });
            });
    }

    // SignIn Function
    static signIn(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Please fill in all the fields" });
        }

        Users.findOne({ email })
            .then((user) => {
                if (!user) {
                    return res.status(401).json({ error: "Invalid email or password" });
                }

                bcrypt.compare(password, user.password)
                    .then((doMatch) => {
                        if (doMatch) {
                            const token = jwt.sign({ _id: user._id }, CREDENTIALS.JWT_SECRET);
                            const { _id, username, email, dp } = user;

                            res.json({
                                message: "Successfully signed in",
                                token,
                                username,
                                email,
                                _id,
                                dp,
                            });
                        } else {
                            return res.status(401).json({ error: "Invalid email or password" });
                        }
                    })
                    .catch((err) => {
                        return res.status(500).json({ error: "Server Crash" });
                    });
            })
            .catch((err) => {
                return res.status(502).json({ error: "Db Error" });
            });
    }
}
