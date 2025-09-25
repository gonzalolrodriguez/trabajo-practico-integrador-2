import { model, Schema } from "mongoose";

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            minlength: 3,
            maxlength: 20,
            match: /^[a-zA-Z0-9]+$/,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            match: /.+@.+\..+/,
        },
        password: { type: String, required: true, minlength: 6, select: false },
        role: {
            type: String,
            enum: ["user", "admin"],
        },
        profile: {
            firstName: {
                type: String,
                required: true,
                minlength: 2,
                maxlength: 50,
                match: [/^[A-Za-z]+$/, "Solo letras"],
            },
            lastName: {
                type: String,
                required: true,
                minlength: 2,
                maxlength: 50,
                match: [/^[A-Za-z]+$/, "Solo letras"],
            },
            biography: {
                type: String,
                maxlength: 500,
            },
            avatarUrl: {
                type: String,
                match: [/^(https?:\/\/)?([\w\d\-_]+\.)+[\w\d\-_]+(\/.*)?$/, "Formato URL inválido"],
            },
            birthDate: {
                type: Date,
            },
        },
        deleted_at: { type: Date, default: null },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
        versionKey: false,
    }
);

UserSchema.virtual("articles", {
    ref: "Article",
    localField: "_id",
    foreignField: "author",
});

UserSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "author",
});

export const UserModel = model("User", UserSchema);