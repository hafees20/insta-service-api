import { AUTH } from "../../constants/constants.js";
import Users from "../../schema/user/user-schema.js";
import bcrypt from 'bcrypt'

export default class AuthController {
    static async signUp(req, res) {
        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            return res.status(400).json({ error: "Enter all values" });
        }
        await Users.findOne({ email: email }).then((exist) => {
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
                                console.log(err)
                            }
                            );
                        })
                    }
                })

            }
        })
    }

    static signIn(req, res) {
        res.send('Signed in');
    }
}
