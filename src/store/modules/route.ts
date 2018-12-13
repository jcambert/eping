
import {Vue,Component, Prop,Model,} from 'vue-property-decorator'
import { Module, VuexModule,Mutation,Action,getModule} from 'vuex-module-decorators'
import store from '..'
import VueRouter, { RouterMode, RouterOptions, RouteConfig } from 'vue-router';
import * as _ from 'lodash';

export interface IRouterState {
  mode:RouterMode
  routes:Array<RouteConfig>
}

export interface IDefaultRouteOption{
    name?:string
    url?:string

}


@Module({ dynamic: true, name:'router',store:store})
export class RouterStore extends VuexModule implements IRouterState {
  mode:RouterMode="hash"
  routes:Array<RouteConfig>=[]



  @Mutation
  ROUTER_MODE(value:RouterMode){
    this.mode=value;
  }
  @Action({ commit: 'ROUTER_MODE' })
  setRouterMode(mode:RouterMode){
    return mode;
  }

  @Mutation
  ADD_ROUTE(route:RouteConfig){
    if(!route.name)
        throw new Error("route must contain a name")
    this.routes.push(route)
  }
  
  @Mutation
  ADD_CHILD(options:any){
    let res = _.find(this.routes,{name:options.parentName}) as RouteConfig
      if(res){
        if(!options.route.name)
            throw new Error("route must contain a name")
        if(!res.children)res.children=[]
        res.children.push(options.route)
      }else
        this.routes.push(options.route)
  }

  @Action({ commit: 'ADD_ROUTE' })
  addDefaultRoute(route:IDefaultRouteOption){
    if(route.name)
        return {name:'404',path:'*',redirect:{name:route.name}}
    else if(route.url)
        return {name:'404',path:'*',redirect:route.url}
  }

  @Action({ commit: 'ADD_ROUTE' })
  addRoute(route:RouteConfig){
      
      return route;
  }


  @Action({ commit: 'ADD_CHILD' })
  addChild(options:any){
    console.log("RouterStore.addChild",options.parentName,options.route)
    return options
    
  }
  
}
const RouterModule = getModule(RouterStore);
RouterModule.addDefaultRoute({url:'/'})
export default RouterModule