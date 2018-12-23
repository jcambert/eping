import {Vue,Component, Prop} from 'vue-property-decorator'
import Render from './index.html'

@Render
@Component({})
export default class Chip extends Vue{

    @Prop({required:true})
    value:any

    @Prop({type:String,default:"",required:true})
    tooltip:string=""
}