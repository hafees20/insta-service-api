import { AUTH, CREDENTIALS } from "../../constants/constants.js";
import Users from "../../schema/user/user-schema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default class AuthController {
    // SignUp Function
    static signUp(req, res) {
        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            return res.status(400).json({ error: "Fill all the fields" });
        }
        Users.findOne({ email: email }).then((exist) => {
            if (exist) {
                return res.status(409).json({ error: "User exists with this email" })
            }
            else {
                Users.findOne({ username: username }).then((exist) => {
                    if (exist) {
                        return res.status(409).json({ error: "Username not available" })
                    } else {
                        bcrypt.hash(password, 12).then((hashedPassword) => {
                            const newUser = new Users({
                                email: email,
                                password: hashedPassword,
                                username: username,
                                dp: AUTH.NO_DP
                            })
                            newUser.save().then(() => {
                                res.json({ message: "Successfully Created" })
                            }
                            ).catch(err => {
                                return res.status(err.code ? err.code : 502).json({ error: err.message ? err.message : "Db Error" })
                            }
                            );
                        }).catch(err => {
                            return res.status(500).json({ error: "Server Crash" })
                        })
                    }
                }).catch((err) => {
                    res.status(502).json({ error: "Db Error" })
                })
            }
        }).catch((err) => {
            return res.status(502).json({ error: "Db Error" })
        })
    }

    // SignIn Function
    static signIn(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Fill all the fields" })
        } else {
            Users.findOne({ email: email }).then((user) => {
                if (user) {
                    bcrypt.compare(password, user.password).then((doMatch) => {
                        if (doMatch) {
                            const token = jwt.sign({ _id: user._id }, CREDENTIALS.JWT_SECRET)
                            const { _id, username, email, dp } = user
                            res.json({ message: "Successfully signed in", token: token, username: username, email: email, _id: _id, dp: dp })
                        } else {
                            return res.status(401).json({ error: "Invalid Password" })
                        }
                    }).catch(err => {
                        return res.status(500).json({ error: "Server Crash" })
                    });

                } else {
                    return res.status(401).json({ error: "No users found" })
                }

            }).catch((err) => {
                return res.status(502).json({ error: "Db Error" })
            });

        }
    }
}
