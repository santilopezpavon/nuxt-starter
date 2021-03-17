<template>
    <p>Nombre {{normalizedNode.node.title[0]}}</p>
</template>

<script>
    import {Drupal} from './../src/service/Drupal'
    export default {
        name: 'NodetypeArticle',
        props: ["data"],
        computed: {
            normalizedNode: function () {
                const node = Drupal.getNodeInfo(this.data);
                return {
                    "node": node
                };
            }
        }
        
    }
</script>
