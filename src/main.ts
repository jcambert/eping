import Vue from 'vue'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource'
import { sync } from 'vuex-router-sync'

import store from './store'
import appStore, { ApplicationStore } from './store/modules/app'
//import pingStore from './store/modules/ping'
import App from './components/App'
import appRouter from './routes'
import Plugin from './plugins'
import Ping from './plugins/ping'
import Auth from './plugins/auth'
import signalR from './realtime/signal'
import socket from './realtime/socket'
import { Message } from './realtime/socket/server/socketServer';


import AuthService from './services/auth'
import ApplicationModule from './store/modules/app';
import PlayerService from './services/ping/player';

appStore.settitle("Eping 2018")
appStore.hideloginSettingsDialog()
Vue.use(Vuetify)
Vue.use(VueResource);
//Vue.use(signalR,"http://localhost:63271/intranet")
//Vue.use(socket,"http://localhost:8081")
Vue.use(Plugin,Auth, Ping);
Vue.use(AuthService)
Vue.use(PlayerService)
Vue.filter("formatNumber", function (value:any) {
  //return numeral.format(value,v=>{ return 0}); // displaying other groupings/separators is possible, look at the docs
  return value
});
Vue.filter("formatPoints", function (value:any) {
  return value > 0 ? "+" + value : value; // displaying other groupings/separators is possible, look at the docs
});

Vue.mixin({
  methods: {
      routeToName(name:string) {
         
          this.$router.push({ name: name });
      },
      goBack() {
        window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
      },
  }
})
const router = appRouter.router

sync(store, router); 
//global.store=store
router.beforeEach((from,to,next)=>{
  console.log('want navigate from ',from.name,' to ', to.name);
  if(from.name=="auth.login")return next();
  if(to.name!="auth.login" && !ApplicationModule.bearer){
    console.log('1');
     next({name: 'auth.login'})
  }
  else{
    console.log('2');
     next()
  }
});
const vue=new Vue({
  el: '#app',
  router,
  store,
  
  components:{
    App,
  },
  computed:{
    application():ApplicationStore{
      return ApplicationModule
    }
  },
  render: (h:any) => h('App',{attrs:{start:100}}),
  created(){
    /*this.$signal.start().then(value=>console.log("SignalR started")).catch(err=>console.error(err));
    this.$socket.onMessage().subscribe((message: Message) => {
      console.log(message.content)
    });*/

    if(!sessionStorage.getItem('bearer') && this.$route.name!=="auth.login"){
      //store.dispatch('router/ROUTE_CHANGED',{name:'auth.login'})
      this.routeToName("auth.login")
    }
  },
  mounted(){
    this.$auth.onLoggedIn.subscribe(value=>{
      this.routeToName('ping.me')
    })

    this.$auth.onLogout.subscribe(value=>{
      ApplicationModule.logout()
      this.$router.push({ name: 'auth.login' });
    })
    console.log(this.$route.fullPath);
 
    /*
    this.$router.beforeEach((from,to,next)=>{
      
    })*/

  }
})
store.$vue = vue
//global.vue=vue