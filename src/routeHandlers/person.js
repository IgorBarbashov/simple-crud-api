const { db } = require('../db');
const { isIdInUuidFormat } = require('../validation');
const { PersonIdNotInUuidFormatError, PersonNotFoundError } = require('../errors');
const { ENTITIES } = require('../constants');

const personDb = db[ENTITIES.PERSON].data;

const getAllPersons = async () => {
    return await new Promise(resolve => { // aka async request to DB
        setTimeout(() => {
            resolve(personDb);
        }, 300);
    });
};

const getPersonById = async (id) => {
    const isIdMatchUuid = isIdInUuidFormat(id);
    if (!isIdMatchUuid) {
        throw new PersonIdNotInUuidFormatError();
    }
    const person = await new Promise(resolve => { // aka async request to DB
        setTimeout(() => {
            resolve(personDb.find(el => el.id === id));
        }, 300);
    });
    if (!person) {
        throw new PersonNotFoundError(id);
    }
    return person;
};

const createPerson = () => {};
const updatePerson = () => {};
const deletePerson = () => {};

module.exports = {
    getAllPersons,
    getPersonById,
    updatePerson,
    createPerson,
    deletePerson
};
