import mongoose from "mongoose";


export const validateMongoDbId = (id) => {
    // Handle both string and ObjectId types
    const idString = id.toString ? id.toString() : id;
    
    if (!idString) {
        throw new Error("No ID provided");
    }

    const isValid = mongoose.Types.ObjectId.isValid(idString);
    if (!isValid) {
        throw new Error(`Invalid MongoDB ID: ${idString}`);
    }
}