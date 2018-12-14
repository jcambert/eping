import {Vue,Component, Prop,Model} from 'vue-property-decorator'
import Render from './index.html'
import ClubCardInfo from './ClubCardInfo';
@Render
@Component({
    components:{
        ClubCard:ClubCardInfo
    }
})
export default class Club extends Vue{
}