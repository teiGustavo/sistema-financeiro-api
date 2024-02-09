import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';


interface IDate {
    ano: string;
    meses: Array<{mes: string}>;
}


export const getDates = async (page: number, limit: number, filter: string): Promise<IDate[] | Error> => {
    try {
        const resultYears = await Knex(ETableNames.transacoes)
            .select(Knex.raw('DATE_FORMAT(data, "%Y") AS "data"'))
            .distinct()
            .where('data', 'like', `%${filter}%`)
            .orderBy('data');

        const years = resultYears.map((year) => year.data);

        const dates = await Knex(ETableNames.transacoes)
            .select(Knex.raw('DATE_FORMAT(data, "%Y-%m") AS data'))
            .distinct()
            .orderBy('data');

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

                    const convertMonth = (month: string) => {
                        switch (month) {
                            case '01': 
                                return 'Janeiro';

                            case '02': 
                                return 'Fevereiro';

                            case '03': 
                                return 'Março';

                            case '04': 
                                return 'Abril';

                            case '05': 
                                return 'Maio';

                            case '06': 
                                return 'Julho';

                            case '07': 
                                return 'Julho';

                            case '08': 
                                return 'Agosto';

                            case '09': 
                                return 'Setembro';

                            case '10': 
                                return 'Outubro';

                            case '11': 
                                return 'Novembro';

                            case '12': 
                                return 'Dezembro';

                            default:
                                return month;
                        }
                    };

                    return {
                        mes: month,
                        nome: convertMonth(month)
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