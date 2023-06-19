export default class GameEntity{

    partida_id: number;
    campeonato:{
        campeonato_id: number,
        campeonato_nome: string,
    }; 
    placar: string;
    time_mandante:{
        time_id:number;
        nome_popular: string;
        sigla: string;
        escudo: string;
    };
    time_visitante:{
        time_id:number;
        nome_popular: string;
        sigla: string;
        escudo: string;
    };
    placar_mandante: number;
    placar_visitante: number;

}
