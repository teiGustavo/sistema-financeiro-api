import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';


interface IDate {
    ano: string;
    meses: Array<Object>;
}


export const getDates = async (page: number, limit: number, filter: string): Promise<IDate[] | Error> => {
    try {
        const resultYears = await Knex(ETableNames.transacoes)
            .select(Knex.raw('DATE_FORMAT(data, "%Y") AS "data"'))
            .distinct()
            .where('data', 'like', `%${filter}%`)
            .offset((page - 1) * limit)
            .limit(limit)
            .orderBy('data');

        const years = resultYears.map((year) => year.data);

        const dates = await Knex(ETableNames.transacoes)
            .select(Knex.raw('DATE_FORMAT(data, "%Y-%M") as data'))
            .distinct()
            .offset((page - 1) * limit)
            .limit(limit);

        const result = years.map((year) => {
            const thisDates = dates.filter((date) => date.data.split('-').at(0) === year);

            return {
                ano: year,
                meses: thisDates.map((date) => {
                    const month = date.data.split('-').at(1);

                    if (!month) {
                        return {
                            mes: 'Mês não encontrado!'
                        };
                    }

                    const translateMonth = (month: string) => {
                        switch (month.toUpperCase()) {
                            case 'JANUARY': 
                                return 'Janeiro';

                            case 'FEBRUARY': 
                                return 'Fevereiro';

                            case 'MARCH': 
                                return 'Março';

                            case 'APRIL': 
                                return 'Abril';

                            case 'MAY': 
                                return 'Maio';

                            case 'JULY': 
                                return 'Julho';

                            case 'AUGUST': 
                                return 'Agosto';

                            case 'SEPTEMBER': 
                                return 'Setembro';

                            case 'OCTOBER': 
                                return 'Outubro';

                            case 'NOVEMBER': 
                                return 'Novembro';

                            case 'DECEMBER': 
                                return 'Dezembro';

                            default:
                                return month;
                        }
                    };

                    return {
                        mes: translateMonth(month)
                    };
                })
            };
        });

        return result;
    } catch (error) {
        console.log(error);
        
        return new Error('Erro ao consultar os registros!');
    }
};