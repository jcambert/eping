
import {Vue,Component, Prop, Model,} from 'vue-property-decorator'
import Render from './index.html'
import CardInfo,{CardInfoOptions} from '../../CardInfo'
import PingModule, { PingStore } from '../../../../store/modules/ping';
import ChipTrending from '../../ChipTrending';
import Chip from '../../Chip';
import CardTextAction from '../../CardTextAction';
@Render
@Component({
    components:{
        CardInfo:CardInfo,
        CardTextAction:CardTextAction,
        Chip:Chip,
        ChipTrending:ChipTrending,

    }
})
export default class PlayerCardInfo extends Vue{
    @Prop()
    player:any

    @Prop({type:Number,required:true})
    progression:number=0

    get icon():string{
        return this.player.sexe=='M' ? 'male-avatar':'female-avatar'
    }
    get avatar(){
        return require('./../../assets/' + this.icon + '.png')
       // return require(this.assetPath+this.icon+'.png')
    }
   /* get model():CardInfoOptions{
        return {icon:this.icon,title:`${this.player.nom}<br>${this.player.prenom}`,text:this.player.club,badge:this.player.classement,actions:3}
    }*/

    get ping():PingStore{
        return PingModule
    }

  mounted(){
   // alert('CardviewInfo mounted')
   //console.log(this.player)
  }
}