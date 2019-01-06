

import {Vue,Component, Prop} from 'vue-property-decorator'
import Render from './index.html'
import * as _ from 'lodash'

@Render
@Component({
  
})
export default class ClubSearch extends Vue{
    searchWord:string=""
    clubs=Array<any>() 

    public onSearch(e:KeyboardEvent){
       this.searchClub(this.searchWord)
    }

    public searchClub(numero:string){
        


        this.$club.searchClubByNom(numero)
            .then(response=>{
                this.clubs.splice(0,this.clubs.length)
                _.forEach(response.data,j=>{
                    this.clubs.push(j)
                })
            })
    }
    
    avatar(){
        return require('./../../assets/home.png')
       
    }

    public classement(joueur:any){
        if(joueur.echelon!==""){
            return `n° ${joueur.place}`
        }else   
            return Math.trunc(joueur.point/100)
    }
  mounted(){

  }
}

