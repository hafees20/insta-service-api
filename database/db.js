import mongoose from "mongoose";
import { CREDENTIALS } from "../constants/constants.js";

const connection = () => {
    mongoose.connect(CREDENTIALS.MONGOURI
        , { useUnifiedTopology: true, useNewUrlParser: true },
        (err, data) => {
            if (err) {
                console.log({"error":err})
               return 
            }
            console.log("Database Conected ...")
        })
}
export default connection