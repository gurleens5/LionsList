import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
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
    },
    { timestamps: true }
);

// Hashing Password
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User", userSchema)

export default User;