
import {Vue,Component, Prop,} from 'vue-property-decorator'
import Render from './index.html'
import ApplicationModule,{ApplicationStore} from '../../../store/modules/app'
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
    get endpoint(){
        return  this.application.tokenEndPoint || "45674589"
    }
    submitForm() {}
    clearForm() {}
    isLicence() {}
    formValid() {
        return this.valid
    }
    created(){
        this.application.setEndPoint("localhost:12345")
    }
}