import Vue from 'vue'
import { PingServiceBase } from "../..";
import PingModule, { PingStore } from '../../../store/modules/ping';
import store from '../../../store';

export class Player extends PingServiceBase{

    constructor(vue:Vue){
        super(vue)

    }

    public get store():PingStore{
        return PingModule
    }
    public getClub(numero:string){
        console.log("PlayerService:getClub:",numero)
       // return this.self.vue.$http.get(this.apiUrl("club",numero))
        return this.query('Club',numero)
    }
    public getPlayer(licence:string){
      //  console.log(this.application.API.EndPoint+ this.application.API.Joueur.replace('{licence}',licence))
        //return this.vue.$http.get(this.application.API.EndPoint+ this.application.API.Joueur.replace('{licence}',licence))
        console.log("PlayerService:getPlayer:",licence)
        return this.query('Joueur',licence)
    }

    public getPlayers(numeroClub:string){
        var res= this.query('JoueursDuClub',numeroClub);// this.vue.$http.get(this.application.API.EndPoint+this.application.API.JoueursDuClub.replace('{numero}',numeroClub))
        return res
    }

    public getParties(licence:string){
        return this.query('PartiesDuJoueur',licence)
    }

    public searchPlayerByNom(nom:string,prenom?:string){
        //let api = this.apiUrl('ListeByNom',nom,prenom)
        //console.log(api)
        //return api
        return this.query('ListeJoueursByNom',nom,prenom)
    }
    
    public getHistorique(licence:string){
        return this.query('HistoriquesDuJoueur',licence)
    }

    
}

//export default auth

export default function PlayerService(Vuee: typeof Vue){
    const player=new Player(new Vuee())
    
    Vue.prototype.$player = player;

    
} 