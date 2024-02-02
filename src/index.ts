import { server } from './server/Server';
import { Knex } from './server/database/knex';


const startServer = () => {
    server.listen(process.env.API_PORT || 3333, () => {
        console.log(`API rodando na porta ${process.env.API_PORT || 3333}`);
    });
};


if (process.env.IS_LOCALHOST !== 'true') {
    console.log('Running migrations!');

    Knex.migrate.latest()
        .then(() => {
            startServer();
        })
        .catch(console.log);
} else {
    startServer();
}