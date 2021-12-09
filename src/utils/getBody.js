const getBody = (request) => {
    return new Promise(resolve => {
        const body = [];
        request.on('data', chunk => {
            body.push(chunk);
        });
        request.on('end', () => {
            const receivedBody = Buffer.concat(body).toString();
            const parsedBody = JSON.parse(receivedBody);
            resolve(parsedBody);
        });
    });
};

module.exports = {
    getBody
};
