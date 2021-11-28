var supertest = require('supertest');
const request = supertest('http://localhost:4000');

describe('Scenario - 1', () => {
    let createdId = null;

    it('GET should receive empty array if first request', async () => {
        const expectedResponse = [];
        await request.get('/person')
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(expectedResponse);
            });
    });

    it('POST should create new object', async () => {
        const expectedResponse = {
            name: 'Igor3',
            age: 42,
            hobbies: 'development'
        };
        await request.post('/person')
            .send(expectedResponse)
            .expect(201)
            .then((response) => {
                createdId = response.body.id;
                const responseWithoutId =  { ...response.body };
                delete responseWithoutId.id;
                expect(response.body).toBeDefined();
                expect(responseWithoutId).toEqual(expectedResponse);
            });
    });

    it('GET by ID should received exists object', async () => {
        const expectedResponse = {
            name: 'Igor3',
            age: 42,
            hobbies: 'development',
            id: createdId
        };
        await request.get(`/person/${createdId}`)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(expectedResponse);
            });
    });

    it('PUT should update object', async () => {
        const expectedObject = {
            name: 'Marina',
            age: 22,
            hobbies: 'diving'
        };
        await request.put(`/person/${createdId}`)
            .send(expectedObject)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual({ ...expectedObject, id: createdId });
            });
    });
});
