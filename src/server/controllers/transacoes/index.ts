import * as create from './Create';
import * as getAll from './GetAll';
import * as getAllYears from './GetDates';
import * as getById from './GetById';
import * as updateById from './UpdateById';
import * as deleteById from './DeleteById';


export const TransacoesController = {
    ...create,
    ...getAll,
    ...getAllYears,
    ...getById,
    ...updateById,
    ...deleteById,
};