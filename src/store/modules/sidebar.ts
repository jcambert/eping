
import { Module, VuexModule,Mutation,Action,getModule} from 'vuex-module-decorators'
import store from '..'
import * as _ from 'lodash'

export interface MenuItem {
    icon: string;
    iconalt?:string;
    text: string;
    model?:boolean;
    route_name?: string;
    children?: MenuItem[];
    [key: number]: string;
}

export interface ISidebarState {
    menuItems:Array<MenuItem>;
    
  }


@Module({ dynamic: true, name:'sidebar',store:store})
 export class SidebarStore extends VuexModule implements ISidebarState{
    menuItems=Array<MenuItem>()

    @Mutation
    SET_MENU_ITEMS( value:  Array<MenuItem>) {
        this.menuItems = value;
    }

    @Action({ commit: 'SET_MENU_ITEMS' })
    setMenuItems( menuItems: Array<MenuItem>) {
        return menuItems
    }

    @Mutation
    ADD_MENU_ITEMS( menuItems: Array<MenuItem>){
        _.forEach(menuItems,item=>{
            this.menuItems.push(item);
        })
        
    }
    @Action({ commit: 'ADD_MENU_ITEMS' })
    addMenuItems(menuItems:Array<MenuItem>){
        return menuItems
    }
  
   
}
const SidebarModule = getModule(SidebarStore);
export default SidebarModule