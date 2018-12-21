
import {Vue,Component, Prop} from 'vue-property-decorator'
import Render from './index.html'
import PingVue from '..';
export interface CardInfoOptions{
    icon:string,
    badge?:string,
    title:string,
    text:string,
    actions?:number
}
@Render
@Component({})
export default  class CardInfo extends PingVue {
    @Prop()
    model?:CardInfoOptions
    get icon(){
        if(this.model)
            return  this.model.icon
    }
    get avatar(){
        return require('./../assets/' + this.icon + '.png')
       // return require(this.assetPath+this.icon+'.png')
    }
    cardhrClass(index:number){
        if(this.model && this.model.actions)
            return (index+1)<this.model.actions ?`border-right-width: thin;border-right-style: solid;border-right-color: rgba(0, 0, 0, .12)`:''
        
    }


  mounted(){
    //alert('CardviewInfo mounted')
    //console.log(this.model)
  }
}