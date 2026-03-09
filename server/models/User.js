import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            minlength: 3,
            lowercase: true,
            trim: true,
            validate: [
                {
                    validator: (v) => validator.isAlphanumeric(v),
                    message: "Username can only contain letters and numbers"
                },
                {
                    validator: (v) => v.length >= 3 && v.length <= 30,
                    message: "Username must be between 3 and 30 characters"
                }
            ]
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [
                {
                    validator: (v) => validator.isEmail(v),
                    message: "Invalid Email"
                },
                {
                    validator: (v) => v.endsWith("@my.yorku.ca"),
                    message: "Must be a @my.yorku.ca address"
                }
            ]
        },
        password: {
            type: String,
            required: true,
            minlength: [8, "Password must be atleast 8 characters"]
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        ratingsCount: {
            type: Number,
            default: 0,
            min: 0
        }
    },
    { timestamps: true }
);

// Hashing Password
userSchema.pre("save", async function() {
    if (!this.isModified("password")) return;
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User", userSchema)

export default User;