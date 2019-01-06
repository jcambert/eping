

import {Vue,Component, Prop, Watch} from 'vue-property-decorator'
import Render from './index.html'
import * as _ from 'lodash'
import filters from './../../../../filters'

import PlayerInfo from '../PlayerInfo';
@Render
@Component({
    components:{
        PlayerInfo:PlayerInfo
    },
    filters:filters
})
export default class PlayerSearch extends Vue{
    searchWord:string="ambert"
    joueurs=Array<any>() 
    currentJoueur:any=undefined
    currentClub:any=undefined
    dialog=false
    searching=false

    @Watch('searchWord')
    public OnSearchWordChanged(val:string){
        if(val===null || val.length===0)
            this.joueurs.splice(0,this.joueurs.length)
    }

    public onSearch(e:KeyboardEvent){
       // alert(e.target);
       this.searchPlayer(this.searchWord)
    }

    public searchPlayer(word:string){
        if(this.searching)return;
        this.searching=true
        let nom,prenom;
        let words=word.split(' ')
        nom=words[0].toUpperCase()
        if(words.length>1 && this.$options.filters && this.$options.filters['titleCase'])
            prenom=this.$options.filters['titleCase']( words[1])
        //console.log(prenom)
        this.joueurs.splice(0,this.joueurs.length)
        this.$player.searchPlayerByNom(nom,prenom)
            .then(response=>{
                
                _.forEach(response.data,j=>{
                    this.joueurs.push(j)
                })
                this.searching=false
            },
            (error)=>{
                this.searching=false
            })
    }
    icon(joueur:any):string{
        return joueur.sexe=='M' ? 'fa-male':'fa-female'
    }
    avatar(joueur:any){
        return require('./../../assets/' + this.icon(joueur) + '.png')
       
    }
    public showCardJoueur(joueur:any){
        this.currentJoueur=joueur
        this.dialog=true
    }

    
    public classement(joueur:any){
        if(joueur.echelon!==""){
            return `n° ${joueur.place}`
        }else   
            return Math.trunc(joueur.point/100)
    }

    public beforeRouteEnter(route,redirect,next){
        next( (vm:PlayerSearch) => {
            //alert('Entering Foo');
            console.log(vm.$options.filters)
            //console.log(route,redirect,next)
            if(route.params.name){
                vm.searchWord=route.params.name
                vm.searchPlayer(route.params.name)
            }
        });
        //alert('route chargee')
        //return next()
    }

    onLicenceError(){
        alert("Erreur de licence")
        this.dialog=false
    }
  mounted(){

  }
}

