import mongoose, { Document, Model, Schema } from "mongoose";

export interface PostContent {
  title: string;
  excerpt: string;
  publisher: { name: string };
  thumbnail: string;
  date: string;
  type: 'movie' | 'news' | 'social';
  key: string; 
}

export interface IFavorite extends Document {
  userId: string;
  contentId: string;
  type: 'movie' | 'news' | 'social';
  content: PostContent;
}

const FavoriteSchema: Schema<IFavorite> = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    contentId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['movie', 'news', 'social'],
      required: true,
    },
    content: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

const Favorite: Model<IFavorite> =
  mongoose.models.Favorite || mongoose.model<IFavorite>("Favorite", FavoriteSchema);

export default Favorite;
