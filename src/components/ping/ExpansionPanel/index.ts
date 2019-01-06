
import {Vue,Component, Prop} from 'vue-property-decorator'
import Render from './index.html'
@Render
@Component({
  
})
export default class ExpansionPanel extends Vue{

    @Prop({type:String,required:true,default:""})
    header?:string
    mounted(){

    }
}

