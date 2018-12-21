import router from '../../routes'
import SidebarModule,{SidebarStore,MenuItem} from '../../store/modules/sidebar'
import Login from '../../components/auth/login'
import {RouterPlugin, RouteOptions} from '../'
import { Route, RawLocation, NavigationGuard } from 'vue-router';

const menus=Array<MenuItem>()

const routes=[
{
    path: '/login',
    name: 'auth.login',
    component: Login,
    
}]
/*
const events={
   
    beforeEach:( to: Route,
            from: Route,
            next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void):any => {
                console.log('want navigate from ',from.name,' to ', to.name);
                
                return next()
            },
    
}*/


import appRouter from "./../../routes";
import Vue from 'vue';
import { Subject } from 'rxjs';
class Auth extends RouterPlugin{

    constructor(){
        super('auth',{routes:routes/*, events:events*/});
        appRouter.onRouterCreated.subscribe(event=>{
            console.log('Auth VueRouter Created');
        })
    }

   

}
const auth=new Auth();
export default auth;