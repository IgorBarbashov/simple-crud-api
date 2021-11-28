const { validate } = require('uuid');

const isIdInUuidFormat = (id) => validate(String(id));

module.exports = {
    isIdInUuidFormat
};
