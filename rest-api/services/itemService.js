const Item = require('../models/Item');


async function getAll() {
    return Item.find({});
}

async function getByUserId(userId) {
    return Item.find({ userId: userId });
}

async function getById(id) {
    return Item.findById(id);
}

async function create(item) {
    return Item.create(item);
}

async function update(id, item) {
    const existing = await Item.findById(id);

    existing.name = item.make;
    existing.description = item.description;
    existing.price = item.price;
    existing.img = item.img;

    return existing.save();
}

async function deleteById(id) {
    return Item.findByIdAndDelete(id);
}


module.exports = {
    getAll,
    getByUserId,
    getById,
    create,
    update,
    deleteById
};