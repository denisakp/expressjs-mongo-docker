// project imports
import {deleteOne, find, findOne, insertOne, updateOne} from "./blog.repository.mjs";

export async function save(payload) {
    const document = await insertOne(payload);

    if (!document)
        return

    return {_id: document.insertedId, ...payload}
}

export async function getAll({limit = 25, page = 1}) {

    return await find({limit, page});
}

export async function getOne(id) {
    const document = await findOne(id);

    if (!document)
        return;

    return document;
}

export async function update(id, payload) {
    const document = await getOne(id);

    if (!document)
        return;

    try {
        const updated = await updateOne(id, payload);

        return (updated.acknowledged === true && updated.matchedCount === 1) ? getOne(id) : undefined
    } catch (error) {
        throw new Error(error)
    }
}

export async function remove(id) {
    const document = await getOne(id);

    if (!document)
        return;

    return await deleteOne(id);
}