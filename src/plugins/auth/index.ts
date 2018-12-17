import router from '../../routes'
import SidebarModule,{SidebarStore,MenuItem} from '../../store/modules/sidebar'
import Login from '../../components/auth/login'
import Logou from '../../components/auth/logout'
import {RouterPlugin, RouteOptions} from '../'
import { Route, RawLocation } from 'vue-router';

const menus=Array<MenuItem>()

const routes=[
{
    path: '/login',
    name: 'auth.login',
    component: Login,
    
},{
    path: '/logout',
    name:'auth.logout',
    component:Logout
}]

const events={
   
    beforeEach:( to: Route,
            from: Route,
            next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void):any => {
                console.log('want navigate from ',from.name,' to ', to.name);
                return next()
            },
    
}

import appRouter from "./../../routes";
import Vue from 'vue';
import Logout from '../../components/auth/logout';
class Auth extends RouterPlugin{
    constructor(){
        super('auth',{routes:routes, events:events});
        appRouter.onRouterCreated.subscribe(event=>{
            console.log('Auth VueRouter Created');
            console.log(this.options)
            if(this.options && this.options.events && this.options.events.beforeEach){
                console.log('Add beforeEach route event')
                event.router.beforeEach(this.options.events.beforeEach)
                
            }
        })
    }

   
}
//export default new RouterPlugin('auth',{routes:routes})
const auth=new Auth();
export default auth;