const fs = require('fs');

module.exports = fs.readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' });