import * as signalR from '@aspnet/signalr'
import Vuee from 'vue'


export default function SignalRPlugin(Vue: typeof Vuee,url:string){
    const connection = new signalR.HubConnectionBuilder()
    .withUrl(url)
    .build();
    Vue.prototype.$signal = connection
}


