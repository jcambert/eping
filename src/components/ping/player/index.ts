
import {Vue,Component, Prop,Model} from 'vue-property-decorator'
import Render from './index.html'
import PlayerCardInfo from './PlayerCardInfo'
import PlayerPointInfo from './PlayerPointInfo'
import PlayerPartieInfo from './PlayerPartiesInfo';
import ClubCardInfo from '../club/ClubCardInfo';
import PlayerRang from './PlayerRang'
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
    
    active:any=null
    player={
        nom:'Ambert',
        prenom:'Jean-Christophe',
        club:'ATT Grandvillars',
        classement:'6',
        points:616,
        age:'Veteran 1',
        licence:'905821',
        sexe:'male'
    }
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
  mounted(){
   // alert('CardviewInfo mounted')
  }
}