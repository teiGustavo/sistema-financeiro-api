import { testServer, BASE_ENDPOINT } from '../jest.setup';
import { StatusCodes } from 'http-status-codes';


describe('Example - DeleteById', () => {
    it('Apaga registro', async () => {
        const res1 = await testServer
            .post(BASE_ENDPOINT + '/example')
            .send({
                name: 'Teste Para Exclusão'
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        
        const resApagada = await testServer
            .delete(BASE_ENDPOINT + `/example/${res1.body}`)
            .send();

        expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it('Tenta apagar registro inexistente', async () => {
        const res1 = await testServer
            .delete(BASE_ENDPOINT + '/example/99999')
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
});