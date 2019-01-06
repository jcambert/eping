
import { Module, VuexModule,Mutation,Action,getModule} from 'vuex-module-decorators'
import store from '..'

export interface IPingState {
    player:any
    club:any
    categorieAge:{}
    parties:any
  }


@Module({ dynamic: true, name:'ping',store:store})
export class PingStore extends VuexModule implements IPingState{

    player:any={}
    club:any={}
    parties:any=[]
    historique:any=[]
    categorieAge= {
        'N': { value: 'Non determiné' },
        'P': { value: 'Poussin', desc: 'jeunes ayant 8 ans au plus' },
        'B1': { value: 'Benjamin 1', desc: 'jeunes agés de 8 à 9 ans' },
        'B2': { value: 'Benjamin 2', desc: 'jeunes agés de 9 à 10 ans' },
        'M1': { value: 'Minime 1', desc: 'jeunes agés de 10 à 11 ans' },
        'M2': { value: 'Minime 1', desc: 'jeunes agés de 11 à 12 ans' },
        'C1': { value: 'Cadet 1', desc: 'jeunes agés de 12 à 13 ans' },
        'C2': { value: 'Cadet 2', desc: 'jeune agés de 13 à 14 ans' },
        'J1': { value: 'Junior 1', desc: 'jeunes agés de 14 à 15 ans' },
        'J2': { value: 'Junior 2', desc: 'jeunes agés de 15 à 16 ans' },
        'J3': { value: 'Junior 3', desc: 'jeunes agés de 16 à 17 ans' },
        'S': { value: 'Senior', desc: 'adultes agés de 18 à 39 ans' },
        'V1': { value: 'Veteran 1', desc: 'adultes agés de 40 à 49 ans' },
        'V2': { value: 'Veteran 2', desc: 'adultes agés de 50 à 59 ans' },
        'V3': { value: 'Veteran 3', desc: 'adultes agés de 60 à 69 ans' },
        'V4': { value: 'Veteran 4', desc: 'adultes agés de 70 à 79 ans' },
        'V5': { value: 'Veteran 1', desc: 'adultes agés de plus de 80 ans' }
    }


    players:Array<any>=[]


    @Action({commit:'SET_PLAYERS'})
    setPlayers(players:Array<any>){
        return players
    }

    @Mutation 
    SET_PLAYERS(players:Array<any>){
        this.players=players
    }

    @Action({commit:'SET_PLAYER'})
    setPlayer(player:any){
        return player
    }

    @Mutation 
    SET_PLAYER(player:any){
        this.player=player
    }

    @Action({commit:'SET_CLUB'})
    setClub(club:any){
        return club
    }

    @Mutation
    SET_CLUB(club:any){
        this.club=club
    }
    
    @Action({commit:'SET_PARTIES'})
    setParties(parties:any){
        return parties
    }

    @Mutation
    SET_PARTIES(parties:any){
        this.parties=parties
    }

    @Action({commit:'SET_HISTORIQUE'})
    setHistorique(historique:any){
        return historique
    }

    @Mutation
    SET_HISTORIQUE(historique:any){
        this.historique=historique
    }
   
}
const PingModule = getModule(PingStore);
export default PingModule