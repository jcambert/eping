declare module "*.vue" {
    import Vue from 'vue'
    export default Vue
  }

import Vue from "vue";
import signal from './realtime/signal'
import * as signalR from '@aspnet/signalr'
import {Socket} from './realtime/socket'
import {  $resource } from "vue-resource/types/vue_resource";
import { Auth } from "./services/auth";

declare module "vue/types/vue" {
  interface Vue {
    routeToName(route:string):Function,
    $signal:signalR.HubConnection,
    $socket:Socket,
    $resource:$resource,
    $auth:Auth
  }
}