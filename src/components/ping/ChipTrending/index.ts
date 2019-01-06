import {Vue,Component, Prop} from 'vue-property-decorator'
import Render from './index.html'

@Render
@Component({})
export default class ChipTrending extends Vue{
    @Prop( {type:Boolean,default:false})
    redCondition?:boolean

    @Prop({required:true})
    value:any

    @Prop({type:String,default:"",required:false})
    tooltip?:string
}