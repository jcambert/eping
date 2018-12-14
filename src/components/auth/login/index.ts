
import {Vue,Component, Prop,} from 'vue-property-decorator'
import Render from './index.html'
import ApplicationModule,{ApplicationStore} from '../../../store/modules/app'
import PingModule,{PingStore} from '../../../store/modules/ping'
import TokenEndPointDialog from "../../tokenendpoint";
@Render
@Component({

    components:{
        TokenEndPointDialog:TokenEndPointDialog
    }
})
export default class Login extends Vue{
    valid:boolean=false
    licence:string= "905821"
    prenom:string= ""
    requested:boolean= false
    licenceRules= [(v:any) => !!v || 'Votre numero de licence ou votre nom sont requis']
    prenomRules= [(v:any) => !!v || 'Votre prenom est requis']
    get application():ApplicationStore{
        return ApplicationModule
    }
    get ping():PingStore{
        return PingModule
    }
    get endpoint(){
        return  this.ping.tokenEndPoint || "45674589"
    }
    submitForm() {

    }
    clearForm() {
        this.$refs.form.reset();
    }
    isLicence() {
        return /^\d+$/.test(this.licence) || this.licence=="" || this.licence == undefined;
    }
    
    get formValid():boolean {
        return this.valid
    }
    created(){
        this.ping.setEndPoint("localhost:12345")
    }
}