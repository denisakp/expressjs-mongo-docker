import {ObjectId} from "mongodb";

//project imports
import MyDatabase from "../../configurations/database.config.mjs"

const collection = await MyDatabase.getCollection();

export async function insertOne(payload) {
    return await collection.insertOne(payload);
}

export async function find({limit, page}) {
    const skip = (page - 1) * limit;
    return await collection.find().skip(skip).limit(limit).toArray()
}

export async function findOne(id) {
    return await collection.findOne({_id: new ObjectId(id)});
}

export async function updateOne(id, payload) {
    return await collection.updateOne({_id: new ObjectId(id)}, {$set: {...payload}});
}

export async function deleteOne(id) {
    return await collection.deleteOne({_id: new ObjectId(id)});
}
