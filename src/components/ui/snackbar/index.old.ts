
import {Vue,Component, Prop} from 'vue-property-decorator'
import Render from './App.html'
@Render
@Component({
  
})
export default class App extends Vue{

  mounted(){

  }
}
/*import {Vue,Component, Prop} from 'vue-property-decorator'
import Render from './index.html'
@Render
@Component({})

export default class Snack extends Vue{

    @Prop({type:Boolean,default:false})
    visible?:boolean;

    @Prop({type:String,default:"success"})
    color?:string;

    @Prop({type:Boolean,required:false,default:true})
    multiLine?:boolean;

    @Prop({type:Number,required:false,default:2000})
    timeout?:number;

    @Prop({type:Boolean,required:false,default:true})
    vertical?:boolean;

    mounted(){

    }
}*/