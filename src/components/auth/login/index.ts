
import {Vue,Component, Prop,} from 'vue-property-decorator'
import Render from './index.html'
import ApplicationModule,{ApplicationStore} from '../../../store/modules/app'
import PingModule,{PingStore} from '../../../store/modules/ping'
import LoginSettingsDialog from "../../auth/loginSettingsDialog";
import { HttpResponse } from '@aspnet/signalr';
@Render
@Component({

    components:{
        LoginSettingsDialog:LoginSettingsDialog
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

    resetDatabase(){
        this.$auth.resetDatabase();
    }

    get server(){
        return  this.application.server
    }
    submitForm() {
        this.requested=true
        this.$auth.login(this.licence,this.prenom).then(
            (response)=>{
                console.log(response)
                //this.$store.commit('SET_USER',response.data.User)
                this.application.setUser(response.data.User)
                
                //this.application.setUser(response.data.User)
                this.application.setBearer(response.data.Token)
                this.application.setApiSettings(response.data.ApiSettings)
                this.$auth.fireLogin()
                
            },
            (error)=>{
                console.error(error)
                
            }
        )
        .then(()=>{
            this.requested=false
            console.log("Vous etes loggé !!")
        })
    }
    clearForm() {
        this.$refs.form.reset();
    }
    isLicence() {
        return /^\d+$/.test(this.licence) || this.licence=="" || this.licence == undefined;
    }
    
    get formValid():boolean {
        return this.valid && this.application.serverStatus
    }
    created(){
        
    }
    mounted(){
        if(this.application.development)
            this.$auth.onDatabaseReset.subscribe(()=>{
                console.log("database has been reseting")
            })
       // if(!localStorage.getItem('server'))
        //    this.application.setServer("http://localhost:54662")
     //if(! this.application.server)
       //     this.application.showloginSettingsDialog();
    }
}