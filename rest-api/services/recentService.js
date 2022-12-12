const Recent = require('../models/Recent');


async function getAllRecent() {
    return Recent.find({});
}

async function getRecentById(id) {
    return Recent.findById(id);
}

module.exports = {
   getAllRecent,
   getRecentById
};