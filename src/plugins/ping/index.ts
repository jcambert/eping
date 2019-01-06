import {UiPlugin, RouterPlugin} from '..'

import Player from '../../components/ping/player';
import Club from '../../components/ping/club';
import PlayerSearch from '../../components/ping/player/playerSearch';
import ClubSearch from '../../components/ping/club/ClubSearch';

const routes=[
       {
            path:'ping/me',
            name:'ping.me',
            component:Player// require('./../../components/ping/player')
        },
        {
            path:'ping/club',
            name:'ping.club',
            component:Club
        },
        {
            path:'ping/search/player/:name?',
            name:'ping.search.player',
            component:PlayerSearch
        },
        {
            path:'ping/search/club',
            name:'ping.search.club',
            component:ClubSearch
        }
    ]

  const menus=[
    {
        icon: 'keyboard_arrow_up',
        iconalt: 'keyboard_arrow_down',
        text: 'Mon App',
        //model: true,
        children: [
            { icon: 'person', text: 'Mon Espace',route_name:'ping.me' },
            { icon: 'domain', text: 'Mon Club',route_name:'ping.club' },
            { icon: 'star', text: 'Mes Favoris',route_name:'ping.favorite' }
        ]
    },
    {
        icon: 'keyboard_arrow_up',
        iconalt: 'keyboard_arrow_down',
        text: 'Rechercher',
        //model: true,
        children: [
            { icon: 'person', text: 'Joueurs',route_name:'ping.search.player' },
            { icon: 'domain', text: 'Clubs',route_name:'ping.search.club' },
            { icon: 'casino', text: 'Competitions',route_name:'ping.search.event' }
        ]
    },
    {
        icon: 'keyboard_arrow_up',
        iconalt: 'keyboard_arrow_down',
        text: 'Aide',
        //model: true,
        children: [
            { icon: 'fa-calculator', text: 'Calculateur',route_name:'ping.help.calculate' },
        ]
    },
    {
        icon: 'keyboard_arrow_up',
        iconalt: 'keyboard_arrow_down',
        text: 'Ping Rencontres',
        //model: true,
        children: [
            { icon: 'phone_forwarded', text: 'Joueurs',route_name:'ping.search.player' },
            { icon: 'euro_symbol', text: 'Clubs',route_name:'ping.search.club' },
            { icon: 'euro_symbol', text: 'Competitions',route_name:'ping.search.event' }
        ]
    }
  
]

const plugin =new UiPlugin("ping",menus,{routes: routes,parentName:'home'});
export default plugin