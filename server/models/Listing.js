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
      enum: ["Textbooks", "Notes", "Lab Kit", "Stationery", "Study Guide"],
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
      enum: ["Available", "Sold"],
    },
    courseCode: {
      type: String,
      required: false,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: false,
      trim: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;