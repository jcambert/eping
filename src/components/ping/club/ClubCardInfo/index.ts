
import {Vue,Component, Prop} from 'vue-property-decorator'
import Render from './index.html'
import CardInfo, { CardInfoOptions } from '../../CardInfo';
@Render
@Component({
    components:{
        CardInfo:CardInfo
    }
})
export default class ClubCardInfo extends Vue{
    @Prop()
    club?:any

   
    get model():CardInfoOptions{
        return {icon:'home',title:`${this.club.nom}<br>&nbsp;`,text:this.club.region,actions:[`${this.club.licencies} licenciés` ,this.club.numero ]}
    }

  mounted(){

  }
}