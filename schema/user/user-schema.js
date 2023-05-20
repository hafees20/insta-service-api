import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types

const userSchema= mongoose.Schema({
    email:{type:String},
    password:{type:String},
    username:{type:String},
    dp:{type:String},
    bio:{type:String},
    followers:[{type:ObjectId,ref:"Users"}],
    following:[{type:ObjectId,ref:"Users"}]
},
{ timestamps: true }
);

const Users=mongoose.model('users',userSchema)

export default Users