export interface Studente{
    id: number;
    immagineProfilo:File;
    nome:string;
    cognome:string;
    email:string;
    titoloDiStudio:string;
    dataDiNascita:Date;
    numeroTelefonico: number;
    dataInizioCorso:Date;
    dataFineCorso:Date;
    progetto:string;
    note:string;
    cv:File;
}