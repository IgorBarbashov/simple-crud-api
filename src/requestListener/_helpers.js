const { MESSAGES, HTTP_HEADERS } = require('../constants');

const sendUnsupportedRouteResponse = (response, url = '') => {
    response.statusCode = 404;
    response.write(`${MESSAGES.HTTP_UNSUPPORTED_ROUTE}${url ? `: ${url}` : ''}`);
    response.end();
};

const sendOkWithJsonResponse = (response, body) => {
    response.statusCode = 200;
    response.setHeader(HTTP_HEADERS.CONTENT_TYPE.KEY, HTTP_HEADERS.CONTENT_TYPE.VALUE.JSON);
    response.write(JSON.stringify(body));
    response.end();
};

const sendPersonIdNotInUuidFormatResponse = (response, id) => {
    response.statusCode = 400;
    response.write(`${MESSAGES.ID_NOT_IN_UUID_FORMAT}: ${id}`);
    response.end();
};

const sendNotFoundResponse = (response, id) => {
    response.statusCode = 404;
    response.write(`${MESSAGES.ID_NOT_FOUND}: ${id}`);
    response.end();
};


const sendNotAllRequiredFieldsExistsResponse = (response) => {
    response.statusCode = 400;
    response.write(MESSAGES.NOT_REQUIRED_FIELD_EXISTS);
    response.end();
};


const sendCreatedWithJsonResponse = (response, body) => {
    response.statusCode = 201;
    response.setHeader(HTTP_HEADERS.CONTENT_TYPE.KEY, HTTP_HEADERS.CONTENT_TYPE.VALUE.JSON);
    response.write(JSON.stringify(body));
    response.end();
};

module.exports = {
    sendUnsupportedRouteResponse,
    sendOkWithJsonResponse,
    sendPersonIdNotInUuidFormatResponse,
    sendNotFoundResponse,
    sendNotAllRequiredFieldsExistsResponse,
    sendCreatedWithJsonResponse
};
