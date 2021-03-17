<template>
  <div class="container">
  <p>Carga</p>
    <component v-bind="data" :is="componentInstance"  />
    <p>Fin {{ data.pathComponent }}</p>
  </div>
</template>

<script>
import {Drupal} from './../src/service/Drupal';
import {Hooks} from './../src/config/Hooks';
export default {
  async asyncData({ params, $http }) {
    let alias = params.pathMatch; 
    let destinationBasePath = Hooks.basegetapibasepath(params);
    let data = await Drupal.getData(alias, destinationBasePath); 
    Hooks.basegetserverprops(data);    
    return { data }    
  },
  computed: {
    componentInstance () {
      console.log(this.data.pathComponent);
      return () => import(`./../components/${this.data.pathComponent}`) 
    }
  },
   head() {
      let metatags = this.data.metatags
      return {
        title: metatags.title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: metatags.description
          }
        ]
      }
   }
}
</script>