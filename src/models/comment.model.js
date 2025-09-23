import { model, Schema, Types } from "mongoose";

const CommentSchema = new Schema(
    {
        content: { type: String, required: true, minlength: 5, maxlength: 500 },
        author: { type: Types.ObjectId, ref: "User", required: true },
        article: { type: Types.ObjectId, ref: "Article" },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const CommentModel = model("Comment", CommentSchema);