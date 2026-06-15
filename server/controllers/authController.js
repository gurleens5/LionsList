import User from "../models/User.js"
import { generateToken } from "../utils/generateToken.js"
import { sendVerificationEmail } from "../lib/mailer.js"

export async function register (req, res)  {
    const username = String(req.body?.username || '').trim();
    const email = String(req.body?.email || '').trim().toLowerCase();
    const password = String(req.body?.password || '').trim();

    try {
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Please fill all required fields"
            });
        }

        const emailExists = await User.findOne({email});
        if (emailExists) {
            return res.status(400).json({
                message: "Email in use"
            })
        }
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const user = await User.create({ username, email, password, verificationCode: code });
        await sendVerificationEmail(email, code);
        res.status(201).json({ message: "Verification code sent", userId: user._id });

    } catch (err) {
        console.error(err);
        if (err.name === "ValidationError") {
            const messages = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({ message: messages.join(", ") });
        }
        res.status(500).json({
            message: "Server error"
        })
    }
}

export async function verify(req, res) {
    const { userId, code } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        if (user.verificationCode !== code) return res.status(400).json({ message: "Invalid code" });
        user.isVerified = true;
        user.verificationCode = undefined;
        await user.save();
        const token = generateToken(user._id);
        res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
            token,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

export async function login (req, res) {
    const email = String(req.body?.email || '').trim().toLowerCase();
    const password = String(req.body?.password || '').trim();

    try {
        if (!email || !password) {
            return res.status(400).json({
                message: "Please type your email or password"
            });
        }

        const user = await User.findOne({email});

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({
                message: "Invalid Email or Password"
            });
        }
        
        if (!user.isVerified) {
            return res.status(403).json({ message: "Please verify your email first" });
        }

        const token = generateToken(user._id);
        res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
            token,    
        });

    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
}

export async function currentUser (req, res) {
    res.status(200).json(req.user);
}
