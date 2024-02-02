import { testServer, BASE_ENDPOINT } from '../jest.setup';
import { StatusCodes } from 'http-status-codes';


describe('Example - Create', () => {
    it('Cria registro', async () => {
        const res1 = await testServer
            .post(BASE_ENDPOINT + '/example')
            .send({
                name: 'Alberto Sousa'
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');
    });

    it('Tenta criar registro com nome muito curto', async () => {
        const res1 = await testServer
            .post(BASE_ENDPOINT + '/example')
            .send({
                name: 'Al'
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.name');
    });

    it('Tenta criar registro com nome muito longo', async () => {
        const res1 = await testServer
            .post(BASE_ENDPOINT + '/example')
            .send({
                name: 'Alaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.name');
    });
});