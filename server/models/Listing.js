import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0.01,
    },
    status: {
      type: String,
      default: "Available",
      trim: true,
    },
    // US-07-4: reference seller so username can be shown on details page
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    }
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;