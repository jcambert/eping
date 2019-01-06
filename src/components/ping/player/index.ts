
import {Vue,Component, Prop,Model} from 'vue-property-decorator'
import Render from './index.html'
import * as _ from 'lodash'
import filters from './../../../filters'
import PlayerCardInfo from './PlayerCardInfo'
import PlayerPointInfo from './PlayerPointInfo'
import PlayerPartieInfo from './PlayerPartiesInfo';
import ClubCardInfo from '../club/ClubCardInfo';
import PlayerRang from './PlayerRang'
import ApplicationModule,{ApplicationStore, User, IAppState} from './../../../store/modules/app'
import PingModule, { PingStore } from '../../../store/modules/ping';
import ExpansionPanel from '../ExpansionPanel';
import store from '../../../store'
import PlayerJournee from './PlayerJourneeInfo';
import PlayerInfo from './PlayerInfo';
@Render
@Component({
    components:{
        PlayerInfo:PlayerInfo
    }
})
export default class Player extends Vue{
    
    get app():ApplicationStore{
        return ApplicationModule;
    }
    get ping():PingStore{
        return PingModule
    }

    get licence(){
        if( this.app.user)
            return this.app.user.id
    }

    
   
    onPlayerloaded(player:any){
        console.log("ping.me:onPlayerLoaded",player)
        this.ping.setPlayer(player)
    }
   
    onClubLoaded(club:any){
        console.log("ping.me:onClubLoaded",club)
        this.ping.setClub(club)
    }

    onPartiesLoaded(parties:any){
        console.log("ping.me:onPartiesLoaded",parties)
        this.ping.setParties(parties)
    }

    onHistoriqueLoaded(histo:any){
        console.log("ping.me:onHistoriqueLoaded",histo)
        this.ping.setHistorique(histo)
    }
  created(){}
  mounted(){
    

     /* var self=this
      if(this.app.USER)
        this.loadPlayer(this.app.USER.id)*/
            
  }
}