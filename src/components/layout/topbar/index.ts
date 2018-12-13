
import Vuex, { mapGetters, mapActions } from 'vuex';
import {Vue,Component, Prop,Model,} from 'vue-property-decorator'
import Render from './index.html'

import ApplicationModule,{ApplicationStore} from '../../../store/modules/app'
import TopbarModule,{TopbarStore} from '../../../store/modules/topbar'
@Render
@Component({})
export default class Topbar extends Vue{
    
    get topbar():TopbarStore{
        return TopbarModule 
    }
    get app():ApplicationStore{
        return ApplicationModule
    }


    mounted(){
        
    }
}
