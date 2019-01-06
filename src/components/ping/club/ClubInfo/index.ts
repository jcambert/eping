import {Vue,Component, Prop, Watch,} from 'vue-property-decorator'
import Render from './index.html'
import Snackbar from '../../../ui/snackbar/index.old';
import * as _ from 'lodash';
import ClubCardInfo from '../../club/ClubCardInfo';
import ExpansionPanel from '../../ExpansionPanel';
import filters from '../../../../filters';
import PlayerListe from '../../player/PlayerListe';
import PingModule, { PingStore } from '../../../../store/modules/ping';
@Render
@Component({
    data(){
        return {
            club:undefined,
        }
    },
  components:{
      //Snackbar:Snackbar,
    ClubCard:ClubCardInfo,
    PlayerListe:PlayerListe,
    ExpansionPanel:ExpansionPanel
  },
  filters:filters
})
export default class ClubInfo extends Vue{
    @Prop({type:String, required:true})
    numero?:string
    
    public club?:any=undefined
    public licencies?:Array<any>=[]

    
    public get store():PingStore{
        return PingModule
    }

   @Watch('numero',{immediate:true})
   onNumeroChanged(val:string){
       let self=this

       this.$club.searchClubByNom(val)
        .then(resp=>{
            self.club=resp.data[0]
            this.store.setClub(self.club)
            console.log(self.club)
            return self.club.numero
        })
        .then(self.$player.getPlayers.bind(self.$player))
        .then(resp=>{
            self.licencies = resp.data
            if(self.licencies)
                this.store.setPlayers(self.licencies)
            console.log(self.licencies)
        })

   }
    mounted(){

    }
}