
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

    @Prop({type:Boolean,default:true})
    showCorrespondant?:boolean

    @Prop({type:Boolean,default:true})
    showNumero?:boolean

    @Prop({type:Number,default:0})
    licencies?:number

    @Prop({type:Boolean,default:true})
    showCard?:boolean

    get icon(){
        return 'home'
    }
    get avatar(){
        return require('./../../assets/' + this.icon + '.png')
    }



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