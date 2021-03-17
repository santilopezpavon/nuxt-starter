import Config from './../config/Config'
const axios = require('axios');


export const Drupal= {
    getData: async function(alias, drupalBase) {        
        try {
            let aliasString =  alias;
            if (Array.isArray(alias)) {
                aliasString =  "/" + alias.join("/");
            }           
            let dataNode = await this.getNodeByAlias(aliasString, "bartik", drupalBase);
            let pathComponent = this.getComponent(dataNode); 
            let metatags = this.getMetatags(dataNode);
            return {
                "data": dataNode,
                "pathComponent": pathComponent,
                "metatags": metatags
            }; 
        } catch (error) {
            return {
                "data": {},
                "pathComponent": "page-404",
                "metatags": {
                    title: "Error 404",
                    description: ""
                }
            }
        }
        

        
    },
    getNodeByAlias: function(aliasString, theme, drupalBase) {
        
        let apiEndPoint = drupalBase + "node/alias?theme=" + theme;        
        let body = {
            "schema": {"display": "default"},
            "alias": aliasString
        };
        return axios.post(apiEndPoint, body)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            return error.message;
        });        
    },
    getComponent(data) {
        let currentData = this.getNodeInfo(data);
        let target_id = this.convertString(currentData.type[0].target_id);
        let target_type = this.convertString(currentData.type[0].target_type);
        return target_type + "" + target_id;
    },

    getMetatags(data) {
        let currentData = this.getNodeInfo(data);        
        let metatags = {
            "title": currentData.metatag.value.title,
            "description": currentData.metatag.value.description
        };
        return metatags;
    },

    getNodeInfo(data) {
        let currentData = data;
        if(data.data.hasOwnProperty("Content")) {
            currentData = data.data["Content"];
        } else {
            currentData = data.data;
        }
        return currentData;
    }, 
    convertString(text) {
        return text.charAt(0).toUpperCase() + text.slice(1).replace('_', '');
    }  
}