export interface ITransacao {
    id: number;
    data: string;
    valor: number;
    descricao?: string;
    tipo?: string;
    status?: string;
    documento_id: number;
    empresa_pagadora_id: number;
    empresa_recebedora_id: number;
}