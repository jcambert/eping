
import {Vue,Component, Prop,Model, Watch} from 'vue-property-decorator'
import Render from './index.html'
import * as _ from 'lodash'
import PlayerListeItem from '../PlayerListeItem';
@Render
@Component({
    components:{ 
        PlayerListeItem:PlayerListeItem
    }
})
export default class PlayerListe extends Vue{
    @Prop({required:true})
    players?:Array<any>

    filter= ""
    filtered: Array<any>=[]
    orderJoueurChoices= {
        'byName': { 'fields': ['nom', 'prenom'], 'orders': ['asc', 'asc'] },
        'byPoints': { 'fields': ['point', 'nom', 'prenom'], 'orders': ['desc', 'asc', 'asc'] },
        'byCategorie': { 'fields': ['categorie', 'nom', 'prenom'], 'orders': ['desc', 'asc', 'asc'] }
    }
    orderJoueur= 'byName'


    @Watch('orderJoueur')
    onOrderjoueurChanged(val:string){
        console.log('order change')
    }

    
    get joueursFilter(){
        if(!this.players) return []
        if (this.filter == null) this.filter = "";
            console.dir(this.filter);
            if (this.filter == "") {
                console.log("restore filter");
                this.filtered = this.players;
            } else
                if (_.isFinite(parseInt(this.filter))) {
                    console.log("classe filter");
                    this.filtered = this.players.filter(joueur => { return joueur.classement == parseInt(this.filter); });
                } else {
                    console.log("name filter");
                    this.filtered = this.players.filter(joueur => { return joueur.nom.toLowerCase().match(this.filter.toLowerCase()); });
                    console.dir(this.filtered);
                }
            this.filtered = _.orderBy(this.filtered, this.orderJoueurChoices[this.orderJoueur].fields, this.orderJoueurChoices[this.orderJoueur].orders);
            return this.filtered;
    }
}