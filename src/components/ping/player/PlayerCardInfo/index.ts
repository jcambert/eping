
import {Vue,Component, Prop, Model,} from 'vue-property-decorator'
import Render from './index.html'
import CardInfo,{CardInfoOptions} from '../../CardInfo'
import PingModule, { PingStore } from '../../../../store/modules/ping';
import ChipTrending from '../../ChipTrending';
import Chip from '../../Chip';
import CardTextAction from '../../CardTextAction';
import filters from '../../../../filters';

@Render
@Component({
    components:{
        CardInfo:CardInfo,
        CardTextAction:CardTextAction,
        Chip:Chip,
        ChipTrending:ChipTrending,
    },
    filters:filters
})
export default class PlayerCardInfo extends Vue{
    @Prop()
    player:any

    @Prop({type:Number,required:false,default:0})
    progression?:number

    get icon():string{
        return this.player.sexe=='M' ? 'male-avatar':'female-avatar'
    }
    get avatar(){
        return require('./../../assets/' + this.icon + '.png')
    }

    get progression_():number |undefined{
        return this.progression
    }

    get ping():PingStore{
        return PingModule
    }

    get player_(){
        return this.player
    }
  mounted(){

  }
}