import Listing from "../models/Listing.js";
import { protect } from "../middleware/auth.js";
import Offer from "../models/Offer.js";

export const updateListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Ensure only the seller can edit, restricts editing to listing owner
    if (listing.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to edit this listing" });
    }

    const { title, description, category, courseCode, imageUrl, price, status } = req.body;

    if (title !== undefined) listing.title = title;
    if (description !== undefined) listing.description = description;
    if (category !== undefined) listing.category = category;
    if (courseCode !== undefined) listing.courseCode = courseCode;
    if (imageUrl !== undefined) listing.imageUrl = imageUrl;
    if (price !== undefined) listing.price = price;
    if (status !== undefined) listing.status = status;

    const updatedListing = await listing.save();

    res.json(updatedListing);

  } catch (error) {
    console.error(error);

    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid listing ID" });
    }

    res.status(500).json({ message: "Failed to update listing" });
  }
}

export const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Ensure only the seller can delete, restricts deletion to listing owner
    if (listing.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this listing" });
    }

    await Offer.updateMany(
        { listing: listing._id, status: "Pending" },
        { $set: { status: "Rejected" }}
    );

    // Deletes listing from DB.
    // Listing deletion automatically removes it from browse and "My Listings"
    await listing.deleteOne();

    res.json({ message: "Listing deleted successfully" });

  } catch (error) {
    console.error(error);

    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid listing ID" });
    }

    res.status(500).json({ message: "Failed to delete listing" });
  }
}