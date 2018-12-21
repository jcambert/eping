
import {Vue,Component, Prop,Model} from 'vue-property-decorator'
import Render from './index.html'
import PlayerCardInfo from './PlayerCardInfo'
import PlayerPointInfo from './PlayerPointInfo'
import PlayerPartieInfo from './PlayerPartiesInfo';
import ClubCardInfo from '../club/ClubCardInfo';
import PlayerRang from './PlayerRang'
import ApplicationModule,{ApplicationStore, User} from './../../../store/modules/app'
import { createDecipher } from 'crypto';
import PingModule, { PingStore } from '../../../store/modules/ping';
@Render
@Component({
    components:{
        PlayerCard:PlayerCardInfo,
        ClubCard:ClubCardInfo,
        PlayerPoint:PlayerPointInfo,
        PlayerPartie:PlayerPartieInfo,
        PlayerRang : PlayerRang
    }
})
export default class Player extends Vue{
    
    get app():ApplicationStore{
        return ApplicationModule;
    }
    get ping():PingStore{
        return PingModule
    }
    active:any=null
    player:any={}
    parties=[{
        nom:'Francois Nicolas',
        victoire:'V',
        classement:500,
        pointsGagnesPerdus:"10"
    },{
        nom:'Felten Frederic',
        victoire:'D',
        classement:671,
        pointsGagnesPerdus:"0-3"
    }]
    club={
        nom:'ATT Grandvillars',
        region:'Territoire de Belfort (90)',
        licencies:25,
        numero:'02900041'
    }
    rangs=[
        {
            carte:'90',
            rang:21123,
            stat:'10%'
        },
        {
            carte:'90',
            rang:15000,
            stat:'20%'
        },
        {
            carte:'90',
            rang:211,
            stat:'30%'
        },
        {
            carte:'90',
            rang:21,
            stat:'40%'
        },
    ]
    loadPlayer(licence:string){
        var self=this
        this.$player.getPlayer(licence)
            .then(response=>{
                self.player= response.data
                // console.dir(response)
                //return self.$player.ge
                self.ping.setPlayer(self.player)
                return self.player.numeroClub;
            })
            .then(self.$player.getClub.bind(self.$player))
            .then(response=>{
                console.dir(response)
                self.club=response.data
                self.ping.setClub(self.club)
            })
    }
  created(){
      console.dir(this.app)
      /*this.$store.subscribe((mutation,state)=>{
        console.log(mutation.type)
        console.log(mutation.payload)
      })*/

    this.$store.watch(state=>state.app.user,(value:User|undefined)=>{
        console.log('a new user happened',value)

        if(value!=undefined)
            this.loadPlayer(value.id)
            /*this.$player.getPlayer(value.id).then(response=>{
                this.player= response.data
               // console.dir(response)
            })*/
    },{deep:true,immediate:true,})
  }
  mounted(){
      var self=this
      if(this.app.USER)
        this.loadPlayer(this.app.USER.id)
            
  }
}