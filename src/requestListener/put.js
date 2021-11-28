const {
    NotAllRequiredFieldsExists, PersonNotFoundError,
    PersonIdNotInUuidFormatError
} = require('../errors');
const {
    sendPersonIdNotInUuidFormatResponse, sendNotFoundResponse,
    sendUnsupportedRouteResponse, sendOkWithJsonResponse,
    sendNotAllRequiredFieldsExistsResponse
} = require('./_helpers');
const { updatePerson } = require('../routeHandlers');
const { ROUTES } = require('../constants');
const { getBody } = require('../utils');

const putMethodHandle = async (request, response) => {
    const { url } = request;
    const [, entity, id, rest] = url.split('/');

    if (rest !== undefined) {
        sendUnsupportedRouteResponse(response, url);
        return;
    }

    /* eslint-disable indent*/
    switch (entity) {
        case ROUTES.PERSON:
            try {
                const body = await getBody(request);
                const updatedBody = await updatePerson(id, body);
                sendOkWithJsonResponse(response, updatedBody);
            } catch(err) {
                if (err instanceof PersonIdNotInUuidFormatError) {
                    sendPersonIdNotInUuidFormatResponse(response, id);
                } else if (err instanceof PersonNotFoundError) {
                    sendNotFoundResponse(response, id);
                } else if (err instanceof NotAllRequiredFieldsExists) {
                    sendNotAllRequiredFieldsExistsResponse(response);
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
    putMethodHandle
};
