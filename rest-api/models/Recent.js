const { Schema, model, Types: { ObjectId } } = require('mongoose');


const recentSchema = new Schema({
    title: { type: String, required: true, minlength: [5, 'Name must be at least 5 characters long'] },
    description: { type: String, required: true, minlength: [10, 'Description must be at least 10 characters long'] },
    price: { type: Number, required: true, min: [10, 'Price must be at least 10 Euro!'] },
    img: { type: String, required: [true, 'Image URL is required'] },
    created_at: { type: String },
    updatedAt: { type: String },
    __v: 0
});

const Recent = model('Recent', recentSchema);

module.exports = Recent;