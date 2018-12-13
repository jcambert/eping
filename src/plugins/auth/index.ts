import router from '../../routes'
import SidebarModule,{SidebarStore,MenuItem} from '../../store/modules/sidebar'
import Login from '../../components/auth/login'
import {RouterPlugin} from '../'

const menus=Array<MenuItem>()

const routes=[
{
    path: '/login',
    name: 'auth.login',
    component: Login
}]

class Auth extends RouterPlugin{


    protected setRoutes(){
        if(this.routes)
            router.addRoutes(this.routes)
    }
}
export default new RouterPlugin('auth',{routes:routes})