import mongoose from "mongoose";

const offerSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: true,
            min: 0.01,
        },
        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }, 
        listing: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Listing",
            required: true,
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            default: "Pending",
            trim: true,
        },
    },
    { timestamps: true }
);

const Offer = mongoose.model("Offer", offerSchema);

export default Offer;
