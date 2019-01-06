import Vue from 'vue'
import VueRouter,{RouterOptions,RouterMode} from 'vue-router'
import Home from '../components/layout/home'
import Sidebar from '../components/layout/sidebar'
import Topbar from '../components/layout/topbar'
import * as _ from 'lodash';
import { MenuItem } from '../store/modules/sidebar';
import { Observable, Subject } from 'rxjs';
import { Component } from 'vue-property-decorator'

Component.registerHooks([
    'beforeRouteEnter',
    'beforeRouteUpdate',
    'beforeRouteLeave'
  ]);

Vue.use(VueRouter)

 
interface IDefaultRouteOption{
    name?:string
    url?:string

}
export interface RouterCreated{
    router:VueRouter
}
class AppRouter{
    private routes:Array<any>=[]
    private mode?:RouterMode
    private onRouterCreatedSubject=new Subject<RouterCreated>()
    private routerVue:VueRouter |undefined
    constructor(options:any){
       // console.log("Create AppRouter")
        if(options.mode)
            this.mode=options.mode as RouterMode;
    }
    get routeOptions():RouterOptions{
        return {
            mode:this.mode,
            routes:this.routes
        }
    }
    get router():VueRouter{
        if(this.routerVue!=undefined)return this.routerVue;
       // console.log('create VueRouter with ',this.routeOptions)
        this.routerVue= new VueRouter(this.routeOptions)
        this.onRouterCreatedSubject.next({router:this.routerVue})
        return this.routerVue
    }
    get onRouterCreated():Subject<RouterCreated>{
       return this.onRouterCreatedSubject
    }
    addDefaultRoute(option:IDefaultRouteOption){
        if(option.name)
            this.addRoute({name:'404',path:'*',redirect:{name:option.name}})
        else if(option.url)
            this.addRoute({name:'404',path:'*',redirect:option.url})
    }
    addRoute(route:any){
        
        if(!route.name)
            throw new Error("route must contain a name")
        //console.dir(route.name)
        this.routes.push(route);
    }
    addRoutes(routes:Array<any>){
        _.forEach(routes,route=>this.addRoute(route))
    }
    addChild(parentName:any,route:{}){
        var res = _.find(this.routes,{name:parentName})
        if(res){
            
            if(!res.children)res.children=[]
            res.children.push(route)
           // console.log('add',route, ' to ' ,parentName)
        }
    }
    addChilds(parentName:any,routes:Array<any>){
        _.forEach(routes,route=>this.addChild(parentName,route))
    }
}

const appRouter = new AppRouter({mode:'hash'})
appRouter.addDefaultRoute({name:'home'})
appRouter.addRoute({
    path:'/',
    name:'home',
    components:{
      default:Home,
      sidebar:Sidebar,
      topbar:Topbar
    },
    children:[]
  })
  /*appRouter.addRoute({
    path:'/',
    name:'login',
    components:{
      default:Home,
      sidebar:Sidebar,
      topbar:Topbar
    },
    children:[]
  })*/

export default appRouter

//require("./modules/commercial")
//require("./modules/cotation")