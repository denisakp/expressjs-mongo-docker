import { ObjectId } from "mongodb";

// project imports
import MyDatabase from "../configurations/database.config.mjs"

const collection = await MyDatabase.getCollection();

export async function create(payload) {
    const document = await collection.insertOne(payload);

    if(!document)
        return

    return {_id: document.insertedId, ...payload }
}

export async function find({ limit=25, page=1 }) {
    const skip = (page -1) * limit;

    return await collection.find({}).limit(limit).skip(skip).toArray();
}

export async function findOne(id) {
    const document = await collection.findOne({ _id: new ObjectId(id) });

    if (!document)
        return;

    return document;
}

export async function updateOne(id, payload) {
    const document = await findOne(id);

    if (!document)
       return ;

    try {
        const updated = await collection.updateOne({ _id: document._id }, {$set: {...payload}});

        return (updated.acknowledged === true && updated.matchedCount === 1) ? findOne(id) : undefined
    }catch (error) {
        throw new Error(error)
    }
}

export async function deleteOne(id) {
    const document = await findOne(id);

    if (!document)
        return;

    return await collection.deleteOne({ _id: document._id });
}