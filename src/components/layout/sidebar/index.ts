
//import Vuex, { mapGetters, mapActions } from 'vuex';
import {Vue,Component, Prop,Model,} from 'vue-property-decorator'
import Render from './index.html'

import SidebarModule,{SidebarStore,MenuItem} from '../../../store/modules/sidebar'
import TopbarModule,{TopbarStore} from '../../../store/modules/topbar'
import  ApplicationModule,{ApplicationStore} from '../../../store/modules/app'
@Render
@Component({})
export default class Sidebar extends Vue{
    
    get topbar():TopbarStore{
      return TopbarModule 
    }
    get sidebar():SidebarStore{
      return SidebarModule
    }
   
    get application():ApplicationStore{
      return ApplicationModule
    }
    mounted(){
     
    }
}

import Vuee from 'vue'


export  function Menu(Vue: typeof Vuee,menuItems: Array<MenuItem>){
    SidebarModule.setMenuItems(menuItems);
}

