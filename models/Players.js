const Sequelize = require('sequelize');
const db = require('../config/database');

const Player = db.define('players', {
    data: {
        type: Sequelize.JSONB
    }
}, {timestamps: true});



module.exports = Player;