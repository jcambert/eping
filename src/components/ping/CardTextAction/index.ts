import {Vue,Component, Prop} from 'vue-property-decorator'
import Render from './index.html'

@Render
@Component({})
export default class CardTextAction extends Vue{
    @Prop({required:true})
    value:any

    @Prop({default:"",required:true})
    tooltip:string=""
}