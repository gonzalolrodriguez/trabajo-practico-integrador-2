import { model, Schema, Types } from "mongoose";

const ArticleSchema = new Schema(
    {
        title: { type: String, required: true, minlength: 3, maxlength: 200 },
        content: { type: String, required: true, minlength: 50 },
        excerpt: { type: String, maxlength: 500 },
        status: {
            type: String,
            enum: ["published", "archived"],
            default: "published",
        },
        author: {
            type: Types.ObjectId,
            ref: "User",
            required: true,
        },
        tags: [{ type: Types.ObjectId, ref: "Tag" }],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const ArticleModel = model("Article", ArticleSchema);