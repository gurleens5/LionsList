import testObject from "../models/testData.js"

export async function getTestObjects (req, res) {
    try{
        const testobject = await testObject.find()
        res.status(200).json(testobject)

    } catch (error){
        console.error("Error in getTestObjects controller", error)
        res.status(500).json({message:"Internal Server Error"})
    }
};

export async function createTestObject (req, res) {
    try{
        const {title,content} = req.body
        const newTestObject = new testObject({title, content})

        await newTestObject.save()
        res.status(201).json({ message: "Test Object Created"})

    } catch (error){
        console.error("Error in createTestObject controller", error)
        res.status(500).json({message:"Internal Server Error"})
    }
};