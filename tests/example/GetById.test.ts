import { testServer, BASE_ENDPOINT } from '../jest.setup';
import { StatusCodes } from 'http-status-codes';


describe('Example - GetById', () => {
    it('Busca registro por id', async () => {
        const res1 = await testServer
            .post(BASE_ENDPOINT + '/example')
            .send({
                name: 'Alberto Sousa'
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
            
        const resBuscada = await testServer
            .get(BASE_ENDPOINT + `/example/${res1.body}`)
            .send();

        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body).toHaveProperty('name');
    });

    it('Tenta buscar registro que não existe', async () => {
        const res1 = await testServer
            .get(BASE_ENDPOINT + '/example/99999')
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
});