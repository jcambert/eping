
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
    @Prop({type:Number,required:false,default:3})
    nbreActions?:number

    cardhrClass(index:number){
        return (index+1)<this.nbreActions_ ?`border-right-width: thin;border-right-style: solid;border-right-color: rgba(0, 0, 0, .12)`:''
        
    }

    get nbreActions_():number{
        return this.nbreActions?this.nbreActions:3
    }

  mounted(){

  }
}