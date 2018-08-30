Ext.define('MyApp.controller.MainController', {
    extend: 'Ext.app.Controller',
    views:[
           'MyApp.view.MyViewport'
        ],

        onViewportRender: function (component, eOpts) {
        	OpenLayers.ProxyHost = "cgi/proxy.cgi?url=";

        	var zttName = GetQueryString('zttName');
        	var url = GetQueryString('url');
        	var layer = GetQueryString('layer');
        	component.down('label[name="title"]').setText(zttName);
        	Ext.get('zttTitle').dom.innerText = zttName;
        	map2d.init2dMap(url,layer);
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

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  decodeURI(r[2]); return null;
}
 
