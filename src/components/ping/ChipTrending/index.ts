import {Vue,Component, Prop} from 'vue-property-decorator'
import Render from './index.html'

@Render
@Component({})
export default class ChipTrending extends Vue{
    @Prop( {type:Boolean,default:false,required:true})
    redCondition:boolean=false

    @Prop({required:true})
    value:any

    @Prop({type:String,default:"",required:true})
    tooltip:string=""
}