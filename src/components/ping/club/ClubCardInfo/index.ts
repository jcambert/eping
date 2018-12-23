
import {Vue,Component, Prop} from 'vue-property-decorator'
import Render from './index.html'
import CardInfo, { CardInfoOptions } from '../../CardInfo';
import CardTextAction from '../../CardTextAction';
import CardButtonAction from '../../CardbuttonAction';
@Render
@Component({
    components:{
        CardInfo:CardInfo,
        CardTextAction:CardTextAction,
        CardButtonAction:CardButtonAction
    }
})
export default class ClubCardInfo extends Vue{
    @Prop()
    club?:any

    get icon(){
        return 'home'
    }
    get avatar(){
        return require('./../../assets/' + this.icon + '.png')
       // return require(this.assetPath+this.icon+'.png')
    }

    /*get model():CardInfoOptions{
        return {icon:'home',title:`${this.club.nom}<br>&nbsp;`,text:this.club.region,actions:2}
    }*/

    onClickCorrespondant(){
        //alert('on correspondant click')
        var email = this.club.mailCorrespondant;
        var subject = 'Tennis de Table';
        var emailBody = 'Bonjour,\n';
        document.location.href = "mailto:"+email+"?subject="+subject+"&body="+emailBody
    }

    onClickShare(){
        //alert('on share click')
        window.open(this.club.siteWeb,"_blank")
    }
  mounted(){

  }
}