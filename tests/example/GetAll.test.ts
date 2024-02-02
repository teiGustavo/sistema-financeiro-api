import { testServer, BASE_ENDPOINT } from '../jest.setup';
import { StatusCodes } from 'http-status-codes';


describe('Example - GetAll', () => {
    it('Buscar todos os registros', async () => {
        const res1 = await testServer
            .post(BASE_ENDPOINT + '/example')
            .send({
                name: 'Alberto Sousa'
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        
        const resBuscada = await testServer
            .get(BASE_ENDPOINT + '/example')
            .send();

        expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body.length).toBeGreaterThanOrEqual(1);
    });
});