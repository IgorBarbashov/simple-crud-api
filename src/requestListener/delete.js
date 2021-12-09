const { PersonIdNotInUuidFormatError, PersonNotFoundError } = require('../errors');
const {
    sendUnsupportedRouteResponse, sendDeletedResponse,
    sendPersonIdNotInUuidFormatResponse, sendNotFoundResponse
} = require('./_helpers');
const { deletePerson } = require('../routeHandlers');
const { ROUTES } = require('../constants');

const deleteMethodHandle = async (request, response) => {
    const { url } = request;
    const [, entity, id, rest] = url.split('/');

    if (rest !== undefined || (id === '' && rest === undefined)) {
        sendUnsupportedRouteResponse(response, url);
        return;
    }

    /* eslint-disable indent*/
    switch (entity) {
        case ROUTES.PERSON:
            try {
                await deletePerson(id);
                sendDeletedResponse(response);
            } catch(err) {
                if (err instanceof PersonIdNotInUuidFormatError) {
                    sendPersonIdNotInUuidFormatResponse(response, id);
                } else if (err instanceof PersonNotFoundError) {
                    sendNotFoundResponse(response, id);
                }
            }
            break;
        default:
            sendUnsupportedRouteResponse(response, url);
            break;
    }
    /* eslint-enable indent*/
};

module.exports = {
    deleteMethodHandle
};
