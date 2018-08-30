/*
 * 系统工具 2013-12-20 11:25:16
 * */
//类 SystemTool
var SystemTool={
	//host:window.location.protocol+'//'+window.location.host+'/',//"http://192.168.0.132:8080",//配置系统服务器地址
	basePath:window.location.protocol+'//'+window.location.host+'/'+window.location.pathname.split('/')[1],//配置系统应用地址
//	wmsUrl:"http://106.3.37.57:8080/geoserver/wms",//地图服务地址
//	wfsUrl:"http://106.3.37.57:8080/geoserver/wfs",//数据查询服务地址
//	queryLayerStore:new Ext.data.ArrayStore({
//        fields: ['id','name','marker'],
//        data :[
//               ['kuergan_Hydrology','水文站','hydrology'],
//               ['kuergan_Rainfall','雨量站','rainfall'],
//               ['kuergan_level','水位站','level'],
//               ['kuergan_weather','气象站','weather'],
//               ['kuergan_power','电站','power'],
//               ['kuergan_Reservoir','水库','marker-flag-blue']
//         ]
//    }),
	/**
	*创建tab
	*id,title,html
	*/
	createTab:function(id,title,html){
		var tabPanel=Ext.getCmp('centerTab');
		var tab=Ext.getCmp(id);
			if(tab!=null){
				tabPanel.setActiveTab(id);
				return true;
			}else{
				tabPanel.add({
					id:id,
		            title: title,
		            iconCls: 'tabs',
		            html:html,
		            closable:true
		        }).show();
				return false;
			}
	},
	/**
	*删除tab
	*id
	*/
	deleteTab:function(id){
		var tabPanel=Ext.getCmp('tabsPanel');
		tabPanel.remove(id);
	},
	replaceAll:function(obj,str1,str2){       
      var result  = obj.replace(eval("/"+str1+"/gi"),str2);      
      return result;
    }
};
