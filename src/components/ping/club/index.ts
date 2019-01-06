import {Vue,Component, Prop,Model} from 'vue-property-decorator'
import Render from './index.html'
import ClubCardInfo from './ClubCardInfo';
import ClubInfo from './ClubInfo';
@Render
@Component({
    components:{
        ClubInfo:ClubInfo
    }
})
export default class Club extends Vue{
}