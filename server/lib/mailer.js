import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email, code) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from: `"LionsList" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Verify your LionsList account",
        text: `Your verification code is: ${code}`
    });
};