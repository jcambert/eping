

import {Vue,Component, Prop} from 'vue-property-decorator'
import Render from './index.html'
import PlayerPartie from '../PlayerPartiesInfo'
@Render
@Component({
    components:{
        PlayerPartie:PlayerPartie
    }
})
export default class PlayerJournee extends Vue{

    @Prop({required:true})
    journee:any
    mounted(){

    } 
}

