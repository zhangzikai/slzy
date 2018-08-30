/**
 * 
 */
// @require @packageOverrides
Ext.Loader.setConfig({
    enabled: true
});


Ext.application({
    appFolder:hostPath+'/statistics/App',
    views: [
        'MyViewport'
    ],
    controllers: [
        'MyController'
    ],
    name: 'MyApp',

    launch: function() {
        Ext.create('MyApp.view.MyViewport');
    }

});
