import {Vue,Component, Prop,Model} from 'vue-property-decorator'
import Render from './index.html'
import PingModule, { PingStore } from '../../../../store/modules/ping';
import filters from '../../../../filters';
@Render
@Component({
    components:{ },
    filters:filters
})
export default class PlayerListeItem extends Vue{
    @Prop({required:true})
    player?:any

    get ping():PingStore{
        return PingModule
    }
    showJoueurDivider(joueur:any, index:number) {
       /* if (index > 0) {
            if (this.orderJoueur == 'byPoints') return joueur.classement != this.filtered[index - 1].classement;
            if (this.orderJoueur == 'byName') return this.filtered[index - 1].nom != joueur.nom;
            if (this.orderJoueur == 'byCategory') return this.filtered[index - 1].categorie != joueur.categorie;
        }*/
        return false;
    }
}