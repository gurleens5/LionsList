import mongoose from "mongoose";

const message = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        listing: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Listing",
            required: true
        },
        msgContent: {
            type: String,
            required: true,
            trim: true,
            maxlength: 1000
        },
        read: {
            type: Boolean,
            default: false
        }
    },
    {timestamps: true}
);

export default mongoose.model("Message", messageSchema);