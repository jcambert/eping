
import {Vue,Component, Prop,Model} from 'vue-property-decorator'
import Render from './index.html'
import * as _ from 'lodash'
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
@Render
@Component({
    components:{
        PlayerCard:PlayerCardInfo,
        ClubCard:ClubCardInfo,
        PlayerPoint:PlayerPointInfo,
        PlayerJournee:PlayerJournee,
        PlayerPartie:PlayerPartieInfo,
        PlayerRang : PlayerRang,
        ExpansionPanel:ExpansionPanel,
    }
})
export default class Player extends Vue{
    
    get app():ApplicationStore{
        return ApplicationModule;
    }
    get ping():PingStore{
        return PingModule
    }
    partiesLoaded=false
    pointVirtuel:number=0
    active:any=null
    player:any={}
    
    /*rangs=[
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
    ]*/
    loadPlayer(licence:string){
        console.log('Ping player load Player')
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
                //console.dir(response)
               // self.club=response.data
                self.ping.setClub(response.data/*self.club*/)
                return self.player.licence
            })
            .then(self.$player.getParties.bind(self.$player))
            .then(response=>{
               // console.dir(response)
                self.ping.setParties(response.data)
            })
    }
    rangs(){
        return [
            {
                value:"Nationnal",
                rang:this.ping.player.classementNational,
            },
            {
                value:"Regional",
                rang:this.ping.player.rangRegional,
            },
            {
                value:"Departemental",
                rang:this.ping.player.rangDepartemental
            },
        ]
    }
    historiquePoints(){
        let ptvir=this.pointVirtuel
        return [
            {
              des: 'Début Saison',
              points: this.player.pointDebut
            },
            {
              des: 'Officiel',
              points: this.player.pointOfficiel,
              ecarts:0
            }
            ,
            {
              des: 'Pré-mensuel',
              points: this.player.ancienPoint,
              ecarts: this.player.ancienPoint-this.player.pointOfficiel
            },
            {
              des: 'Mensuel',
              points: this.player.point,
              ecarts:this.player.point - this.player.ancienPoint
            },
            {
              des: 'Virtuel',
              points: ptvir,
              ecarts:ptvir-this.player.point
            }
          ]
    }
  created(){
      console.dir(this.app)
      /*this.$store.subscribe((mutation,state)=>{
        console.log(mutation.type)
        console.log(mutation.payload)
      })*/
      store.watch(state=>state.app,(app:IAppState)=>{
         //console.log('App Store Changed',app)
 
         if(!_.isUndefined( app.apiSettings) && !_.isUndefined(app.user)){
             //console.log('Player Service ready')
             
             this.partiesLoaded=false
             this.loadPlayer(app.user.id)
         }
         
     },{deep:true,immediate:true,})
     store.watch(state=>state.ping.parties,(parties:any)=>{
        this.pointVirtuel=0
        _.forEach(parties,(partie:any)=>{
            //console.log(this.pointVirtuel,partie.pointsGagnesPerdus,this.pointVirtuel+partie.pointsGagnesPerdus)
            this.pointVirtuel+=partie.pointsGagnesPerdus
        })
        this.pointVirtuel+=this.player.pointOfficiel
        this.partiesLoaded=true
     })
  }
  mounted(){
    

     /* var self=this
      if(this.app.USER)
        this.loadPlayer(this.app.USER.id)*/
            
  }
}