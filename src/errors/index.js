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

class NotAllRequiredFieldsExists extends CustomErrors {
    constructor() {
        super('Not all required fields exists');
        this.name = 'NotAllRequiredFieldsExists';
    }
}

module.exports = {
    PersonIdNotInUuidFormatError,
    PersonNotFoundError,
    NotAllRequiredFieldsExists
};
