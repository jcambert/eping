
import {Vue,Component, Prop} from 'vue-property-decorator'
import Render from './index.html'
import CardInfo,{CardInfoOptions} from '../../CardInfo'
@Render
@Component({
    components:{
        CardInfo:CardInfo
    }
})
export default class PlayerCardInfo extends Vue{
    @Prop()
    player:any
    get icon():string{
        return this.player.sexe=='male' ? 'male-avatar':'female-avatar'
    }
    /*get avatar(){
        return require('./' + this.icon + '.png')
    }*/
    get model():CardInfoOptions{
        return {icon:this.icon,title:`${this.player.nom}<br>${this.player.prenom}`,text:this.player.club,badge:this.player.classement,actions:[this.player.points ,this.player.age ,this.player.licence ]}
    }


  mounted(){
   // alert('CardviewInfo mounted')
   //console.log(this.player)
  }
}