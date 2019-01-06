
import Vue from 'vue'
import * as _ from 'lodash'
let filters={
    'formatNumber':(value:any)=>{
        return Intl.NumberFormat('fr-fr',{maximumFractionDigits:1}).format(value)
    },
    'formatPoints':(value:any)=>{ 
        return value > 0 ? "+" + value : value;
    },
    'titleCase':(value:string)=>{
        return value.replace(
            /\w\S*/g,
            function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            })
    }
}
//_.map(filters,Vue.filter)
_.forEach(filters,(value,key)=>{
    Vue.filter(key,value)
})
export default filters


