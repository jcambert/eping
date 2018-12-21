import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'


import {IHomeState} from './modules/home'
import {ITopbarState} from './modules/topbar'
import {ISidebarState} from './modules/sidebar'
import { IPingState } from './modules/ping';
import { IAppState } from './modules/app';
Vue.use(Vuex)

export interface IRootState {
    app:IAppState,
    home: IHomeState,
    topbar:ITopbarState,
    sidebar:ISidebarState,
    ping:IPingState
  }




export class EStore<S> extends Vuex.Store<S> {
    constructor(options: StoreOptions<S>){
        super(options)
    }
    public $vue?:Vue;
}

const store = new EStore<IRootState>({});
store.watch(state=>state.home,(value,old)=>{
    console.log('Store home Changed',value);
},{deep:true})
 export default store;