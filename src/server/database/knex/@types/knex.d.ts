import { IEmpresa, IDocumento, ITransacao } from '../../models';

declare module 'knex/types/tables' {
    interface Tables {
        empresas: IEmpresa,
        documentos: IDocumento,
        transacoes: ITransacao
    }
}