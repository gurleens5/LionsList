import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
    {
        title: {
            type:String,
            required: true
        },
        content:{
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const testObject = mongoose.model("testObject", testSchema)

export default testObject;