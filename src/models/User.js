import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  user_name: String,
  email: String,
});

export default model("User", UserSchema);
