import {Vue,Component, Prop, Watch,} from 'vue-property-decorator'
import Render from './index.html'
import Snackbar from '../../../ui/snackbar/index.old';
import * as _ from 'lodash';
import PlayerCardInfo from '../PlayerCardInfo';
import ClubCardInfo from '../../club/ClubCardInfo';
import PlayerPointInfo from '../PlayerPointInfo';
import PlayerJournee from '../PlayerJourneeInfo';
import PlayerRang from '../PlayerRang';
import ExpansionPanel from '../../ExpansionPanel';
import PlayerPartie from '../PlayerPartiesInfo';
import filters from '../../../../filters';
import ApplicationModule, { ApplicationStore } from '../../../../store/modules/app';
import PingModule, { PingStore } from '../../../../store/modules/ping';
@Render
@Component({
    data(){
        return {
            club:undefined,
            player_:undefined,
        }
    },
  components:{
      //Snackbar:Snackbar,
    PlayerCard:PlayerCardInfo,
    ClubCard:ClubCardInfo,
    PlayerPoint:PlayerPointInfo,
    PlayerJournee:PlayerJournee,
    PlayerPartie:PlayerPartie,
    PlayerRang : PlayerRang,
    ExpansionPanel:ExpansionPanel,
  },
  filters:filters
})
export default class PlayerInfo extends Vue{

    @Prop({required:true})
    licence?:string

    player_?:any=undefined

    club?:any=undefined

    parties:any=[]
    historique:any=[]

    pointVirtuel=0

    message=""
    snackColor="success"
    showSnack=false

    tabactive:any=null

    onloading=false

    partielicence=""
    dialog=false

    get application():ApplicationStore{
        return ApplicationModule
    }

    get ping():PingStore{
        return PingModule
    }

    get onLoading(){
        return this.onloading
    }
    @Watch('licence',{immediate:true})
    playerChanged(newLicence:any){
        if(newLicence!==undefined){
            console.log('PlayerInfo:PlayerChanged');
            this.loadPlayerInfo(newLicence)
        }
    }

    showPlayerInfo(e:any){

        console.log("showPlayerInfo",e)
        var noms=e.nom.split(' ');
        this.$player.searchPlayerByNom(noms[0],noms[1])
            .then(resp=>{
                console.log(resp)
                this.partielicence=resp.data[0].licence
                this.dialog=true
            })
            
        
        //
    }
    onLicenceError(){

    }

    loadPlayerInfo(newLicence:any){
        if(this.onloading){
            this.errorMessage("`Chargement de ${this.player_.prenom} en cours...`")
            return
        }
        this.onloading=true
        this.successMessage("`Debut chargement des données ")

        let self=this
        return this.$player.getPlayer(newLicence)
            .then(response=>{
                
                self.player_=response.data
                self.$emit("playerloaded",self.player_);
                //if(this.application.user && self.player_.licence==this.application.user.id)
                //    this.ping.player=self.player_

                console.log(self.player_)
                return self.player_.numeroClub
            })
            .then(self.$player.getClub.bind(self.$player))
            .then(response=>{
                self.club=response.data
                self.$emit("clubloaded",self.club);
                return self.player_.licence
            })
            .then(self.$player.getParties.bind(self.$player))
            .then(response=>{
                self.parties=response.data
                self.$emit("partiesloaded",self.parties);
                return self.player_.licence
            })
            .then(self.$player.getHistorique.bind(self.$player))
            .then(response=>{
                this.historique = response.data
                self.$emit('onhistoloaded',this.historique)
            })
            .then(()=>{
                self.onloading=false
            })
            .catch(error=>{
                //console.error(error)
               // alert('Player info error')
                self.errorMessage("`${newPlayer.prenom} n'a pas de licence compétition`")
                //self.$emit("playerLicenceCompetitionError")
                self.$emit("error")
                self.onloading=false
            })
    }

    get rangs(){
        if(!this.player_)return[]
        return [
            {
                value:"Nationnal",
                rang:this.player_.classementNational,
            },
            {
                value:"Regional",
                rang:this.player_.rangRegional,
            },
            {
                value:"Departemental",
                rang:this.player_.rangDepartemental
            },
        ]
    }
    get historiquePoints(){
        if(!this.player_)return []
        let ptvir=this.pointVirtuel
        return [
            {
              des: 'Début Saison',
              points: this.player_.pointDebut
            },
            {
              des: 'Officiel',
              points: this.player_.pointOfficiel,
              ecarts:0
            }
            ,
            {
              des: 'Pré-mensuel',
              points: this.player_.ancienPoint,
              ecarts: this.player_.ancienPoint-this.player_.pointOfficiel
            },
            {
              des: 'Mensuel',
              points: this.player_.point,
              ecarts:this.player_.point - this.player_.ancienPoint
            },
            {
              des: 'Virtuel',
              points: ptvir,
              ecarts:ptvir-this.player_.point
            }
          ]
    }
    @Watch('parties',{deep:true,immediate:true})
    onPartiesChanged(newParties:any[]){
        if(!this.player_) return
        //console.log("parties changed")
        this.pointVirtuel=0
        if(this.player_.point==this.player_.pointOfficiel)
            this.pointVirtuel=this.player_.pointOfficiel
            return
        
        _.forEach(newParties,(partie:any)=>{
            //console.log(this.pointVirtuel,partie.pointsGagnesPerdus,this.pointVirtuel+partie.pointsGagnesPerdus)
            this.pointVirtuel+=partie.pointsGagnesPerdus
        })
       
        this.pointVirtuel+=this.player_.pointOfficiel
        //alert(this.pointVirtuel)
    }

    private errorMessage(message:string){
        this.snackColor="error"
        this.message=message
    }

    private successMessage(message:string){
        this.snackColor="success"
        this.message=message
    }

    @Watch('message')
    onMessageChanged(){
        this.showSnack=true
    }
    mounted(){

    }
}