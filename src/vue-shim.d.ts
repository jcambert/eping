declare module "*.vue" {
    import Vue from 'vue'
    export default Vue
  }

import Vue from "vue";
import signal from './realtime/signal'
import * as signalR from '@aspnet/signalr'

import {Socket} from './realtime/socket'
declare module "vue/types/vue" {
  interface Vue {
    $signal:signalR.HubConnection;
    $socket:Socket
  }
}