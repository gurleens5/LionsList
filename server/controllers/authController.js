import User from "../models/User.js"
import { generateToken } from "../utils/generateToken.js"

export async function register (req, res)  {
    const username = req.body.username?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password?.trim();

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

        const userExists = await User.findOne({username});
        if (userExists) {
            return res.status(400).json({
                message: "Username in use"
            })
        }

        const user = await User.create({username, email, password});
        const token = generateToken(user._id);
        res.status(201).json({
            id: user._id,
            usename: user.username,
            email: user.email,
            token,
        })

    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
}

export async function login (req, res) {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password?.trim();

    try {
        if (!email || !password) {
            return res.status(400).json({
                message: "Please type your email or password"
            });
        }

        const user = await User.findOne({email});

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({
                message: "Invalid Email or Password"
            });
        }

        const token = generateToken(user._id);
        res.status(200).json({
            id: user._id,
            usename: user.username,
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
