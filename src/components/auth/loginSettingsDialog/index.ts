
import {Vue,Component, Prop, Model,} from 'vue-property-decorator'
import Render from './index.html'
import ApplicationModule, {  ApplicationStore} from "../../../store/modules/app";
import PingModule, { PingStore } from "../../../store/modules/ping"

@Render
@Component({

})
export default class LoginSettingsDialog extends Vue{
    @Prop({type:String,default:""}) initial?:string
    valid:boolean=false
    requested:boolean= false
    server?:string=this.initial || ''
    serverRule= [(v:any) => !!v || 'L\'addresse du server est obligatoire']
 
    get application():ApplicationStore{
        return ApplicationModule
    }

    get ping():PingStore{
        return PingModule;
    }
    close(){
        this.application.hideloginSettingsDialog()
        this.server=this.initial
    }

    save(){
        this.application.setServer(this.server);
        this.application.hideloginSettingsDialog()
        
    }
    get formValid():boolean {
        return this.valid
    }
    mounted(){
       console.log(this.application.SERVER)
    }
}
