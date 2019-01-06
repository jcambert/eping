import {Vue,Component, Prop, Watch} from 'vue-property-decorator'
import Render from './index.html'
@Render
@Component({})
export default class PlayerPartie extends Vue{
    @Prop()
    partie:any

    @Watch('partie')
    onPartieChanged(val:any){
        console.log(val)
    }
}