const { Schema, model, Types: { ObjectId } } = require('mongoose');


const itemSchema = new Schema({
    name: { type: String, required: true, minlength: [5, 'Name must be at least 5 characters long'] },
    description: { type: String, required: true, minlength: [10, 'Description must be at least 10 characters long'] },
    price: { type: Number, required: true, min: [10, 'Price must be at least 10 Euro!'] },
    img: { type: String, required: [true, 'Image URL is required'] },
    _ownerId: { type: ObjectId, ref: 'User', required: true }
});

const Item = model('Item', itemSchema);

module.exports = Item;