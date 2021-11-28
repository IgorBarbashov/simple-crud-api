const { v4: uuidv4 } = require('uuid');
const { db } = require('../db');
const { isIdInUuidFormat, isAllRequiredFieldsExists } = require('../validation');
const {
    PersonIdNotInUuidFormatError, PersonNotFoundError,
    NotAllRequiredFieldsExists
} = require('../errors');
const { ENTITIES } = require('../constants');

let { data, model } = db[ENTITIES.PERSON];

const getAllPersons = async () => {
    return await new Promise(resolve => { // aka async request to DB
        setTimeout(() => {
            resolve(data);
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
            resolve(data.find(el => el.id === id));
        }, 300);
    });
    if (!person) {
        throw new PersonNotFoundError(id);
    }
    return person;
};

const createPerson = async (body) => {
    const isRequiredFieldsExists = isAllRequiredFieldsExists(body, model);
    if (!isRequiredFieldsExists) {
        throw new NotAllRequiredFieldsExists();
    }
    return await new Promise(resolve => { // aka async request to DB
        setTimeout(() => {
            const id = uuidv4();
            const savedBody = { ...body, id };
            console.log(data);
            data.push(savedBody);
            console.log(data);
            resolve(savedBody);
        }, 300);
    });
};

const updatePerson = async () => {};

const deletePerson = async (id) => {
    const isIdMatchUuid = isIdInUuidFormat(id);
    if (!isIdMatchUuid) {
        throw new PersonIdNotInUuidFormatError();
    }
    const entitiesWithoutDeleted = await new Promise(resolve => { // aka async request to DB
        setTimeout(() => {
            resolve(data.filter(el => el.id !== id));
        }, 300);
    });
    if (entitiesWithoutDeleted.length === data.length) {
        throw new PersonNotFoundError(id);
    }
    data = entitiesWithoutDeleted;
    return entitiesWithoutDeleted;
};

module.exports = {
    getAllPersons,
    getPersonById,
    updatePerson,
    createPerson,
    deletePerson
};
