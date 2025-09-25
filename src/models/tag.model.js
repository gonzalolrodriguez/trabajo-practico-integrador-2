import { model, Schema } from "mongoose";

const TagSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 2,
        maxlength: 30,
        match: [/^\S+$/, "No se permiten espacios"],
    },
    description: {
        type: String,
        maxlength: 200,
    },
}, {
    timestamps: true,
    versionKey: false,
});

export const TagModel = model("Tag", TagSchema);