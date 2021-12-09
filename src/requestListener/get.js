const { PersonIdNotInUuidFormatError, PersonNotFoundError } = require('../errors');
const {
    sendUnsupportedRouteResponse, sendOkWithJsonResponse,
    sendPersonIdNotInUuidFormatResponse, sendNotFoundResponse
} = require('./_helpers');
const { getAllPersons, getPersonById } = require('../routeHandlers');
const { ROUTES } = require('../constants');

const getMethodHandle = async (request, response) => {
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
                const body = await (id === undefined ? getAllPersons() : getPersonById(id));
                sendOkWithJsonResponse(response, body);
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
    getMethodHandle
};
