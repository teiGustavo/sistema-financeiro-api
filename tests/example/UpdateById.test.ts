import { testServer, BASE_ENDPOINT } from '../jest.setup';
import { StatusCodes } from 'http-status-codes';


describe('Example - UpdateById', () => {
    it('Atualiza registro', async () => {
        const res1 = await testServer
            .post(BASE_ENDPOINT + '/example')
            .send({
                name: 'Alberto Sousa'
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer
            .put(BASE_ENDPOINT + `/example/${res1.body}`)
            .send({
                name: 'Alberto'
            });

        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it('Tenta atualizar registro inexistente', async () => {
        const res1 = await testServer
            .put(BASE_ENDPOINT + '/example/99999')
            .send({
                name: 'Alberto'
            });

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
});