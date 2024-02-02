export interface ITransacao {
    id: number;
    data: string;
    valor: number;
    descricao?: string;
    documento_id: number;
    empresa_pagadora_id: number;
    empresa_recebedora_id: number;
}