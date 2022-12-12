const recentController = require('express').Router();
const { getAllRecent, getRecentById } = require('../services/recentService');
const { parseError } = require('../util/parser');
const { getByUserId } = require('../services/itemService')


recentController.get('/', async (req, res) => {
    let recent = [];
    if (req.query.where) {
        const userId = JSON.parse(req.query.where.split('=')[1]);
        recent = await getByUserId(userId);
    } else {
        recent = await getAllRecent();
    }
    res.json(recent);
});


recentController.get('/', async (req, res) => {
    let recent = [];
    if (req.query.where) {
        const userId = JSON.parse(req.query.where.split('=')[1]);
        recent = await getByUserId(userId);
    } else {
        recent = await getAllRecent();
    }
    res.json(recent);
});

recentController.get('/:id', async (req, res, next) => {
    const recent = await getRecentById(req.params.id);
    res.json(recent);
});

module.exports = recentController;