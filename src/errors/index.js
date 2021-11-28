class CustomErrors extends Error {
    constructor(message) {
        super(message);
        this.message = `REST API error: ${message ? message : 'unknown'}`;
    }
}

class PersonIdNotInUuidFormatError extends CustomErrors {
    constructor() {
        super('person id doesn\'t match uuid format');
        this.name = 'IdNotInUuidFormatError';
    }
}

class PersonNotFoundError extends CustomErrors {
    constructor(id) {
        super(`person with id: ${id} not found`);
        this.name = 'PersonNotFoundError';
    }
}

module.exports = {
    PersonIdNotInUuidFormatError,
    PersonNotFoundError
};
