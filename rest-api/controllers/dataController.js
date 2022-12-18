const User = require('../models/User');

const { getRecent, getItemById, updateItem, deleteItem, getAllBuildz, getByOwner, addBuild } = require('../services/itemService');
const { updateUserItems } = require('../services/userService');

const dataController = require('express').Router();


//create Item
dataController.post('/create', async (req, res) => {
    const data = req.body;
    try {
        const userId = req?.user?._id;
        const item = await addBuild(data, userId)
        await updateUserItems(userId, item._id)
        res.status(201).json(item)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
})

//get All Items
dataController.get('/', async (req, res) => {
    const items = await getAllBuildz()
    res.status(200).json(items)
});


//get most recent items
dataController.get('/recent-buildz', async (req, res) => {
    const items = await getRecent()
    res.status(200).json(items);
})

//get item by ID
dataController.get('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const item = await getItemById(id);
        if (item) {
            res.status(200).json(item)
        } else {
            throw new Error('Invalid item ID!')
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
});

//update Item by ID
dataController.put('/edit/:id', async (req, res) => {
    try {
        const item = await getItemById(req.params.id);

        if (req.user._id != item._ownerId) {
            return res.status(403).json({ message: 'You cannot edit this item' })
        }
        const result = await updateItem(req.params.id, req.body);
        res.status(200).json(result)
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message })
    }
});



// delete item
dataController.delete('/:id', async (req, res) => {
    try {
        const bike = await getItemById(req.params.id);
        if (req.user._id != bike._ownerId._id) {
            return res.status(403).json({ err: err.message })
        }
        await deleteItem(req.params.id);
        res.status(204).end()
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
});










module.exports = dataController;
