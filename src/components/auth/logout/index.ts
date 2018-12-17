
import {Vue,Component, Prop,} from 'vue-property-decorator'

import ApplicationModule,{ApplicationStore} from '../../../store/modules/app'
import PingModule,{PingStore} from '../../../store/modules/ping'


@Component({})
export default class Logout extends Vue{
    get application():ApplicationStore{
        return ApplicationModule
    }
    get ping():PingStore{
        return PingModule
    }
    mounted(){
        this.$auth.logout().then(()=>{
            this.application.logout()
            
            this.$auth.fireLogout()
        })
    }
}