import {Vue,Component, Prop, Model,Emit} from 'vue-property-decorator'
import Render from './index.html'

@Render
@Component({})
export default class CardButtonAction extends Vue{
    @Prop({type:String, required:true})
    icon:string

    @Prop({default:"",required:false})
    tooltip:string

    @Emit('onClick')
    onClick(){
        return ""
    }

}