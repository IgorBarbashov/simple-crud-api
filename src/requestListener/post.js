const { NotAllRequiredFieldsExists } = require('../errors');
const {
    sendUnsupportedRouteResponse, sendCreatedWithJsonResponse,
    sendNotAllRequiredFieldsExistsResponse
} = require('./_helpers');
const { createPerson } = require('../routeHandlers');
const { ROUTES } = require('../constants');
const { getBody } = require('../utils');

const postMethodHandle = async (request, response) => {
    const { url } = request;
    const [, entity, rest] = url.split('/');

    if (rest !== undefined) {
        sendUnsupportedRouteResponse(response, url);
        return;
    }

    /* eslint-disable indent*/
    switch (entity) {
        case ROUTES.PERSON:
            try {
                const body = await getBody(request);
                const createdBody = await createPerson(body);
                sendCreatedWithJsonResponse(response, createdBody);

            } catch(err) {
                if (err instanceof NotAllRequiredFieldsExists) {
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
    postMethodHandle
};
