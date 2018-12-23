
import {Vue,Component, Prop} from 'vue-property-decorator'
import Render from './index.html'

export interface PlayerPoint{
  desi:string,
  points:number,
  ecarts?:number
}
@Render
@Component({})
export default class PlayerPointInfo extends Vue{

    @Prop({required:true})
    points:Array<PlayerPoint>
    /*
    points= [
        {
          des: 'Début Saison',
          points: '527'
        },
        {
          des: 'Officiel',
          points: 527,
          ecarts:0
        }
        ,
        {
          des: 'Pré-mensuel',
          points: 599,
          ecarts:72
        },
        {
          des: 'Mensuel',
          points: 616,
          ecarts:17
        },
        {
          des: 'Virtuel',
          points: 639,
          ecarts:23
        }
      ]*/

  mounted(){
   // alert('CardviewInfo mounted')
   //console.log(this.player)
  }
}