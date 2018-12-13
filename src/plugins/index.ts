
//import appRouter,{AppRouter} from "../routes";
import RouterModule, { RouterStore, IDefaultRouteOption } from "../store/modules/route"
import SidebarModule,{ MenuItem, SidebarStore } from "../store/modules/sidebar"
import VueRouter, { RouteConfig, RouterOptions } from "vue-router";
import Vuee from 'vue'
import * as _ from 'lodash'
import Home from "../components/layout/home";
import Sidebar from "../components/layout/sidebar";
import Topbar from "../components/layout/topbar";
/*
this.sidebar.setMenuItems(
    [
      {
          icon: 'keyboard_arrow_up',
          iconalt: 'keyboard_arrow_down',
          text: 'Commercial',
          model: true,
          children: [
              { icon: 'phone_forwarded', text: 'Offres de Prix',route_name:'commercial.offre' },
              { icon: 'euro_symbol', text: 'Cotations',route_name:'commercial.cotation' }
          ]
      }
    
  ])*/
  export abstract class AbstractPlugin{
    name:string
    constructor(name:string){
        this.name=name
    }
      abstract execute():void;
  }
/*
  const routes=[
    {
      path:'/',
      name:'home',
      components:{
        default:Home,
        sidebar:Sidebar,
        topbar:Topbar
      },
    },
    {
    path:'*',
    redirect:'/'
  }]*/

import appRouter from "./../routes";
export interface RouteOptions{
    routes?: RouteConfig[],
    parentName?:string,
    default?:IDefaultRouteOption
}
  export class RouterPlugin extends AbstractPlugin{
      options?:RouteOptions
      constructor(name:string,options?:RouteOptions){
        super(name);
        
        this.options=options
      }
      public get routes():RouteConfig[] | undefined{
          if(this.options)
            return this.options.routes
      }
      execute(){
        if(this.options){
            if(this.options.default)
                appRouter.addDefaultRoute(this.options.default)
            if(this.options.routes)
                if(this.options.parentName)
                    appRouter.addChilds(this.options.parentName,this.options.routes)
                else
                    appRouter.addRoutes(this.options.routes)
        }
          //console.log('router created',this._router)
      }
  }
export  class MenuPlugin extends AbstractPlugin{
    

    private _menus=new Array<MenuItem>()
    constructor(name:string,menus?:Array<MenuItem>){
        super(name)
        if(menus)
            this._menus=menus
    }
    public get menus():Array<MenuItem>{return this._menus}
    
    public addMenus():void{
        console.log("UIPlugin.addMenus", this.menus);
        if(this.menus.length>0)
            this.sidebar.addMenuItems(this.menus)
    }

    public get sidebar():SidebarStore{
        return SidebarModule;
    }
    public execute(){
        this.addMenus()
    }
}

export class UiPlugin extends AbstractPlugin{
    router:RouterPlugin
    menu:MenuPlugin
    constructor(name:string,menus?:Array<MenuItem>,routes?:RouteOptions){
        super(name)
        this.router=new RouterPlugin(name+"_router",routes)
        this.menu=new MenuPlugin(name+"_menu",menus)
    }
    public get routerPlugin():RouterPlugin{
        return this.router
    }
    public get menuPlugin():MenuPlugin{
        return this.menu
    }
    public execute(){
        this.router.execute()
        this.menu.execute()
    }
}


//export const routerPlugin = new RouterPlugin('router');

export default function Plugin(Vue: typeof Vuee,...plugins:Array<AbstractPlugin>){
    _.forEach(plugins,plugin=>{
        plugin.execute()
        Vue.prototype['$'+plugin.name]=plugin
        
    })
    
}
