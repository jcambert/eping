
import { Module, VuexModule,Mutation,Action,getModule} from 'vuex-module-decorators'
import store from '../'

export interface ITopbarState {
    drawer: boolean;
    
  }


@Module({ dynamic: true, name:'topbar',store:store})
 export class TopbarStore extends VuexModule {
    drawer=false
    mini=false

    @Mutation
    DRAWER_CHANGE( value: boolean) {
        this.drawer = value;
    }

    @Action({ commit: 'DRAWER_CHANGE' })
    drawerChange(value: boolean):boolean {
        return value
    }
    
    @Mutation
    MINI_DRAWER_CHANGE( value: boolean) {
        this.mini = value;
    }

    @Action({ commit: 'MINI_DRAWER_CHANGE' })
    miniDrawerChange(value: boolean):boolean {
        return value
    }
  
   
}
const TopbarModule = getModule(TopbarStore);
export default TopbarModule