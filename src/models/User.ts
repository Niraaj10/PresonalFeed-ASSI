import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  image?: string;
  moviePreferences?: string[];
  newsPreferences?: string[];
  socialPreferences?: string[];
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    moviePreferences: { type: [String], default: [] },
    newsPreferences: { type: [String], default: [] },
    socialPreferences: { type: [String], default: [] },
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;