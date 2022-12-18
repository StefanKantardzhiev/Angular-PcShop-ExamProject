const Item = require("../models/Item")
const User = require("../models/User")

require('dotenv').config()

async function addBuild(item, id) {
    try {
        item.owner = id;
        return await Item.create({ ...item })
    } catch (error) {
        throw new Error(error)
    }
}
async function getAllBuildz() {
    return await Item.find({}).sort({ created_at: -1 });
}

async function getItemById(id) {
    return await Item.findById(id);
}

async function updateItem(id, item) {
    const existing = await Item.findById(id);

    existing.title = item.title;
    existing.description = item.description;
    existing.price = item.price;

    return existing.save();
}

async function deleteItem(id) {
    await Item.findByIdAndDelete(id)
}

async function getRecent() {
    const Items = await Item.find({}).sort({ created_at: -1 }).limit(3);
    return Items
}

async function getByOwner(id) {
    return await Item.find({ _ownerId: id })
}


module.exports = {
    addBuild,
    getAllBuildz,
    getItemById,
    updateItem,
    deleteItem,
    getRecent,
    getByOwner
}
