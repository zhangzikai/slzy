/**
 * 
 */
Ext.define('MyApp.controller.MyController', {
    extend: 'Ext.app.Controller',
    views:[
           'MyApp.view.MyViewport'
        ],

        onViewportRender: function (component, eOpts) {
        	
        },

        init: function (application) {
	        //-------------------------------------------------------------
	        this.control({
	            "ViewportWidget":{
	            	render: this.onViewportRender
	            }
	        })
        }
});