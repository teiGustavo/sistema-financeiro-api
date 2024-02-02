import { Knex } from 'knex';
import path from 'path';


export const development: Knex.Config = {
    client: 'mysql2',
    connection: {
        host : 'localhost',
        port : 3306,
        user : 'root',
        password : 'root',
        database : 'sistema_financeiro'
    },
    migrations: {
        directory: path.resolve(__dirname, '..', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, '..', 'seeds')
    },
    pool: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        afterCreate: (connection: any, done: Function) => {
            connection.query('SET time_zone=`-3:00`');
            done();
        }
    }
};

export const test: Knex.Config = {
    client: 'mysql2',
    migrations: {
        directory: path.resolve(__dirname, '..', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, '..', 'seeds')
    },
    connection: {
        host : 'localhost',
        port : 3306,
        user : 'root',
        password : 'root',
        database : 'tests'
    }
};

export const production: Knex.Config = {
    client: 'mysql2',
    migrations: {
        directory: path.resolve(__dirname, '..', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, '..', 'seeds')
    },
    connection: {
        host : process.env.DB_HOSTNAME,
        port : Number(process.env.DB_PORT || 3306),
        user : process.env.DB_USERNAME,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_DATABASE,
        ssl: { rejectUnauthorized: false }
    }
};