
import {Vue,Component, Prop} from 'vue-property-decorator'
import Render from './index.html'
import HomeModule,{HomeStore} from '../../../store/modules/home'
@Render
@Component({})
export default class Home extends Vue{
  get message():string{
      return this.home.message
  }
  get home():HomeStore{
    return HomeModule
  }
  mounted(){
    
  }
}
