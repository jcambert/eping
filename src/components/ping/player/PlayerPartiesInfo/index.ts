import {Vue,Component, Prop} from 'vue-property-decorator'
import Render from './index.html'
@Render
@Component({})
export default class PlayerPartieInfo extends Vue{
    @Prop()
    partie:any

}