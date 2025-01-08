import mongoose from "mongoose";
import {UserFields, UsersMethods, UsersModel} from "../types";
import bcrypt from 'bcrypt';
import {randomUUID} from "node:crypto";

const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema<UserFields, UsersModel, UsersMethods>({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
});

UserSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
    this.token = randomUUID();
};

UserSchema.pre("save", async function (next) {
   if (!this.isModified("password")) {
       return next();
   }
   const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
   this.password = await bcrypt.hash(this.password, salt);
   next();
});

UserSchema.set('toJSON', {
    transform: (_doc, ret) => {
        delete ret.password;
        return ret;
    }
});

const Users = mongoose.model("Users", UserSchema);
export default Users;