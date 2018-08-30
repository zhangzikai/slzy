<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>下坂地建管局水资源管理系统</title> 
    <%@ include file="../common/taglibs.jsp" %>
	<style type="text/css">
	html,body {
		font: normal 12px verdana;
		font-family: "Microsoft YaHei" ! important;
		margin: 0;
		padding: 0;
		border: 0 none;
		overflow: hidden;
		height: 100%;
	}
	
	p {
		margin: 5px;
	}
	.menu_iframe{position:absolute;top:0px;left:0px;z-index:-1;filter: Alpha(Opacity=0);background-color:transparent} 
	</style>
	<link rel="stylesheet" href="${ctx}/v4/tsss/themeswitcher.css" type="text/css"></link>
	<link rel="stylesheet" href="${ctx}/js/openLayers/theme/default/style.css" type="text/css" />
	<link rel="stylesheet" href="${ctx}/js/zTree_v3/css/zTreeStyle/zTreeStyle.css" type="text/css">
	<script type="text/javascript" src="${ctx}/js/zTree_v3/js/jquery-1.4.4.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/zTree_v3/js/jquery.ztree.core-3.5.js"></script>
	<script type="text/javascript" src="${ctx}/js/zTree_v3/js/jquery.ztree.excheck-3.5.js"></script>
	<script type="text/javascript" src="${ctx}/js/base.js"></script>
	<script type="text/javascript" src="${ctx}/js/index.js"></script>
	<script type="text/javascript" src="${ctx}/js/systemTool.js"></script>
	<script type="text/javascript" src="${ctx}/js/systemManageTool.js"></script>
	<script type="text/javascript" src="${ctx}/js/queryTool.js"></script>
	<script type="text/javascript" src="${ctx}/js/flyLineManageTool.js"></script>
	<script type="text/javascript" src="${ctx}/js/layerTool.js"></script>
	<script type="text/javascript" src="${ctx}/js/labelTool.js"></script>
	<script type="text/javascript" src="${ctx}/js/spatialAnalyseTool.js"></script>
	<script type="text/javascript" src="${ctx}/js/viewControlTool.js"></script>
	<script type="text/javascript" src="${ctx}/js/dataLoadTool.js"></script>
	<script type="text/javascript" src="${ctx}/js/themePicTool.js"></script>
	<script type="text/javascript" src="${ctx}/js/sysManage/userManager.js"></script>
	<script type="text/javascript" src="${ctx}/js/sysManage/roleManager.js"></script>
	<script type="text/javascript" src="${ctx}/js/sysManage/moduleManager.js"></script>
	<script type="text/javascript" src="${ctx}/js/sysManage/logManager.js"></script>
	<script type="text/javascript" src="${ctx}/js/2d/tool.js"></script>
	<script type="text/javascript">
	
	Ext.onReady(function() {
		//调整球高整
		document.getElementById("wwjAppletIframe").style.height=(document.body.clientHeight-125)+"px";
		document.getElementById("2dMap").style.height=(document.body.clientHeight-125)+"px";
		document.getElementById("2dMap").style.width=document.body.clientWidth+"px";
		var bodyHeight=document.body.clientHeight,bodyWidth=document.body.clientWidth;
		Ext.useShims = true;
		OpenLayers.ProxyHost = "../cgi/proxy.cgi?url=";
		Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
		//Ext.QuickTips.init();   // 
		
		var weekDayLabels = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");
		var now = new Date();
	    var year=now.getFullYear();
		var month=now.getMonth()+1;
		var day=now.getDate();
	    var currentime = year+"年"+month+"月"+day+"日 <br/>"+weekDayLabels[now.getDay()];
	    document.getElementById("userInfo").innerHTML=document.getElementById("userInfo").innerHTML+"<br/>"+currentime;
	    
	    SystemTool.queryLayerStore.each(function(record) {   
     		$("#layerName").append("<option value='"+record.get('id')+"'>"+record.get('name')+"</option>");  
  		});  
	    
	    
	    var setting = {
			check: {
				enable: true
			},
			data: {
				simpleData: {
					enable: true
				}
			},
			callback: {
				onCheck: onCheck
			}
		};

		var zNodes =[
			{id:1,pId:0, name:"影像图层",text:"imageLayer",open:true},
			{id:11,pId:1, name:"水库",text:"xbdreservoir",checked:true},
			{id:12,pId:1, name:"影像2",text:"xiabandidom"},
			{id:13,pId:1, name:"影像3",text:"image3"},
			{id:14,pId:1, name:"影像4",text:"image4"},
			{id:2, pId:0, name:"行政区划图层",text:"districtLayer",open:true},
			{id:21, pId:2, name:"县界",text:"kuergan_County"},
			{id:22, pId:2, name:"乡镇",text:"kuergan_town"},
			{id:23, pId:2, name:"村庄",text:"kuergan_village"},
			{id:24, pId:2, name:"道路",text:"kuergan_road"},
			{id:25, pId:2, name:"河流",text:"kuergan_water",checked:true},
			{id:3, pId:0, name:"业务图层",text:"businessLayer"},
			{id:31, pId:3, name:"水文站",text:"kuergan_Hydrology"},
			{id:32, pId:3, name:"雨量站",text:"kuergan_Rainfall"},
			{id:34, pId:3, name:"水位站",text:"kuergan_level"},
			{id:35, pId:3, name:"气象站",text:"kuergan_weather"},
			{id:36, pId:3, name:"电站",text:"kuergan_power"},
			{id:37, pId:3, name:"下板地水库",text:"kuergan_Reservoir"},
			{id:4, pId:0, name:"模型图层",text:"model_layer",checked:true,open:true},
			{id:41, pId:4, name:"水坝",text:"daba",checked:true},
			{id:42, pId:4, name:"水库",text:"aa"}
		];
		$.fn.zTree.init($("#layerTree"), setting, zNodes);
		init2DMap();
	});
	
	function onCheck(e, treeId, treeNode) {
		if(treeNode.getParentNode()!=null){
			if(treeNode.getParentNode().text=="businessLayer"){
				QueryTool.doMarker(treeNode.text,SystemTool.queryLayerStore.query("id",treeNode.text,false).first().get("marker"),treeNode.checked);
			}else{
				LayerTool.layerSwitch(treeNode.getParentNode().text,treeNode.text,treeNode.checked);
			}
		}else{
			if(treeNode.text=="businessLayer"){
				if(treeNode.checked){
					for(var obj in treeNode.children){
						QueryTool.doMarker(treeNode.children[obj].text,SystemTool.queryLayerStore.query("id",treeNode.children[obj].text,false).first().get("marker"),treeNode.checked);
					}
				}else{
					removeAllMarkers();
				}
			}else{
				for(var obj in treeNode.children){
					LayerTool.layerSwitch(treeNode.text,treeNode.children[obj].text,treeNode.checked);
				}
			}
			
		}
	}
		
	function onPageLoad(){
        //获取applet
        /* getWWJApplet(); 
        //使用前先创建，为的是初始化的时候不用加载全部new出来，用到在new，下面的都同理
        createQueryTool();
        createMeasureTool(); 
        createMarkerTool();
        createDrawTool();
      	//createKmlFiles();
      	createShpFiles();
      	createModelTool();
        createWindowOption();
        createAirspaceTool();
        createWorldModel();
        createAnalyseTool();
        ViewControlTool.elementToggle(8,false);
        ViewControlTool.elementToggle(9,false);
        flyToTime(37.81210,75.44671,24000,100,70,10000,10000);
        document.getElementById("wwjAppletIframe").contentWindow.document.body.style.height=(document.body.clientHeight-125)+"px"; */
     }
     
     function logout(){
     	var bln=confirm("您确认要退出下坂地建管局水资源管理系统?");
            if (bln==true){
            	window.location="${ctx}/logout.jhtml";
            }  
     }
     
     /**
	 * 判断当前用户是否具有当前应用模块的操作权限
	 * modelId 当前应用模块代码
	 */
	 function hasPermission(modelId){
		var user=Ext.decode('${sessionScope.sessionUser}');
		var flag = false;
		if(user.role){
			if(user.role.modules){
				var modules = user.role.modules;
				for(var i = 0; i < modules.length; i++) {
					if(modelId == modules[i].scn){
						flag = true;
						break;
					}else{
						flag = false;
					}
				}
			}
		}
		return flag;
	}
	
	
	function showLeftMenu(id){
		$("#queryDiv").hide();
		$("#layerDiv").hide();
		$("#spatialAnalyseDiv").hide();
		$("#infoDiv").hide();
		$("#systemManageDiv").hide();
		$("#leftMenuIframe").show();
		$("#leftMenuDiv").show();
		$("#"+id).show();
	}
	
	function showBottomMenu(id){
		$("#ZTGCDiv").hide();
		$("#ZBDWDiv").hide();
		$("#LXLLDiv").hide();
		$("#DXKZDiv").hide();
		if(id!=""){
			$("#"+id).show();
		}
		
	}
	var statusLayer=true;
	function toggleLayer(layerName){
		if(statusLayer){
			statusLayer=false;
		}else{
			statusLayer=true;
		}
		setWMSLayerIsEnabled(layerName,statusLayer);
	}
	function clearMap(){
		removeAllMarkers();//标注的图层
		removeAllAnnotation();//小冒泡图层
		removeAllKml();//KML文件加载的图层
		removeAllShp();//shp文件加载的图层
		removedAllShape();//绘画的图层
		clearQuery();
		$("#resultTable").html("");
		IndexTool.stopAllTool();//结束所有分析工具
	}
	var isScreen=true;
	function screen(){
		if(isScreen){
			isScreen=false;
			$("#topDiv").hide();
			$("#bottomDiv").hide();
			document.getElementById("topLeftMenuDiv").style.top="0px";
			document.getElementById("wwjAppletIframe").style.height=document.body.clientHeight+"px";
			document.getElementById("wwjAppletIframe").contentWindow.document.body.style.height=document.body.clientHeight+"px";
		}else{
			isScreen=true;
			$("#topDiv").show();
			$("#bottomDiv").show();
			document.getElementById("topLeftMenuDiv").style.top="85px";
			document.getElementById("wwjAppletIframe").style.height=(document.body.clientHeight-125)+"px";
			document.getElementById("wwjAppletIframe").contentWindow.document.body.style.height=(document.body.clientHeight-125)+"px";
		}
	}
	
	function query(){
		var layerName=$("#layerName").val();
		var keyWord=$("#keyWord").val();
		if(layerName==""){
			Ext.Msg.alert("系统提示","请选择'图层'!");
			return ;
		}
		if(keyWord=="请输入..."){
			keyWord="";
		}
		var points=stopQueryTool();
		QueryTool.doQuery(layerName,keyWord,points);
	}
	
	function startSightAnalyse1(){
		var startHeight1=$("#startHeight1").val();
		var endHeight1=$("#endHeight1").val();
		if(startHeight1==""){
			Ext.Msg.alert("系统提示","请选择'起始高度'!");
			return ;
		}
		if(endHeight1==""){
			Ext.Msg.alert("系统提示","请选择'目标高度'!");
			return ;
		}
		IndexTool.stopAllTool();
		startSightAnalyse(startHeight1,endHeight1);
	}
	
	function startWaterFloodAnalyse1(){
		var waterLevel1=$("#waterLevel1").val();
		if(waterLevel1==""){
			Ext.Msg.alert("系统提示","请选择'水位'!");
			return ;
		}
		IndexTool.stopAllTool();
		$("#areaLabel").val("0.00米²");
		$("#volumeLabel").val("0.00米³");
     	startWaterFloodAnalyse(2900,waterLevel1);
	}
	
	function startTerrainAnalyse1(){
		var followType=$("#followType").val();
		var graphSize=$("#graphSize").val();
		IndexTool.stopAllTool();
		startTerrainAnalyse(followType,graphSize);
	}
	
	function startFluctuateAnalyse1(){
		var startFluctuateWaterLevel=$("#startFluctuateWaterLevel").val();
		var endfluctuateWaterLevel=$("#endfluctuateWaterLevel").val();
		if(startFluctuateWaterLevel==""){
			Ext.Msg.alert("系统提示","请选择'落水位'!");
			return ;
		}
		if(endfluctuateWaterLevel==""){
			Ext.Msg.alert("系统提示","请选择'涨水位'!");
			return ;
		}
		$("#fluctuateAreaLabel").val("0.00米²");
		IndexTool.stopAllTool();
		startFluctuateAnalyse(startFluctuateWaterLevel,endfluctuateWaterLevel);
	}
	
	function doLocation(){
		var lat=$("#lat").val();
		var lon=$("#lon").val();
		if(lat==""){
			Ext.Msg.alert("系统提示","请选择'纬度'!");
			return ;
		}
		if(lon==""){
			Ext.Msg.alert("系统提示","请选择'经度'!");
			return ;
		}
		deleteMarker("doLocationId");
		addMarker(lat,lon,SystemTool.basePath+"/images/marker/marker-red.png","","doLocationId");
		flyTo(lat,lon);
	}
	function startDigFillAnalyse1(){
		var digFillDepth=$("#digFillDepth").val();
		if(digFillDepth==""){
			Ext.Msg.alert("系统提示","请选择'挖填深度'!");
			return ;
		}
		$("#digLabel").val("0.0 米³");
		$("#fillLabel").val("0.0 米³");
		$("#digFillLabel").val("0.0 米³");
		IndexTool.stopAllTool();
		startDigFillAnalyse(digFillDepth);
	}

	function showAnalysisForm(id){
		IndexTool.stopAllTool();
		$("#spatialAnalysis").hide();
		$("#waterFloodAnalyse").hide();
		$("#slopeAnalyse").hide();
		$("#digFillAnalyse").hide();
		$("#terrainAnalyse").hide();
		$("#fluctuateAnalyse").hide();
		$("#"+id).show();
	}
	
	function toggleDiv(id){
		 $("#"+id).toggle();
	}
	
	function toggleImg(obj){
		if(obj.src.indexOf("EWXS")>0){
			obj.src=obj.src.replace("EWXS","SWXS"); 
			obj.title="三维显示";
		}else{
			obj.src=obj.src.replace("SWXS","EWXS"); 
			obj.title="二维显示";
		}
	}
	
	function toggleIndex(){
		toggleDiv('indexDiv');
		toggleDiv('leftMenu');
		toggleDiv('bottomMenuDiv');
		toggleDiv('wwjAppletIframe');
		$("#2dMap").hide();
		toggleDiv('topLeftMenuDiv');
	}
	
	function outputMap(){
		var pwdWin = new Ext.Window({
			title:'输出地图',
			height:120,
			width:350,
			iconCls:'edit-icon',
			constrain:false,
			modal:false,
			resizable:false,
			closeAction:'close',
			bodyStyle:'background-color:white;',
			listeners:{
				close:function(){pwdWin.destroy();pwdWin = null;}
			},
			items:[new Ext.FormPanel({
					 id:"itemForm",
                     renderTo: Ext.getBody(),
                   	 frame: true,
                   	 height: 'auto',
           			 width:400,
           			 buttonAlign:"center",
                     labelWidth: 100,
                         items: [
              				{id:"fileName",xtype:'textfield',fieldLabel:"文件名",allowBlank:false,blankText:'文件名不能为空'},
           		 			{
                             	layout:'column', 
               					width:700,
                             	items:[{
                                	columnWidth:0.35,
                                  	layout: 'form',
                                  	items: [{
                                    	xtype:'textfield',
                                      	fieldLabel: '保存目录',
                                      	id:'savePath',
                                      	allowBlank : false,
        								blankText : '保存目录不能为空'
                                  	}]
                              	},{
                                  	columnWidth:0.65,
                                  	layout: 'form',
                                  	items: [
                                   		new Ext.Button({
                                    		text:'...浏览',
                                    		handler:function(){
                                		 		browseFolder();
                                    		}        
                                   	})
                                  ]
                              }
                             ]//column->items
                         }
             		]//最大的ITEMS
                })],
			bbar:['->',{
				text:'输出',
				iconCls:'accept-icon',
				handler:function(){
					if(!Ext.getCmp('itemForm').getForm().isValid()){return;}
					var fileName = Ext.getCmp('fileName').getValue();
					var savePath =Ext.getCmp('savePath').getValue();
					var filePath=savePath+fileName+".jpg";
					screenShot(filePath);
					Ext.Msg.alert("系统提示","图片已经保存地址:\""+filePath+"\"!");
				}
			},'-',{text:'重置',iconCls:'reset-icon',handler:function(){Ext.getCmp('itemForm').getForm().reset();}},
			'-',{text:'取消',iconCls:'cancel-icon',handler:function(){pwdWin.close();}
			}]
		});
		pwdWin.show();
	}
	function browseFolder() {
    try {
        var Message = "\u8bf7\u9009\u62e9\u6587\u4ef6\u5939"; //选择框提示信息
        var Shell = new ActiveXObject("Shell.Application");
        var Folder = Shell.BrowseForFolder(0, Message, 64, 17); //起始目录为：我的电脑
        //var Folder = Shell.BrowseForFolder(0, Message, 0); //起始目录为：桌面
        if (Folder != null) {
            Folder = Folder.items(); // 返回 FolderItems 对象
            Folder = Folder.item(); // 返回 Folderitem 对象
            Folder = Folder.Path; // 返回路径
            if (Folder.charAt(Folder.length - 1) != "\\") {
                Folder = Folder + "\\";
            }
            Ext.getCmp('savePath').setValue(Folder);
            return Folder;
        }
    }
    catch (e) {
        Ext.Msg.alert("系统提示",e.message+"1. 单击菜单工具->Internet选项->安全->受信任站点->站点->把此网站设为可信站点2. 在自定义级别->对没有标记为安全的ActiveX控件进行初始化和脚本运行----启用");
    }
}
	function openReservoirVolume(){
		IndexTool.stopAllTool();
		var store = new Ext.data.JsonStore({
			        fields:['waterLevel', 'reservoirVolume', 'views'],
			        data: [
			            {waterLevel:437, reservoirVolume: 0, views: 400},
			            {waterLevel:442, reservoirVolume: 0.44385, views: 400},
			            {waterLevel:447, reservoirVolume: 1.7467075, views: 400},
			            {waterLevel:452, reservoirVolume: 5.2819525, views: 400},
			            {waterLevel:457, reservoirVolume: 12.9353, views: 400},
			            {waterLevel:462, reservoirVolume: 25.8792575, views: 400},
			            {waterLevel:467, reservoirVolume: 44.720385, views: 400},
			            {waterLevel:472, reservoirVolume: 69.08271, views: 400},
			            {waterLevel:477, reservoirVolume: 98.6913275, views: 400},
			            {waterLevel:482, reservoirVolume: 135.49361, views: 400},
			            {waterLevel:487, reservoirVolume: 181.30065, views: 490}
			        ]
			    });
		var	reservoirVolumeWin = new Ext.Window({
			id:"reservoirVolumeWin",
			height:350,
			width:500,
			title : '&nbsp;水位库容专题图(水位--库容曲线) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
			iconCls:"role",
			constrain:true,
			modal:true,
			resizable:false,
			renderTo: document.body,
			closeAction:'close',
			bodyStyle:'background-color:white;',
			listeners:{close:function(){reservoirVolumeWin.destroy();reservoirVolumeWin = null;}},
			layout:'fit',
			items:[new Ext.Panel({
				        frame:true,
				        items: {
				            xtype: 'linechart',
				            store: store,
				            url: SystemTool.basePath+'/extjs3/resources/charts.swf',
				            xField: 'reservoirVolume',
				            yField: 'waterLevel',
				            xAxis: new Ext.chart.NumericAxis({
				            	title:'库容(万立方米)',
								minimum:0,
								maximum:200,
								majorUnit:20
				            }),
							yAxis: new Ext.chart.NumericAxis({
								title:'水位(米)',
								minimum:430,
								maximum:490
				            }),
				            tipRenderer : function(chart, record){
								return String.format('水位:{0} 米\n库容:{1} 万立方米',record.data.waterLevel,record.data.reservoirVolume); 
				            }
				        }
				    })
			    ]
		});
		reservoirVolumeWin.show();
	}
	/**
		 * 显示监测站信息
		 * @param obj
		 */
	function openInfo(name){
		var data = [
		            ['达布达尔','08-21 06:00','141.18','139.70','1.48','正常'],
		            ['伊尔列黑','08-21 06:00','148.18','147.00','1.16','正常'],
		            ['坝下','08-21 06:00','145.39','144.60','0.79','正常']
		       ];
		var ds=new Ext.data.Store({
	  	     	 data:data,
		  	     reader: new Ext.data.ArrayReader({}, [
		  	        {name: 'id',mapping: 0},
		  	         {name: 'sex',mapping: 1},
		  	         {name: 'name',mapping: 2},
		  	         {name: 'descn',mapping: 3},
		  	         {name: 'descn1',mapping: 4},
		  	         {name: 'state',mapping: 5}
		  	     ])
	  		});
			var winInfo = new Ext.Window({
					title:name+'---信息窗口',
					height:350,
					width:500,
					iconCls:'edit-icon',
					constrain:true,
					modal:true,
					resizable:false,
					closeAction:'close',
					listeners:{
						close:function(){winInfo.destroy();winInfo= null;}
					},
					items:[{  
                 			layout:'form',
                 			items:[{  
		                        xtype:'container',
		                        layout:'hbox',
		                        items:[{  
	                            	xtype:'container',
	                            	layout:'form',
	                            	items:[{  
	                                      xtype:'textfield',
	                                      fieldLabel:'名称',
	                                      id:'name',
	                                      width:140
                                 	},{  
                                 		fieldLabel:'开始时间',
										editable:false,
										id:"startTime",
										xtype:'datetimefield',
										format:'Y-m-d H:i:s',
										width:140
                                 	}]  
								},{  
                            		xtype:'container',
                            		layout:'form',
                            		items:[{
				                    	xtype:'combo',
										id:'state',
										fieldLabel:'水位情况',
									    triggerAction: 'all',
									    lazyRender:true,
									    mode: 'local',
									    emptyText:'全部',
									    width:140,
									    editable:false,
									    store: new Ext.data.ArrayStore({
									        fields: ['key','value'],
									        data: [['升高', '升高'],['下降', '下降'],['正常', '正常']]
									    }),
									    valueField: 'value',
									    displayField: 'key'
				                    },{  
                                 		fieldLabel:'结束时间',
										editable:false,
										id:"endTime",
										xtype:'datetimefield',
										format:'Y-m-d H:i:s',
										width:140
                                 	}]  
                        		}  
                    	]  
                    },{  
                          xtype:'container',
                          layout:'hbox',  
//                        ,layoutConfig: {  //也可以使用，但在这用处不大  
//                              align : 'middle'   
//                              ,pack  : 'end'   
//                        }  
                         items:[  
                                {  
                               		xtype:'spacer',
                                	width:300  
                                },{  
                                    xtype:'button',
                                    text:'搜索',
                                    width:70,
                                    handler:function(){ds.reload();},
                                    scope:this  
                                },{  
                                	xtype:'box',
                                	width:10  
                                },{  
                                    xtype:'button',
                                    text:'重置',
                                    width:80,
                                    handler:function(){
										Ext.getCmp('name').setValue("");
										Ext.getCmp('state').setValue("");
										Ext.getCmp('startTime').setValue("");
										Ext.getCmp('endTime').setValue("");
									},
                                    scope:this  
                                }  
                         ]  
                    }  
                ]  
        },new Ext.grid.GridPanel({
							  	height: 300,
							  	width: 500,
							  	region: 'center',
							  	split: true,
							  	border: false,
							  	store: ds,
							  	cm:new Ext.grid.ColumnModel([
			  	                         {header:'站名',dataIndex:'id',width:100},
			  	                         {header:'日期',dataIndex:'sex',width:90},
			  	                         {header:'水位(m)',dataIndex:'name',width:80},
			  	                         {header:'警戒水位(m)',dataIndex:'descn',width:80},
			  	                         {header:'超警戒水位(m)',dataIndex:'descn1',width:80},
			  	                         {header:'状态',dataIndex:'state',width:60}
							  	  ])
						  	})],
					bbar:['->',{text:'确定',iconCls:'accept-icon',handler:function(){IndexTool.win.close();obj.setValue(false);}},
					'-',{text:'导出',iconCls:'excel-icon',handler:function(){ds.reload();}},
					'-',{text:'刷新',iconCls:'refresh-icon',handler:function(){ds.reload();}},
					'-',{text:'取消',iconCls:'cancel-icon',handler:function(){IndexTool.win.close();obj.setValue(false);}
					}]
				});
				winInfo.show();
		}
	
	function flyById(id){
		$.post(SystemTool.basePath+"/flyLine.jhtml?method=get",{id:id},function (record){
			quitFly();
			startFly(record.flyLine.line,record.flyLine.elevation,record.flyLine.pitch,record.flyLine.flyspeed);
		},"json"); 
	
	}
	
	//div拖动
		var mouseX, mouseY;  
        var objX, objY;  
        var isDowm = false;  //是否按下鼠标  
        function mouseDown(obj, e) {  
            obj.style.cursor = "move";  
            objX = obj.style.left;  
            objY = obj.style.top;  
            mouseX = e.clientX;  
            mouseY = e.clientY;  
            isDowm = true;  
        }  
        function mouseMove(obj,e) {  
            var x = e.clientX;  
            var y = e.clientY;  
            if (isDowm) {  
                obj.style.left = parseInt(objX) + parseInt(x) - parseInt(mouseX) + "px";  
                obj.style.top = parseInt(objY) + parseInt(y) - parseInt(mouseY) + "px";  
            }  
        }  
        function mouseUp(obj,e) {  
            if (isDowm) {  
                var x = e.clientX;  
                var y = e.clientY;  
                obj.style.left = (parseInt(x) - parseInt(mouseX) + parseInt(objX)) + "px";  
                obj.style.top = (parseInt(y) - parseInt(mouseY) + parseInt(objY)) + "px";  
                mouseX = x;  
                rewmouseY = y;  
                obj.style.cursor = "default";  
                isDowm = false;  
            }  
        }  

</script>
<body>
	<div id="topDiv" class="top" align="right">
       <img src="${ctx}/v4/imager/banner.jpg" style="border:0;"/>
       <img src="${ctx}/v4/imager/banner2.png" style="cursor:pointer;z-index:600; top:0;;position:absolute; left:0px;"/>
	   <span onclick="toggleIndex();" style="text-align:center;cursor:pointer;z-index:1000; position:absolute; right:376px; top:10px; width: 68px; height: 61px;font-size:16px;">
	   		<img src="${ctx}/v4/imager/index.png"/><div style="font:楷体; font-size:15px;font-weight:bold;color:#FFFFFF">首页</div>
	   </span>
	   <span onClick="showMenu('layerManage','帮助');" style="text-align:center;cursor:pointer;z-index:1000; position:absolute; right:298px; top:10px; width: 68px; height: 61px;font-size:16px;">
	   		<img src="${ctx}/v4/imager/help.png"/><div style="font:楷体;font-size:15px;font-weight:bold;color:#FFFFFF">帮助</div>
	   </span>
	    <span onClick="logout();" style="text-align:center;cursor:pointer;z-index:1000; position:absolute; right:220px; top:10px; width: 68px; height: 61px;font-size:16px;">
			<img src="${ctx}/v4/imager/logout.png"/><div style="font:楷体; font-size:15px;font-weight:bold;color:#FFFFFF">退出</div>
		</span>
		<span id="userInfo" style="text-align:center;cursor:pointer;z-index:1000; position:absolute; right:20px; top:5px; width:150px; height: 61px;font-size:16px;color:#336699;">
			 ${userName}
		</span>
	</div>
	
	<div class="topLeftMenu" id="topLeftMenuDiv">
		<iframe id="menuIframe" class="menu_iframe" height="28px" width="162px" frameborder="0"></iframe>
		<img src="${ctx}/v4/imager/ZTT.png" data-nr="1" title="专题图" onclick="ThemePicTool.show(0);"/>
		<img src="${ctx}/v4/imager/EWXS.png" data-nr="1" title="二维地图" onclick="toggleImg(this);toggleDiv('leftMenu');toggleDiv('bottomMenuDiv');toggleDiv('wwjAppletIframe');toggleDiv('2dMap');"/>
	</div>
	
	<iframe id='wwjAppletIframe' style="display:none;text-align:center;" style="z-index:0" name='wwjAppletIframe' width='100%' frameborder='0' src='applet.jsp' scrolling="no"></iframe>
	<div id="2dMap" ></div>
	<div id="indexDiv" style="display:none;text-align:center;">
		<img src="${ctx}/v4/imager/index.jpg" width="1024" title="管理范围示意图"/>
	</div>
	
	<div class="menu-div" id="leftMenuDiv" style="top:250px;left:150px;"  onmousedown="mouseDown(this,event)" onmousemove="mouseMove(this,event)" onmouseup="mouseUp(this,event)">
		<iframe id="leftMenuIframe" class="menu_iframe" style="display:none;" height="372px" width="192px" frameborder="0"></iframe>
		<div id="queryDiv" class="menu-span">
			<div class="menu-span-div">查询<img src="${ctx}/v4/imager/X1.png" style="margin-left:130px;" onclick="toggleDiv('leftMenuDiv');"/></div>
			<div class="analyst2" style="text-align:center ">
	  			<table border="0" style="font-size: 14px;">
					<tr><td width="40%">图   层:</td>
						<td>
							<select id="layerName" style="width:100px;">
								<option value="">请选择</option>
							</select>
						</td></tr>
					<tr><td>关键字:</td><td><input id="keyWord" type="text" value="请输入..." style="width:100px;"/></td></tr>
					<tr><td colspan="2" align="center">
						<img src="${ctx}/v4/imager/tool/circle.png" onclick="startDrawShape('Circle');" style="cursor:pointer;" data-nr="1" title="画圆"/>
						<img src="${ctx}/v4/imager/tool/polygon.png" onclick="startDrawShape('Polygon');" style="cursor:pointer;" data-nr="1" title="画多边形"/>
						<img src="${ctx}/v4/imager/tool/rectangle.png" onclick="startDrawShape('Rectangle');" style="cursor:pointer;" data-nr="1" title="画矩形"/>
						<img src="${ctx}/v4/imager/tool/delete.png" onclick="clearMap();" style="cursor:pointer;" data-nr="1" title="清除"/>
						</td>
					</tr>
					<tr><td align="right"><input type="checkbox"/>详细:</td><td align="center"><button onclick="query();">搜索</button></td></tr>
				</table>
	  		</div>
			<div class="analyst2" style="text-align:center;height:230px">
				<table border="0" style="font-size: 14px;">
					<tr><td colspan="2" align="left">搜索结果:</td></tr>
				</table>
	  			<table border="0" class="resultTable" id="resultTable">
				</table>
	  		</div>
		</div>
		<div id="layerDiv" class="menu-span">
			<div class="menu-span-div">图层控制<img src="${ctx}/v4/imager/X1.png" onclick="toggleDiv('leftMenuDiv');"/></div>
			<div class="analyst2" style="height:330px;overflow-y:auto;">
				<ul id="layerTree" class="ztree"></ul>
			</div>
		</div>
		<div id="spatialAnalyseDiv" class="menu-span">
			<div class="menu-span-div">空间分析<img src="${ctx}/v4/imager/X1.png" onclick="toggleDiv('leftMenuDiv');"/></div>
			<div class="analyst2">
	  			<span class="blackc" title="地表距离 &nbsp;&nbsp;&nbsp;&nbsp;提示:左击开始,右击结束"><img src="${ctx}/v4/imager/DBJL.png" width="42" height="42" onclick="IndexTool.stopAllTool();startMeasureDistance('0');"/></span>
	  			<span class="blackc" title="地表面积&nbsp;&nbsp;&nbsp;&nbsp;提示:左击开始,右击结束"><img src="${ctx}/v4/imager/DBMJ.png" width="42" height="42" onclick="IndexTool.stopAllTool();startMeasureArea('0');"/></span>
	  			<span class="blackc" title="空间高度&nbsp;&nbsp;&nbsp;&nbsp;提示:左击开始,右击结束"><img src="${ctx}/v4/imager/KJGD.png" width="42" height="42" onclick="IndexTool.stopAllTool();startMeasureHeight();"/></span>
	  			<span class="blackc" title="空间距离&nbsp;&nbsp;&nbsp;&nbsp;提示:左击开始,右击结束"><img src="${ctx}/v4/imager/KJJL.png" width="42" height="42" onclick="IndexTool.stopAllTool();startMeasureDistance('1');"/></span>
	 			<span class="blackc" title="平面面积&nbsp;&nbsp;&nbsp;&nbsp;提示:左击开始,右击结束"><img src="${ctx}/v4/imager/PMMJ.png" width="42" height="42" onclick="IndexTool.stopAllTool();startMeasureArea('1');"/></span>
	 			<span class="blackc" title="水平距离&nbsp;&nbsp;&nbsp;&nbsp;提示:左击开始,右击结束"><img src="${ctx}/v4/imager/SPJL.png" width="42" height="42" onclick="IndexTool.stopAllTool();startMeasureDistance('2');"/></span>
	 			<span class="blackc" title="测量体积&nbsp;&nbsp;&nbsp;&nbsp;提示:左击开始,右击结束"><img src="${ctx}/v4/imager/TJCL.png" width="42" height="42" onclick="IndexTool.stopAllTool();startMeasureVolume();"/></span>
	 			<img src="${ctx}/v4/imager/hyaline.png" width="42" height="42" /></div>
	  		<div class="analyst2">
	  			<span class="blackc" title="通视分析"><img src="${ctx}/v4/imager/TSFX.png" width="42" height="42" onclick="showAnalysisForm('spatialAnalysis');"/></span>
	  			<span class="blackc" title="水淹分析"><img src="${ctx}/v4/imager/SYFX.png" width="42" height="42" onclick="showAnalysisForm('waterFloodAnalyse');"/></span>
	  			<span class="blackc" title="坡度坡向分析"><img src="${ctx}/v4/imager/PDPX.png" width="42" height="42" onclick="showAnalysisForm('slopeAnalyse');"/></span>
	  			<span class="blackc" title="水位库容分析"><img src="${ctx}/v4/imager/SWKRFX.png" width="42" height="42" onclick="openReservoirVolume();"/></span>
	  			<span class="blackc" title="挖填方分析"><img src="${ctx}/v4/imager/WTFFX.png" width="42" height="42" onclick="showAnalysisForm('digFillAnalyse');"/></span>
	  			<span class="blackc" title="剖面分析"><img src="${ctx}/v4/imager/PMFX.png" width="42" height="42" onclick="showAnalysisForm('terrainAnalyse');"/></span>
	  			<span class="blackc" title="消落区分析"><img src="${ctx}/v4/imager/XLQFX.png" width="42" height="42" onclick="showAnalysisForm('fluctuateAnalyse');"/></span>
	  			<img src="${ctx}/v4/imager/hyaline.png" width="42" height="42" />
	  		</div>
	  		
	  		<div class="analyst2" style="text-align:center;height:130px">
	  			<table id="spatialAnalysis" border="0" style="font-size: 14px;">
	  				<tr><td colspan="2" align="left" style="font-weight:700;">通视分析</td></tr>
					<tr><td width="40%">起始高度:</td><td><input id="startHeight1" type="text" value="20" style="width:80px;"/>米</td></tr>
					<tr><td>目标高度:</td><td><input id="endHeight1" type="text" value="50" style="width:80px;"/>米</td></tr>
					<tr><td align="center"><button onclick="startSightAnalyse1();">开始分析</button></td><td align="center"><button onclick="stopSightAnalyse();">结束分析</button></td></tr>
				</table>
				<table id="waterFloodAnalyse" border="0" style="font-size: 14px;display:none;">
	  				<tr><td colspan="2" align="left" style="font-weight:700;">水淹分析</td></tr>
					<tr><td width="40%">水位:</td><td><input id="waterLevel1" type="text" value="2960" style="width:80px;"/>米</td></tr>
					<tr><td>淹没面积:</td><td><input id="areaLabel" type="text" value="0.00米²" style="width:80px;"/></td></tr>
					<tr><td>库容:</td><td><input id="volumeLabel" type="text" value="0.00米³" style="width:80px;"/></td></tr>
					<tr><td>淹没线:</td><td><input type="checkbox" onclick="setWMSLayerIsEnabled('kuergan_submerge',this.checked);"/></td></tr>
					<tr><td align="center"><button onclick="startWaterFloodAnalyse1();">开始分析</button></td><td align="center"><button onclick="stopWaterFloodAnalyse();">结束分析</button></td></tr>
				</table>
				<table id="slopeAnalyse" border="0" style="font-size: 14px;display:none;">
	  				<tr><td colspan="2" align="left" style="font-weight:700;">坡度坡向分析</td></tr>
					<tr><td align="center"><button onclick="IndexTool.stopAllTool();startMeasureSlope();">开始分析</button></td><td align="center"><button onclick="stopMeasure()">结束分析</button></td></tr>
				</table>
				<table id="digFillAnalyse" border="0" style="font-size: 14px;display:none;">
	  				<tr><td colspan="2" align="left" style="font-weight:700;">挖填方分析</td></tr>
					<tr><td width="45%">挖填深度:</td><td><input id="digFillDepth" type="text" value="10" style="width:80px;"/>米</td></tr>
					<tr><td>挖方体积:</td><td><input id="digLabel" type="text" value="0.0 米³" style="width:80px;"/></td></tr>
					<tr><td>填方体积:</td><td><input id="fillLabel" type="text" value="0.0 米³" style="width:80px;"/></td></tr>
					<tr><td>挖填体积差:</td><td><input id="digFillLabel" type="text" value="0.0 米³" style="width:80px;"/></td></tr>
					<tr><td align="center"><button onclick="startDigFillAnalyse1();">开始分析</button></td><td align="center"><button onclick="stopDigFillAnalyse()">结束分析</button></td></tr>
				</table>
				<table id="terrainAnalyse" border="0" style="font-size: 14px;display:none;">
	  				<tr><td colspan="2" align="left" style="font-weight:700;">剖面分析</td></tr>
					<tr><td width="45%">分析方式:</td><td>
						<select id="followType">
							<option value="free">鼠标自由绘制</option>
							<option value="view">跟随视点绘制</option>
						</select>
					</td></tr>
					<tr><td>绘制图大小:</td><td>
						<select id="graphSize">
							<option value="Small">小</option>
							<option value="Medium">中</option>
							<option value="Large">大</option>
						</select>
					</td></tr>
					<tr><td align="center"><button onclick="startTerrainAnalyse1();">开始分析</button></td><td align="center"><button onclick="stopTerrainAnalyse()">结束分析</button></td></tr>
				</table>
				<table id="fluctuateAnalyse" border="0" style="font-size: 14px;display:none;">
	  				<tr><td colspan="2" align="left" style="font-weight:700;">消落区分析</td></tr>
					<tr><td width="45%">落水位:</td><td><input id="startFluctuateWaterLevel" type="text" value="2950" style="width:80px;"/>米</td></tr>
					<tr><td>涨水位:</td><td><input id="endfluctuateWaterLevel" type="text" value="2960" style="width:80px;"/>米</td></tr>
					<tr><td>消落区面积:</td><td><input id="fluctuateAreaLabel" type="text" value="0.00米²" style="width:80px;"/></td></tr>
					<tr><td>淹没线:</td><td><input type="checkbox" onclick="setWMSLayerIsEnabled('kuergan_submerge',this.checked);"/></td></tr>
					<tr><td align="center"><button onclick="startFluctuateAnalyse1();">开始分析</button></td><td align="center"><button onclick="stopFluctuateAnalyse();">结束分析</button></td></tr>
				</table>
	  		</div>
		</div>
		<div id="infoDiv" class="menu-span">
			<div class="menu-span-div">实时信息<img src="${ctx}/v4/imager/X1.png" onclick="toggleDiv('leftMenuDiv');"/></div>
			<div class="analyst2" style="height:330px">
				<div class="information" style="text-align:center" >
				  <span class="blackc" title="大坝信息" onclick="openInfo('大坝信息');"><img src="${ctx}/v4/imager/DBXX.png" width="42" height="42"/></span>
				  <span class="blackc" title="电站信息" onclick="openInfo('电站信息');"><img src="${ctx}/v4/imager/DZXX.png" width="42" height="42"/></span>
				  <span class="blackc" title="水文信息" onclick="openInfo('水文信息');"><img src="${ctx}/v4/imager/HYDROLOGIC.png" width="42" height="42"/></span>
				  <span class="blackc" title="水文信息" onclick="openInfo('水文信息');"><img src="${ctx}/v4/imager/SWXX.png" width="42" height="42"/></span>
				  <span class="blackc" title="气象信息" onclick="openInfo('气象信息');"><img src="${ctx}/v4/imager/QXXX.png" width="42" height="42"/></span>
				  <span class="blackc" title="地震遥测信息" onclick="openInfo('地震遥测信息');"><img src="${ctx}/v4/imager/DZYC.png" width="42" height="42"/></span>
				  <span class="blackc" title="雨量信息" onclick="openInfo('雨量信息');"><img src="${ctx}/v4/imager/TAINFALL.png" width="42" height="42"/></span>
				  <span class="blackc" title="积雪监测信息" onclick="openInfo('积雪监测信息');"><img src="${ctx}/v4/imager/JXJC.png" width="42" height="42"/></span>
				  <span class="blackc" title="视频监控" onclick="IndexTool.showVideoInfo('water','视频监控');"><img src="${ctx}/v4/imager/SPJK.png"/></span>
				  <img src="${ctx}/v4/imager/hyaline.png" width="42" height="42" /><img src="${ctx}/v4/imager/hyaline.png" width="42" height="42" />
				  <img src="${ctx}/v4/imager/hyaline.png" width="42" height="42" />	  
				</div>
			</div>
		</div>
		
		
		<div id="systemManageDiv" class="menu-span">
			<div class="menu-span-div">系统管理<img src="${ctx}/v4/imager/X1.png" onclick="toggleDiv('leftMenuDiv');"/></div>
			<div class="analyst2" style="height:330px">
				<img src="${ctx}/v4/imager/YHGL.png" onclick="App.tabs.userManager.init();" width="56" height="56" data-nr="1" title="用户管理"/>
				<img src="${ctx}/v4/imager/JSGL.png" onclick="App.tabs.roleManager.init();" width="56" height="56" data-nr="1" title="角色管理"/>
				<img src="${ctx}/v4/imager/QXGL.png" onclick="App.tabs.moduleManager.init();" width="56" height="56" data-nr="1" title="权限管理"/>
				<img src="${ctx}/v4/imager/RZGL.png" onclick="App.tabs.logManager.init();" width="56" height="56" data-nr="1" title="日志管理"/>
				<img src="${ctx}/v4/imager/FLY.png" onclick="FlyLineManageTool.flyLineQuery();" width="56" height="56" data-nr="1" />
				<img src="${ctx}/v4/imager/hyaline.png" width="56" height="56" data-nr="1" />
			</div>
		</div>
	</div>
	
	<div class="BottomMenu-ZTGC"  id="ZTGCDiv">
		<iframe id="menuIframe" class="menu_iframe" height="140px" width="190px" frameborder="0"></iframe>
		<div class="menu-span-div">主体工程<img src="${ctx}/v4/imager/X1.png" onclick="toggleDiv('ZTGCDiv');"/></div>
		<div class="analyst2" style="height:100px;text-align:left;">
			<a href="#" onclick="flyToLocation(37.81210,75.44671,24000,100,70,10000);toggleDiv('ZTGCInfoWin');">大坝工程</a>
			<a href="#" onclick="flyToLocation(37.81210,75.44671,24000,100,70,10000);toggleDiv('ZTGCInfoWin');">导流泄洪洞</a>
			<a href="#" onclick="flyToLocation(37.81210,75.44671,24000,100,70,10000);toggleDiv('ZTGCInfoWin');">引水发电洞</a>
			<a href="#" onclick="flyToLocation(37.81210,75.44671,24000,100,70,10000);toggleDiv('ZTGCInfoWin');">电站厂房</a>
			<a href="#" onclick="flyToLocation(37.81210,75.44671,24000,100,70,10000);toggleDiv('ZTGCInfoWin');">移民公路大桥</a>
		</div>
	</div>
	<div class="infoWin-ZTGC"  id="ZTGCInfoWin">
		<iframe id="menuIframe" class="menu_iframe" height="550px" width="250px" frameborder="0"></iframe>
		<div class="menu-span-div" style="width:240px;">电站厂房工程<img src="${ctx}/v4/imager/X1.png" onclick="toggleDiv('ZTGCInfoWin');" style="margin-left:140px;"/></div>
		<div class="analyst2" style="height:500px;width:240px;text-align:left;overflow-y:auto;">
			<img src="${ctx}/v4/imager/xbddf.jpg" width="220"/>
			一、工程建设时间：2007年4月2日开工，2011年10月15日完工。
二、资金来源：下坂地水利枢纽工程初步设计报告于2005年11月批准，国家发展和改革委员以《国家发展改革委员会关于核定新疆下坂地水利枢纽工程初步设计概算的通知》（发改投资【2005】2118号），总投资为18.064亿元。
电站厂房工程总合同价108019248元。
三、工程特性：
土建：
地下洞室群由 “两大洞室” （厂房、主变开关室）和一条引水压力管道、三条母线洞、一条尾水洞以及交通洞、运输洞、出线洞、进风洞和排风洞组成一个地下洞室群。其主副厂房高38.31m、最大开挖宽度18.4m、长70m；主变室高25.65m、宽14.7m、长63m。
机电:
水轮机为立轴混流式。单机额定出力为51.55MW，最大水头214.8m，额定水头190m，额定转速为428.6r/min，转轮直径2.1m。调速系统采用西安恒新水电科技发展有限公司并联PID调节规律的可编程计算机控制器PCC型电液调速器，额定油压4.0MPa。发电机为立轴三相凸极同步发电机、全密闭循环空气冷却系统、悬式结构。单机额定出力为50MW，出口额定电压10.5kv，额定电流3142A，额定功率因数0.875（滞后），定子绕组绝缘等级为F级。励磁系统采用广州电器科学研究院可控硅自并励系统励磁变与出口离相封闭母线“T”接，低压侧采用插接式密集型母线槽与励磁盘连接。额定励磁电压≥240v，励磁电流≤1000A。
发电机与变压器采用单元接线，出口经共箱封闭母线与220kV三相双圈无励磁调压升压变压器低压侧相联，主变高压侧为220kV SF6气体绝缘金属封闭开关（GIS），开关站主变进线三回，本期220kV出线一回，并预留一回出线间隔。所有电气设备均安装于地下厂房。洞室群内，220kV电缆出线从220kV GIS采
		</div>
	</div>
	
	
    
	<div class="BottomMenu-ZBDW" id="ZBDWDiv">
		<iframe id="menuIframe" class="menu_iframe" height="110px" width="130px" frameborder="0"></iframe>
		<div class="menu-span-div" style="width:120px;">坐标定位<img src="${ctx}/v4/imager/X1.png" style="margin-left:50px;" onclick="toggleDiv('ZBDWDiv');"/></div>
		<div class="analyst2" style="height:70px;width:120px;">
			<table border="0" style="font-size: 14px;">
				<tr><td width="30%">经度:</td><td><input id="lat" type="text" value="37.8234" style="width:80px;"/></td></tr>
				<tr><td>纬度:</td><td><input id="lon" type="text" value="75.4711" style="width:80px;"/></td></tr>
				<tr><td></td><td align="right"><button onclick="doLocation();">定位</button></td></tr>
			</table>
		</div>
	</div>
	       
	 <div class="BottomMenu-LXLL"  id="LXLLDiv">
		<iframe id="menuIframe" class="menu_iframe" height="140px" width="190px" frameborder="0"></iframe>
		<div class="menu-span-div">路线浏览<img src="${ctx}/v4/imager/X1.png" onclick="toggleDiv('LXLLDiv');"/></div>
		<div class="analyst2" style="height:100px">
		<a href="#" onclick="flyById(2);">发电站:大坝-电站厂房</a>
		<a href="#" onclick="flyById(3);">公     路:回水末端-大坝</a>
		<a href="#" onclick="flyById(4);">引流洞:入口-出口</a>
		<a href="#" onclick="quitFly();">退出</a>
		</div>
	</div>
	
	<div class="BottomMenu-DXKZ" id="DXKZDiv">
		<iframe id="menuIframe" class="menu_iframe" height="110px" width="130px" frameborder="0"></iframe>
		<div class="menu-span-div" style="width:120px;">地形夸张<img src="${ctx}/v4/imager/X1.png" style="margin-left:50px;" onclick="toggleDiv('DXKZDiv');"/></div>
		<div class="analyst2" style="height:70px;width:120px;">
			<table border="0" style="font-size: 14px;">
				<tr><td width="30%">经度:</td><td><input id="lat1" type="text" value="37.3900" style="width:80px;"/></td></tr>
				<tr><td>纬度:</td><td><input id="lon1" type="text" value="76.2005" style="width:80px;"/></td></tr>
				<tr><td></td><td align="right"><button onclick="doLocation();">定位</button></td></tr>
			</table>
		</div>
	</div>
	
	<div id="bottomDiv" class="bottom" style="text-align:center;">
		<div id="bottomMenuDiv" style="z-index:1000;left:36%;position:absolute;bottom:-3px;text-align:center;filter:alpha(Opacity=0);moz-opacity:0.6;opacity:1;">
			<img onclick="showBottomMenu('ZTGCDiv');" src="${ctx}/v4/imager/ZTGC.png" style="margin:0 10px;" data-nr="1" title="主体工程"/>
			<img onclick="showBottomMenu('ZBDWDiv');" src="${ctx}/v4/imager/ZBDW.png" style="margin:0 10px;" data-nr="1" title="坐标定位"/>
			<img onclick="showBottomMenu('LXLLDiv');" src="${ctx}/v4/imager/LXLL.png" style="margin:0 10px;" data-nr="2" title="路线浏览"/>
			<img onclick="IndexTool.stopAllTool();ViewControlTool.elementToggle(9,true);" src="${ctx}/v4/imager/TYGZ.png" style="margin:0 10px;" data-nr="4" title="太阳光照"/>
			<img onclick="IndexTool.stopAllTool();ViewControlTool.elementToggle(8,true);" src="${ctx}/v4/imager/WHXS.png" style="margin:0 10px;" data-nr="4" title="雾化显示"/>
			<img onclick="toggleLayer('statusLayer');" src="${ctx}/v4/imager/ZTL.png" style="margin:0 10px;" data-nr="4" title="状态栏"/>
			<img onclick="outputMap();" src="${ctx}/v4/imager/DTSC.png" style="margin:0 10px;" data-nr="4" title="地图输出"/>
		</div>
	</div>
  </body>
</html>
