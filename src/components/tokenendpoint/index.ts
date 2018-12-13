
import {Vue,Component, Prop, Model,} from 'vue-property-decorator'
import Render from './index.html'
import ApplicationModule, {  ApplicationStore} from "../../store/modules/app";

@Render
@Component({

})
export default class TokenEndpointDialog extends Vue{
    @Prop({type:String,default:""}) initial?:string
    
    endpoint?:string=this.initial

 
    get application():ApplicationStore{
        return ApplicationModule
    }
    close(){
        this.application.hideTokenEndPointDialog()
        this.endpoint=""
    }

    save(){

        this.application.setEndPoint(this.endpoint);
        this.application.hideTokenEndPointDialog()
        this.endpoint=""
    }

    mounted(){
       
    }
}
