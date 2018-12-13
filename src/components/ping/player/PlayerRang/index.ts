import {Vue,Component, Prop} from 'vue-property-decorator'
import Render from './index.html'

@Render
@Component({})
export default class PlayerRang extends Vue{
    @Prop()
    rang:any


    get carte(){
        return require('./../../assets/' + this.rang.carte + '.png')
    }
}