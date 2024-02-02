import { IExample } from '../../models';

declare module 'knex/types/tables' {
    interface Tables {
        example: IExample
    }
}