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
import { Player } from "./services/ping/player";
import { Alive } from "./services/alive";
import { IRootState, EStore } from "./store";

declare module "vue/types/vue" {
  interface Vue {
    routeToName(route:string):Function,
    $signal:signalR.HubConnection,
   // $store: EStore<IRootState>;
    $socket:Socket,
    $resource:$resource,
    $auth:Auth,
    $player:Player,
    $alive:Alive
  }
}