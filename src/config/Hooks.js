import Config from './Config'

export const Hooks = {
    basegetserverprops: function (baseProps) {
        // Change Base Props.
       // baseProps["cualquiercosa"] = "hola";
    },
    basegetapibasepath: function (context) {
        return Config.drupal;
    }
}