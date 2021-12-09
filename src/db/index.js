const { ENTITIES } = require('../constants');
const { person } = require('./person');

const db = {
    [ENTITIES.PERSON]: person
};

module.exports = {
    db
};
