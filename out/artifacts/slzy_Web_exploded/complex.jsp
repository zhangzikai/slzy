<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>辽宁省森林资源管理系统</title> 
    <%@ include file="common/taglibs.jsp" %>
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
	table.gridtable {
	width:100%;
	font-family: verdana,arial,sans-serif;
	font-size:11px;
	color:#333333;
	border-width: 1px;
	border-color: #666666;
	border-collapse: collapse;
}
table.gridtable th {
	border-width: 1px;
	padding: 8px;
	border-style: solid;
	border-color: #666666;
	background-color: #dedede;
}
table.gridtable td {
	border-width: 1px;
	padding: 8px;
	border-style: solid;
	border-color: #666666;
	background-color: #ffffff;
}
	p {
		margin: 5px;
	}
	</style>
	<script type="text/javascript" src="${ctx}/js/deployJava.js"></SCRIPT>
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
	<script type="text/javascript" src="${ctx}/js/2d/queryTool2D.js"></script>
	<script type="text/javascript" src="${ctx}/js/GaussPrj.js"></script>
	<script type="text/javascript">
	var isClickXBShow=false;
	var layers;
	var isDoubleScreen=false;
	var bugFixed;
	Ext.onReady(function() {
		//调整球高整
		//document.getElementById("wwjApplet").style.height=(document.body.clientHeight-145)+"px";
		var bodyHeight=document.body.clientHeight,bodyWidth=document.body.clientWidth;
		Ext.useShims = true;
		OpenLayers.ProxyHost = "cgi/proxy.cgi?url=";
		Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
		//Ext.QuickTips.init();   // 
	    
	    var weekDayLabels = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");
		var now = new Date();
	    var year=now.getFullYear();
		var month=now.getMonth()+1;
		var day=now.getDate();
	    var currentime = year+"年"+month+"月"+day+"日 "+weekDayLabels[now.getDay()];
	    var points="";
	    var measureMenu2D = new Ext.menu.Menu({
	    	//设置菜单四条边都有阴影  
            shadow : 'frame',  
            //添加菜单项  
            items:[  
                {  
                    text:'测距离 ',
                    iconCls : 'measure',
                    handler : function(){
                    	closezoom();
                    	clearMeasure();
						startMeasureDistance2D();
                    }
                },  
                {  
                    text:'测面积 ', 
                    iconCls : 'area',
                    handler : function(){
                    	closezoom();
                    	clearMeasure();
						startMeasureArea2D();
                    }
                }
            ]  
	    });
	    
	    //加载专题图图层数据
	    Ext.Ajax.request({
            url: SystemTool.basePath+'/themeMap.jhtml?method=queryList',
            method: 'POST',
            success: function(response,options){
         	   	layers = Ext.util.JSON.decode(response.responseText);
            }
       	});
	    
	    var staticsMenu = new Ext.menu.Menu({  
            //设置菜单四条边都有阴影  
            shadow : 'frame',  
            //添加菜单项  
            items:[  
                {  
                    text:'县(区)级查询',
                    handler : function(){
                    	selectLayer='xian';
                    	toggleControl('staticsByPnt');
                    }
                }
                ,  
                {  
                    text:'乡(场)级查询', 
                    handler : function(){
                    	selectLayer='xiang';
                    	toggleControl('staticsByPnt');
                    }
                }
				,  
                {  
                    text:'村级查询',
                    handler:function(){
                    	selectLayer='cun';
                    	toggleControl('staticsByPnt');
                    }
                }  
            ]  
        }); 
	    
	    var toolMenu = new Ext.menu.Menu({  
            //设置菜单四条边都有阴影  
            shadow : 'frame',  
            //添加菜单项  
            items:[  
                {  
                    text:'打印',
                    handler : function(){printMap();}
                },
                {
                	text:'双屏',
					//iconCls : 'selectByPolygon',
					handler:function(){
						var panel1 = Ext.getCmp('panelMap1');
						var panel2 = Ext.getCmp('panelMap2');
						
						var width = panel1.getWidth();
						
						if(!isDoubleScreen){
							isDoubleScreen=true;
							panel1.setWidth(width/2);
							panel2.setWidth(width/2);
							panel2.expand();
							panel2.setWidth(width/2);
							//panel1.setWidth((document.body.clientWidth-310)/2);
							//document.getElementById("2dMap").style.width=panel1.width;//(document.body.clientWidth-310)/2+"px"; 
							//document.getElementById("2dMap").style.height=(document.body.clientHeight-150)/2+"px";
							//document.getElementById("2dMap1").style.width=panel2.width;//(document.body.clientWidth-310)/2+"px"; 
							//document.getElementById("2dMap1").style.height=(document.body.clientHeight-150)/2+"px";
							
						}else{
							isDoubleScreen=false;
							panel2.collapse();
							
							//panel1.setWidth(document.body.clientWidth-310);
							//document.getElementById("2dMap").style.width=(document.body.clientWidth-310)+"px"; 
							//document.getElementById("2dMap").style.height=(document.body.clientHeight-150)+"px";
							//document.getElementById("2dMap1").style.width=(document.body.clientWidth-310)+"px"; 
							//document.getElementById("2dMap1").style.height=(document.body.clientHeight-150)+"px"; 
						}
						document.getElementById("2dMap").style.width=panel1.getWidth();
						document.getElementById("2dMap1").style.width=panel2.getWidth();
					}
                }
               /*  ,  
                {  
                    text:'导出', 
                    handler : function(){Export();}
                }
				,  
                {  
                    text:'保存'  
                     <!-- handler:onMenuCheck   --> 
                }   */
            ]  
        });  
	    
	    //场景列表菜单
	    var sceneMenu= new Ext.menu.Menu({id:"sceneMenu"});
	    loadSceneMenu();
	    
		//飞行线路列表菜单
		var flyRouteMenu= new Ext.menu.Menu({id:"flyRouteMenu"});
		loadFlyRouteMenu();
		
		var thematicmapMenu = new Ext.menu.Menu({  
            //设置菜单四条边都有阴影  
            shadow : 'frame',  
            //添加菜单项  
            items:[  
                {  
                    text:'版块渲染',
                    handler : function(){thematicmap_test1();}
                },  
                {  
                    text:'饼状图', 
                    handler : function(){}
                }
				,  
                {  
                    text:'柱状图', 
                    handler : function(){}
                }  
            ]  
        });  
		
		var viewport = new Ext.Viewport({
						layout : 'border',
						enableTabScroll : true,
						items : [
								new Ext.BoxComponent({ // raw
									region : 'north',
									id:'north',
									el : 'north',
									height : 85
								}),
								{
									layout: 'border',
							    	id: 'west',
							        region:'west',
							        border: true,
							        title:'',
									header:false,
							        split:true,
									margins: '0 0 5 5',
							        width: 290,
							        collapsible : true,
									layout : 'fit',
									items: [
										{
											xtype:'tabpanel',
											id:'controlTab',
											tabPosition : 'top',
											activeTab : 0,
											items:[
												{
													title:'行政区划',
													xtype:'treepanel',
													id:'dqTree-',
													root : new Ext.tree.AsyncTreeNode({id:'0',text :'辽宁省',value:'',codelevel:'',expanded:true,leaf:false}),
													loader : new Ext.tree.TreeLoader({
														url :SystemTool.basePath+'/j2UnitCode.jhtml?method=queryList',
														baseParams:{pcode:''},
														listeners:{
															beforeLoad:function(loaderObj,node){
																loaderObj.baseParams.pcode = node.id;
															}
														}
													}),
													border : false,
													rootVisible : false,
													lines : false,
													autoScroll : true,
													listeners:{
														click:function(node,e){
															queryXZQH(node.attributes.codelevel,node.attributes.code,locateXZQH);
															queryXZQH(node.attributes.codelevel,node.attributes.code,areaInfoShowCallBack);
														}
													}
												},
												{
													title:'图层控制',
													layout:'fit',
													id:'controlHeader',
													items:[
														{//工程展示开始
															border:false,
															id:'layerManage',
															items:[new Ext.tree.TreePanel({
																		id : 'layerManageTree',
																		root : new Ext.tree.AsyncTreeNode({
																			id : 'root',
																			text : '根节点',
																			expanded:true,
																			leaf:false
																		}),
																		loader : new Ext.tree.TreeLoader({
																			url :SystemTool.basePath+'/js/tree-data.json'
																		}),
																		listeners: {
																            'checkchange': function(node, checked){
																            	node.expand();  
																				node.attributes.checked = checked;  
																				node.eachChild(function(child) {  
																					child.ui.toggleCheck(checked);  
																					child.attributes.checked = checked;  
																					child.fireEvent('checkchange', child, checked); 
																					LayerTool.layerSwitch(node.parentNode.id,node.id,checked); 
																				}); 
																            	LayerTool.layerSwitch(node.parentNode.id,node.id,checked);
																            	if(node.parentNode!=null&&node.parentNode.parentNode!=null){
																            		if(checked){
																            			LayerTool.locating(node.parentNode.id,node.id,node.text);
																            		}else{
																            			deleteMarker(node.id);
																            		}
																            	}
																            }
																        },
																		border : false,
																		rootVisible :false,
																		lines : false,
																		autoScroll : true,
																		enableDD : true,
																		animate : false,
																		split : false,
																		tbar:[' ',' ',{	
																                iconCls: 'icon-expand-all',
																                text: '全部展开',
																                handler: function(){
																                    var treePanel = Ext.getCmp('layerManageTree');
																                    treePanel.root.expand(true);
																                },
																                scope: this
																            }, '-', {
																                iconCls: 'icon-collapse-all',
																                text: '全部收缩',
																                handler: function(){ 
																                    var treePanel = Ext.getCmp('layerManageTree');
																                    treePanel.root.collapseChildNodes(true);    
																                },
																                scope: this
																            }]
																})]
															},
															IndexTool.onlineInfo,
															IndexTool.spatialAnalysis,
															queryTool2D.xbquery,
															queryTool2D.staticsquery,
															queryTool2D.themequery,
															{	id: 'infoQuery',
														        region: 'center',
																split:true,
																autoScroll: true,
																items:[{
															            xtype: 'fieldset',
															            autoHeight: true,
															            labelWidth:45,  
															            defaultType: 'checkbox',
															            style:'text-align:left;', 
															            items: [{xtype:"myComboxTree",emptyText:'请选择地区',id:'unitCode',anchor:'75%',
															            	 			fieldLabel: "地    区",
														               					tree:new Ext.tree.TreePanel({
															             		   			id:'dqTree-',
															             					root : new Ext.tree.AsyncTreeNode({id:'0',text :'根节点',expanded:true,leaf:false}),
															             					loader : new Ext.tree.TreeLoader({
																             					url :SystemTool.basePath+'/j2UnitCode.jhtml?method=queryList',
																             					baseParams:{pcode:''},
																             					listeners:{
																             						beforeLoad:function(loaderObj,node){
																             							loaderObj.baseParams.pcode = node.id;
																             						}
																             					}
																             				}),
															             					border : false,
															             					rootVisible : false,
															             					lines : false,
															             					autoScroll : true
															             			})
														             			},{
															                        xtype:'textfield',
															                        fieldLabel: '关键字',
															                        name: 'keyword',
															                        id: 'keyword',
															                        anchor:'75%'
															                    },new Ext.BoxComponent({
																						el:'queryButtonMenu',
																						height:35
																					})
															                    ],
																			buttons: [{
																	        			xtype:'checkbox',
																	                    checked: false,
																	                    boxLabel: '详情',
																	                    listeners:{  
																	                        afterrender:function(obj){  
																	                            obj.getEl().dom.onclick = function(){  
																	                            	//alert(obj.getEl().dom.checked);
																	                            };  
																	                        }  
																	                    }  
																	                },{
																			            text: '搜索',
																			            handler:function(){
																			            	points=stopQueryTool();
																			            	if(Ext.getCmp('layerName').getValue()!=""){
																			            		QueryTool.doQuery(Ext.getCmp('layerName').getValue(),Ext.get('keyword').dom.value,points);
																			            	}
																				            
																			            }
																	        }]
																},{
																	id:'searchResult',
																	title : '搜索结果',
																	autoScroll:true,
																	html:'<div id="queryGridDiv"></div>',
																	border : false
																}]
															},
															{
																id:'systemManage',
																region: 'center',
																layout:'fit',
																border:false,
																items:[new Ext.BoxComponent({ // raw
																			region : 'north',
																			id:'infoType',
																			el : 'systemManageMenu',
																			height:80
																		})]
															}
													]
												}
											]
										}
									]
								},
								new Ext.TabPanel({
									id:'centerTab',
									region : 'center',
									deferredRender : false,
									tabPosition : 'bottom',
									activeTab : 0,
									items : [{
										id : '3d',
										html:"<iframe id='wwjAppletIframe' name='wwjAppletIframe' width='100%' height='100%' frameborder='0' src='applet.jsp'></iframe>",
										margins: '0 0 0 0',
										title : '三维影像',
										autoScroll : false,
										tbar : [{
													text : '漫游',
													iconCls : 'fly',
													handler : function(){
														IndexTool.stopAllTool();
														removeMouseClickListenerFunc();
														isClickXBShow=false;
														removedAllShape();
													}
												},{
													text : '放大',
													iconCls : 'zin',
													handler : function(){
														zoomIn();
													}
												}, '-', {
													text : '缩小',
													iconCls : 'zout',
													handler : function(){
														zoomOut();
													}
												},'-',{
													text : '复位',
													iconCls : 'resetmap',
													handler : function(){
														IndexTool.stopAllTool();
														flyToLocation(41.5736,122.8858,0,0,0,600000);
													}
												},'-',{
											        text:'测量',
											        menu:new Ext.menu.Menu({
												    	//设置菜单四条边都有阴影  
											            shadow : 'frame',  
											            //添加菜单项  
											            items:[  
											                {  
											                	text : '测距离',
																iconCls : 'measure',
											                    handler : function(){
											                    	IndexTool.stopAllTool();
																	startMeasureDistance('0');
											                    }
											                },  
											                {  
											                	text : '测面积',
																iconCls : 'area',
											                    handler : function(){
											                    	IndexTool.stopAllTool();
																	startMeasureArea('1');
											                    }
											                },  
											                {  
											                	text : '测高度',
																iconCls : 'high',
																handler:function(){
																	IndexTool.stopAllTool();
																	startMeasureHeight();
																}
											                },  
											                {  
											                	text : '测体积',
																iconCls : 'high',
																handler:function(){
																	IndexTool.stopAllTool();
																	startMeasureVolume();
																}
											                }
											            ]  
												    })
												},'-',{
													text : '小班',
													iconCls : 'zhuji',
													handler : function(){
														removedAllShape();
														addMouseClickListenerFunc();
														isClickXBShow=true;
													}
												},'-',{
													text : '定位',
													menu:new Ext.menu.Menu({
												    	//设置菜单四条边都有阴影  
											            shadow : 'frame',  
											            //添加菜单项  
											            items:[  
											                {  
											                	text : '小班',
																iconCls : 'measure',
											                    handler : function(){

											                    	var xbPositionWindow =Ext.getCmp('xbPositionWindow');
											                    	if(xbPositionWindow==undefined){
											                    		xbPositionWindow = new Ext.Window({
												                    		   id:"xbPositionWindow",
															           	       title:'小班林班定位',
															           	       width: 260,		     
															           		   height:150,
															           		   autoScroll:false,
															           	       modal:false,
															           	       closeAction:'hide',
															           	       resizable:false,
															           	       plain: false,
															           	       minButtonWidth:50,
															           	       items:[
															           	       			new Ext.FormPanel({
															           							labelAlign: 'left',
															           					        bodyStyle:'padding:5px',
															           					        width:250,
															           					        height:120,
															           					        labelWidth:50,
															           					        border:false,
															           					        items: [
																										{
																											xtype:"myComboxTree",emptyText:'请选择地区',id:'areaID1',width:150,
																											fieldLabel: "地 区",
																											allowBlank:true,
																											tree:new Ext.tree.TreePanel({
																												id:'dqTree1-',
																												root : new Ext.tree.AsyncTreeNode({id:'0',text :'根节点',value:'',codelevel:'',expanded:true,leaf:false}),
																												loader : new Ext.tree.TreeLoader({
																													url :SystemTool.basePath+'/j2UnitCode.jhtml?method=queryList',
																													baseParams:{pcode:''},
																													listeners:{
																														beforeLoad:function(loaderObj,node){
																															loaderObj.baseParams.pcode = node.id;
																														}
																													}
																												}),
																												border : false,
																												rootVisible : false,
																												lines : false,
																												autoScroll : true
																											})
																										},
															           					        		{
																											xtype : 'textfield',
																										    fieldLabel: '林班号',
																										    id:'positioner_linban',
																										    allowBlank:true
																										},
																										{
																											xtype : 'textfield',
																										    fieldLabel: '小班号',
																										    id:'positioner_xiaoban',
																										    allowBlank:true
																										}
															           							    ],
															           									buttons: [{
															           						            text: '定位',
															           						            listeners: {
												           										  				click :function(){
												           										  					var cun = Ext.getCmp('areaID1').code;
												           										  				 	var lbh = Ext.getCmp('positioner_linban').getValue();
												           										  				 	var xbh = Ext.getCmp('positioner_xiaoban').getValue();
										           										  							Ext.getCmp('xbPositionWindow').hide();
										           										  						queryTool2D.locateXB(cun,lbh,xbh,function(req){
											           										  						var g = new OpenLayers.Format.GML();
												           										  					var features = g.read(req.responseText);
												           										  					removedAllShape();
												           										  					if(features.length>0){
												           										  						var feature=features[0];
												           										  						var components=feature.geometry.components[0].components;
												           										  						for(var i=0;i<components.length;i++){
												           										  							var points=components[i].getVertices();
												           										  							var pointStr="";//33.5,125;
												           										  							for(var j=0;j<points.length;j++){
												           										  								if(pointStr==""){
												           										  									pointStr=points[j].y+","+points[j].x;
												           										  								}else{
												           										  									pointStr=pointStr+"|"+points[j].y+","+points[j].x;
												           										  								}
												           										  							}
												           										  							addSurfacePolygon(pointStr,"blue","lightGray",0.5,feature.attributes.c_xb+i);
												           										  						}
												           										  						flyTo(feature.geometry.getCentroid().y,feature.geometry.getCentroid().x);
												           										  						addMarker(feature.geometry.getCentroid().y,feature.geometry.getCentroid().x,"null");///../../../../../com/sx
												           										  					}
									           										  							});
			//flyTo(lat,lon);
												           										  				}
															           						        		}
															           						        }
															           					        ]
															           						})
															           	       ]
															           	  });
											                    	}
											                    	xbPositionWindow.show();
											                    }
											                },  
											                {  
											                	text : '经纬度',
																iconCls : 'area',
											                    handler : function(){
											                    	var latlonPositionerWindow =Ext.getCmp('lonlatPositionWindow');
											                    	if(latlonPositionerWindow==undefined){
											                    		latlonPositionerWindow = new Ext.Window({
												                    		   id:"lonlatPositionWindow",
															           	       title:'经纬度定位',
															           	       width: 260,		     
															           		   height:130,
															           		   autoScroll:false,
															           	       modal:false,
															           	       closeAction:'hide',
															           	       resizable:false,
															           	       plain: false,
															           	       minButtonWidth:50,
															           	       items:[
															           	       			new Ext.FormPanel({
															           							labelAlign: 'left',
															           					        bodyStyle:'padding:5px',
															           					        width:250,
															           					        height:100,
															           					        labelWidth:50,
															           					        border:false,
															           					        items: [
															           					        		{
																											xtype : 'numberfield',
																										    fieldLabel: '经度',
																										    id:'latlonPositioner_lon',
																										    allowBlank:false,
																										    minValue:-180,
																										    maxValue:180
																										},
																										{
																											xtype : 'numberfield',
																										    fieldLabel: '纬度',
																										    id:'latlonPositioner_lat',
																										    allowBlank:false,
																										    minValue:-180,
																										    maxValue:180
																										}
															           							    ],
															           									buttons: [{
															           						            text: '定位',
															           						            listeners: {
												           										  				click :function(){
										           										  							var lon = parseFloat($('latlonPositioner_lon').value);
										           										  							var lat = parseFloat($('latlonPositioner_lat').value);
										           										  							Ext.getCmp('lonlatPositionWindow').hide();
										           										  							flyTo(lat,lon);
										           										  						    addMarker(lat,lon,"null");
												           										  				}
															           						        		}
															           						        }
															           					        ]
															           						})
															           	       ]
															           	  });
											                    	}
											                    	latlonPositionerWindow.show();
											                    }
											                },  
											                {  
											                	text : '高斯坐标',
																iconCls : 'high',
																handler:function(){
																	//IndexTool.stopAllTool();
																	//startMeasureHeight();
																	var gaussPositionWindow =Ext.getCmp('gaussPositionWindow');
											                    	if(gaussPositionWindow==undefined){
											                    		gaussPositionWindow = new Ext.Window({
											                    			id:'gaussPositionWindow',
															       			title:'高斯坐标定位',
															       			width: 350,
																     		height:130,
																     		y:115,
																     		autoScroll:false,
															       			modal:false,
															       			closeAction:'hide',
															       			resizable:false,
																	        plain: false,
																	        minButtonWidth:60,
																	        items:[
																	       			new Ext.FormPanel({
																							labelAlign: 'left',
																					        bodyStyle:'padding:5px',
																					        width:330,
																					        height:100,
																					        labelWidth:40,
																					        border:false,
																					        layout:'column',
																					        items: [{
																			                    columnWidth:.49,
																			                    layout: 'form',
																	                			border:false,
																			                    items:[new Ext.form.ComboBox({
																				                	   id:'gaussPositioner_fendai',
																				                       fieldLabel:'分带',
																				                       store:new Ext.data.SimpleStore({
																				                      		fields: ['display'],
																				                       		data : [['3度带'],['6度带']]
																				                		}),
																				                       displayField:'display',
																				                       valueField:'display',
																				                       mode:'local',
																				                       triggerAction:'all',
																				                       selectOnFocus:true,
																				                       width:100,
																				                       emptyText:'请选择',
																				                       listeners:{
																				                       'select': function(){
																				                    	   	
																				                           }
																				                       }
																				                   }),
																			                           {
																										xtype : 'numberfield',
																									    fieldLabel: 'X坐标',
																									    width:100,
																									    id:'gaussPositioner_x',
																									    allowBlank:false
																									}]
																				                },{
																				                    columnWidth:.49,
																				                    layout: 'form',
																		                			border:false,
																				                    items:[{
																											xtype : 'textfield',
																										    fieldLabel: '  ',
																										    width:100,
																										    id:'gaussPositioner_daihao',
																										    allowBlank:true,
																										    hidden:true
																										},{
																											xtype : 'numberfield',
																										    fieldLabel: 'Y坐标',
																										    width:100,
																										    id:'gaussPositioner_y',
																										    allowBlank:false
																										}]
																				                }
																							],
																							buttons: [{
																						         	text: '定位',
																					            	listeners: {
																						  				click :function(){
																				  							var x = parseFloat($('gaussPositioner_x').value);	
																				  							var y = parseFloat($('gaussPositioner_y').value);	
																				  							var type = 0;
																				  							if($('gaussPositioner_fendai').value=='请选择') {
																				  									Ext.Msg.alert('系统提示','请选择分带。');
																				  									return;
																				  							}
																				  							if($('gaussPositioner_fendai').value=='6度带') {
																				  									type = 1;
																				  							}
																				  							Ext.getCmp('gaussPositionWindow').hide();
																				  							var pt = GaussPrj.gaussToLatLonGauss(x,y,type);
																				  							flyTo(pt[1],pt[0]);
																						  				}
																					        		}
																						        }
																					        ]
																						})
																	       ]
																	  });
											                    	}
											                    	gaussPositionWindow.show();
																}
											                }
											            ]  
												    })
												},'-',{
											        text:'典型场景',
											        menu: new Ext.menu.Menu({  
											            items:[  
											                {  
											                    text:'创建场景', 
											                    handler : function(){
											                    	var createSceneWindow =Ext.getCmp('createSceneWindow');
											                    	if(createSceneWindow==undefined){
											                    		createSceneWindow=new Ext.Window({
													                    	   id:'createSceneWindow',
															           	       title:'创建场景',
															           	       width: 300,		     
															           		   height:110,
															           		   autoScroll:false,
															           	       modal:false,
															           	       closeAction:'hide',
															           	       resizable:false,
															           	       plain: false,
															           	       minButtonWidth:50,
															           	       items:[
													           	       			new Ext.FormPanel({
													           							labelAlign: 'left',
													           					        bodyStyle:'padding:5px',
													           					        autoWidth:true,
													           					        border:false,
													           					        items: [
																									{
																										xtype : 'textfield',
																									    fieldLabel: '场景名称',
																									    id:'sceneInput_name',
																									    allowBlank:false
																									}
													           							    	],
													           									buttons: [{
													           						            text: '提交',
													           						            listeners: {
										           										  				click :function(){
										           										  					var wwd=theApplet.getWorldwindOption().getWwd();
										           										  					var sceneName=Ext.get('sceneInput_name').dom.value,height=wwd.getView().getCurrentEyePosition().getElevation();
										           										  					var lon=wwd.getView().getCurrentEyePosition().getLongitude().getDegrees(),lat=wwd.getView().getCurrentEyePosition().getLatitude().getDegrees();
										           										  					var pitch=wwd.getView().getPitch().getDegrees(),heading=wwd.getView().getHeading().getDegrees(),zoom=wwd.getView().getZoom();
											           										  				Ext.Ajax.request({
											           					            	                       	url: SystemTool.basePath+'/scene.jhtml?method=add',
											           					            	                    	params:{name:sceneName,lon:lon,lat:lat,height:height,pitch:pitch,heading:heading,zoom:zoom},
											           					            	                       	method: 'POST',
											           					            	                       	success: function(response,options){
											           					            	                    	   var responseJson = Ext.util.JSON.decode(response.responseText);
														           										 			Ext.Msg.alert('系统提示',responseJson.msg);
														           										 			Ext.getCmp('createSceneWindow').hide();
														           										 			loadSceneMenu();
											           					            	                        }
											           					            	                  	});
										           										  				}
													           						        		}
													           						        	},{
													           						            text: '取消',
													           						            listeners: {
										           										  				click :function(){
										           										  					Ext.getCmp('createSceneWindow').hide();
										           										  				}
													           						        	}
													           						        }
													           					        ]
													           						})
															           	       ]
															           	  });
											                    	}
											                    	createSceneWindow.show();
											                    }
											                }
															,  
											                {  
											                    text:'管理场景', 
											                    handler : function(){
											                    	new Ext.Window({
														           	       title:'管理场景',
														           	       width: 300,
														           		   y:130,
														           		   autoScroll:true,
														           	       modal:false,
														           	       closeAction:'hide',
														           	       resizable:false,
														           	       plain: false,
														           	       minButtonWidth:60,
														           	       layout:'column',
														           	       items:[new Ext.grid.GridPanel({
																           	        store:new Ext.data.JsonStore({
																	           	         autoDestroy: true,
																	           	      	 autoLoad:true,
																	           	         url:SystemTool.basePath+'/scene.jhtml?method=queryAll',
																	           	         idProperty: 'id',
																	           	         fields: ['id', 'name']
																	           	     }),
																           	        cm: new Ext.grid.ColumnModel([
																           	            {header: "序号",hideable:false,width: 80, dataIndex: 'id'},
																           	            {header: "名称", sortable: true,hideable:false,width: 120, dataIndex: 'name'}, 
																           	            {header: "删除", sortable: true,hideable:false,width: 80, renderer: delSceneRecord, dataIndex: 'id'}
		
																           	        ]),
																           	        id:"sceneGrid",
																           	        width:280,
																           			height:220,
																           	        stripeRows: true,
																           	        autoScroll:true,
																           	        border:false
																           		   })
														           	       		]
														           	 }).show();
											                    }
											                },
											                {
											        			text: '场景列表',
											        			menu : sceneMenu
											                }
											            ]  
											        })
											    },'-',{
											        text:'飞行浏览',
											        menu:new Ext.menu.Menu({  
											            //设置菜单四条边都有阴影  
											            //添加菜单项  
											            items:[  
											                {  
											                    text:'创建飞行路线', 
											                    handler : function(){
											                    	var createFlyRouteWindow =Ext.getCmp('createFlyRouteWindow');
											                    	if(createFlyRouteWindow==undefined){
											                    		createFlyRouteWindow=new Ext.Window({
													                    	   id:'createFlyRouteWindow',
													                    	   title:'创建飞行路线',
													                	       width: 200,
													                		   height:60,
													                		   autoScroll:false,
													                	       modal:false,
													                	       closeAction:'hide',
													                	       resizable:false,
													                	       plain: false,
													                	       minButtonWidth:60,
													                	       layout:'column',
															           	       items:[
																						{
																					    	columnWidth:.33,
																					        layout: 'form',
																					        border:false,
																					        items: [
																							   	new Ext.Button({text:'开始',listeners:{
																							   		click:function(){
																							   			startDrawShape("Path");
																							   		}
																							   	}})
																							]
																					    },{
																					    	columnWidth:.33,
																					        layout: 'form',
																					        border:false,
																					        items: [
																							   	new Ext.Button({text:'暂停',listeners:{
																					   				click:function(){
																					   					//PeKong.form.flyroute.getRouteBuilder().setArmed(false);
																					   				}
																							   	}})
																							]
																					    },{
																					    	columnWidth:.33,
																					        layout: 'form',
																					        border:false,
																					        items: [
																							   	new Ext.Button({text:'结束',listeners:{
																					   				click:function(){
																					   					//PeKong.form.flyroute.unsetTool();
																					   					//var positions = PeKong.form.flyroute.getRouteBuilder().getPositions();		
																					   					//for(var i=0;i<positions.size();i++) {
																					   					//		var pos = positions.get(i);				
																					   					//		PeKong.form.flyroute.pts.push(new XPoint(pos.getLongitude().getDegrees(),pos.getLatitude().getDegrees()));
																					   					//}
																					   					//PeKong.form.flyroute.getRouteBuilder().clear();
																					   					//PeKong.form.flyroute.getInputWindow().show();
																					   					
																					   					new Ext.Window({
																					   					 	id:"createFlyRouteInput",
																							   		       	title:'指定飞行路线名称',
																							   		       	width: 300,		     
																							   			    height:100,
																							   			    autoScroll:false,
																							   		       	modal:false,
																							   		       	closeAction:'hide',
																							   		       	resizable:false,
																							   		       	plain: false,
																							   		       	minButtonWidth:50,
																							   		       	items:[
																							   		       			new Ext.FormPanel({
																						   								labelAlign: 'left',
																						   						        bodyStyle:'padding:5px',
																						   						        autoWidth:true,
																						   						        border:false,
																						   						        items: [
																																{
																																	xtype : 'textfield',
																																    fieldLabel: '飞行路线名称',
																																    id:'flyRouteName_input',
																																    allowBlank:false
																																}
																						   								],
																						   								buttons: [{
																					   							            text: '提交',
																					   							            listeners: {
																		   											  				click :function(){
																		   											  				var flyRouteName=Ext.get('flyRouteName_input').dom.value;
																		   											  				var points=stopQueryTool();
																		   											  				
																				   											  			Ext.Ajax.request({
																		           					            	                       	url: SystemTool.basePath+'/flyRoute.jhtml?method=add',
																		           					            	                    	params:{name:flyRouteName,points:points},
																		           					            	                       	method: 'POST',
																		           					            	                       	success: function(response,options){
																		           					            	                    	   var responseJson = Ext.util.JSON.decode(response.responseText);
																					           										 			Ext.Msg.alert('系统提示',responseJson.msg);
																					           										 			Ext.getCmp('createFlyRouteInput').destroy();
																					           										 			loadFlyRouteMenu();
																		           					            	                        }
																		           					            	                  	});
																		   											  				}
																					   							        	}
																						   							    },{
																						   							            text: '取消',
																						   							            listeners: {
																		   											  				click :function(){
																		   											  					Ext.getCmp('createFlyRouteInput').destroy();
																		   											  				}
																						   							        	}
																						   							        }
																						   						        ]
																						   							})
																							   		       ]
																							   		  }).show();
																					   				}
																							   	}})
																							]
																					    }
															           	       ]
															           	  });
											                    	}
											                    	createFlyRouteWindow.show();
											                    }
											                }
															,  
											                {  
											                    text:'管理飞行路线', 
											                    handler : function(){
											                    	new Ext.Window({
														           	       title:'管理飞行路线',
														           	       width: 300,
														           		   y:130,
														           		   autoScroll:true,
														           	       modal:false,
														           	       closeAction:'hide',
														           	       resizable:false,
														           	       plain: false,
														           	       minButtonWidth:60,
														           	       layout:'column',
														           	       items:[new Ext.grid.GridPanel({
																           	        store:new Ext.data.JsonStore({
																	           	         autoDestroy: true,
																	           	      	 autoLoad:true,
																	           	         url:SystemTool.basePath+'/flyRoute.jhtml?method=queryAll',
																	           	         idProperty: 'id',
																	           	         fields: ['id', 'name']
																	           	     }),
																           	        cm: new Ext.grid.ColumnModel([
																           	            {header: "序号",hideable:false,width: 80, dataIndex: 'id'},
																           	            {header: "名称", sortable: true,hideable:false,width: 120, dataIndex: 'name'}, 
																           	            {header: "删除", sortable: true,hideable:false,width: 80, renderer: delFlyRouteRecord, dataIndex: 'id'}
		
																           	        ]),
																           	        id:"flyRouteGrid",
																           	        width:280,
																           			height:220,
																           	        stripeRows: true,
																           	        autoScroll:true,
																           	        border:false
																           		   })
														           	       		]
														           	 }).show();
											                    }
											                },
											                {
											        			text: '飞行路线列表',
											        			menu : flyRouteMenu
											                }
											            ]  
											        })
											    },'-',{
													text : '清除',
													iconCls : 'clear',
													handler:function(){
														removeAllMarkers();//标注的图层
														removeAllAnnotation();//小冒泡图层
														removeAllKml();//KML文件加载的图层
														removeAllShp();//shp文件加载的图层
														removedAllShape();//绘画的图层
														IndexTool.stopAllTool();//结束所有分析工具
													}
												},'-',
												/* {
													text : '下载jdk',
													iconCls : 'load',
													handler : function(){
														window.open("./lib/jre.exe", "_blank");
													}
												},'-', */
												
												{
													text : '全屏/退出',
													id:'fullScreen',
													iconCls : 'fullScreen',
													handler : function(){
														if(Ext.getCmp('west').collapsed){
															Ext.getCmp('north').show();
															Ext.getCmp('west').toggleCollapse(false);
															document.getElementById("wwjApplet").style.height=(document.body.clientHeight-145)+"px";
														}else{
															Ext.getCmp('north').hide();
															Ext.getCmp('west').toggleCollapse(true);
															document.getElementById("wwjApplet").style.height=(document.body.clientHeight-58)+"px";
														}
													}
												},'-','欢迎 ${userName} 用户，今天是'+currentime,'-',{
													text : '修改密码',
													id:'updatePwd',
													handler : function(){
														App.updatePwd();
													}
												},'-',{
													text : '退出系统',
													id:'logout',
													handler : function(){
														logout();
													}
												}]
									},{
										id : '2d',
										xtype:'panel',
										layout:'fit',
										//contentEl : 'center1',
										title : '二维地图',
										tabPosition:'bottom',
										//closable:true,
										tbar : [
										{
											text : '定位',
											iconCls : 'fly',
											menu:new Ext.menu.Menu({
												    	//设置菜单四条边都有阴影  
											            shadow : 'frame',  
											            //添加菜单项  
											            items:[  
											                {  
											                	text : '小班',
																iconCls : 'measure',
											                    handler : function(){

											                    	var xbPositionWindow =Ext.getCmp('xbPositionWindow');
											                    	if(xbPositionWindow==undefined){
											                    		xbPositionWindow = new Ext.Window({
												                    		   id:"xbPositionWindow",
															           	       title:'小班林班定位',
															           	       width: 260,		     
															           		   height:150,
															           		   autoScroll:false,
															           	       modal:false,
															           	       closeAction:'hide',
															           	       resizable:false,
															           	       plain: false,
															           	       minButtonWidth:50,
															           	       items:[
															           	       			new Ext.FormPanel({
															           							labelAlign: 'left',
															           					        bodyStyle:'padding:5px',
															           					        width:250,
															           					        height:120,
															           					        labelWidth:50,
															           					        border:false,
															           					        items: [
																										{
																											xtype:"myComboxTree",emptyText:'请选择地区',id:'areaID1',width:150,
																											fieldLabel: "地 区",
																											allowBlank:true,
																											tree:new Ext.tree.TreePanel({
																												id:'dqTree1-',
																												root : new Ext.tree.AsyncTreeNode({id:'0',text :'根节点',value:'',codelevel:'',expanded:true,leaf:false}),
																												loader : new Ext.tree.TreeLoader({
																													url :SystemTool.basePath+'/j2UnitCode.jhtml?method=queryList',
																													baseParams:{pcode:''},
																													listeners:{
																														beforeLoad:function(loaderObj,node){
																															loaderObj.baseParams.pcode = node.id;
																														}
																													}
																												}),
																												border : false,
																												rootVisible : false,
																												lines : false,
																												autoScroll : true
																											})
																										},
															           					        		{
																											xtype : 'textfield',
																										    fieldLabel: '林班号',
																										    id:'positioner_linban',
																										    allowBlank:true
																										},
																										{
																											xtype : 'textfield',
																										    fieldLabel: '小班号',
																										    id:'positioner_xiaoban',
																										    allowBlank:true
																										}
															           							    ],
															           									buttons: [{
															           						            text: '定位',
															           						            listeners: {
												           										  				click :function(){
												           										  					var cun = Ext.getCmp('areaID1').code;
												           										  				 	var lbh = Ext.getCmp('positioner_linban').getValue();
												           										  				 	var xbh = Ext.getCmp('positioner_xiaoban').getValue();
										           										  							
										           										  							Ext.getCmp('xbPositionWindow').hide();
										           										  							queryTool2D.locateXB(cun,lbh,xbh,function(req){
										           										  								var gml = new OpenLayers.Format.GML();
										           										  								console.log(req.responseText);
																														var features = gml.read(req.responseText);
																														if(features==undefined)return;
																														// 定位
																														queryResultLayer.drawFeature(features[0], styleMap["hightlight2"]);
																														map.zoomToExtent(features[0].geometry.bounds);
																														// 选中高亮效果
																														queryResultLayer.removeAllFeatures();
																														queryResultLayer.addFeatures(features[0]);
										           										  							});
										           										  							//flyTo(lat,lon);
												           										  				}
															           						        		}
															           						        }
															           					        ]
															           						})
															           	       ]
															           	  });
											                    	}
											                    	xbPositionWindow.show();
											                    }
											                },  
											                {  
											                	text : '经纬度',
																iconCls : 'area',
											                    handler : function(){
											                    	var latlonPositionerWindow =Ext.getCmp('lonlatPositionWindow');
											                    	if(latlonPositionerWindow==undefined){
											                    		latlonPositionerWindow = new Ext.Window({
												                    		   id:"lonlatPositionWindow",
															           	       title:'经纬度定位',
															           	       width: 260,		     
															           		   height:130,
															           		   autoScroll:false,
															           	       modal:false,
															           	       closeAction:'hide',
															           	       resizable:false,
															           	       plain: false,
															           	       minButtonWidth:50,
															           	       items:[
															           	       			new Ext.FormPanel({
															           							labelAlign: 'left',
															           					        bodyStyle:'padding:5px',
															           					        width:250,
															           					        height:100,
															           					        labelWidth:50,
															           					        border:false,
															           					        items: [
															           					        		{
																											xtype : 'numberfield',
																										    fieldLabel: '经度',
																										    id:'latlonPositioner_lon',
																										    allowBlank:false,
																										    minValue:-180,
																										    maxValue:180
																										},
																										{
																											xtype : 'numberfield',
																										    fieldLabel: '纬度',
																										    id:'latlonPositioner_lat',
																										    allowBlank:false,
																										    minValue:-180,
																										    maxValue:180
																										}
															           							    ],
															           									buttons: [{
															           						            text: '定位',
															           						            listeners: {
												           										  				click :function(){
										           										  							var lon = parseFloat(Ext.get('latlonPositioner_lon').dom.value);
										           										  							var lat = parseFloat(Ext.get('latlonPositioner_lat').dom.value);
										           										  							Ext.getCmp('lonlatPositionWindow').hide();
										           										  							var pt = new OpenLayers.Geometry.Point(lon,lat);
										           										  							var bound = map.calculateBounds(pt, 0.0000858306884765625);
																				  									//map.zoomToExtent(bound);
																				  									
																				  									map.moveTo(new OpenLayers.LonLat(lon,lat),13);
																				  									
																				  									pointLayer.clearMarkers();
																				  									
										           										  							var size = new OpenLayers.Size(21,25);
																													var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
																													var icon = new OpenLayers.Icon('/images/maker/3-grn-blank.png', size, offset);
																													pointLayer.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(lon,lat)));
										           										  							//pointLayer.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(lon,lat),icon));
										           										  							/* getFeatureByXY(lon,lat,function(response){
										           										  								var g = new OpenLayers.Format.GML();
																														var features = g.read(response.responseText);
																														map.zoomToExtent(features[0].geometry.bounds);
										           										  								queryResultLayer.drawFeature(features[0], styleMap["hightlight2"]);
										           										  							}); */
												           										  				}
															           						        		}
															           						        }
															           					        ]
															           						})
															           	       ]
															           	  });
											                    	}
											                    	latlonPositionerWindow.show();
											                    }
											                },  
											                {  
											                	text : '高斯坐标',
																iconCls : 'high',
																handler:function(){
																	//IndexTool.stopAllTool();
																	//startMeasureHeight();
																	var gaussPositionWindow =Ext.getCmp('gaussPositionWindow');
											                    	if(gaussPositionWindow==undefined){
											                    		gaussPositionWindow = new Ext.Window({
											                    			id:'gaussPositionWindow',
															       			title:'高斯坐标定位',
															       			width: 350,
																     		height:130,
																     		y:115,
																     		autoScroll:false,
															       			modal:false,
															       			closeAction:'hide',
															       			resizable:false,
																	        plain: false,
																	        minButtonWidth:60,
																	        items:[
																	       			new Ext.FormPanel({
																							labelAlign: 'left',
																					        bodyStyle:'padding:5px',
																					        width:330,
																					        height:100,
																					        labelWidth:40,
																					        border:false,
																					        layout:'column',
																					        items: [{
																			                    columnWidth:.49,
																			                    layout: 'form',
																	                			border:false,
																			                    items:[new Ext.form.ComboBox({
																				                	   id:'gaussPositioner_fendai',
																				                       fieldLabel:'分带',
																				                       store:new Ext.data.SimpleStore({
																				                      		fields: ['display'],
																				                       		data : [['3度带'],['6度带']]
																				                		}),
																				                       displayField:'display',
																				                       valueField:'display',
																				                       mode:'local',
																				                       triggerAction:'all',
																				                       selectOnFocus:true,
																				                       width:100,
																				                       emptyText:'请选择',
																				                       listeners:{
																				                       'select': function(){
																				                    	   	
																				                           }
																				                       }
																				                   }),
																			                           {
																										xtype : 'numberfield',
																									    fieldLabel: 'X坐标',
																									    width:100,
																									    id:'gaussPositioner_x',
																									    allowBlank:false
																									}]
																				                },{
																				                    columnWidth:.49,
																				                    layout: 'form',
																		                			border:false,
																				                    items:[{
																											xtype : 'textfield',
																										    fieldLabel: '  ',
																										    width:100,
																										    id:'gaussPositioner_daihao',
																										    allowBlank:true,
																										    hidden:true
																										},{
																											xtype : 'numberfield',
																										    fieldLabel: 'Y坐标',
																										    width:100,
																										    id:'gaussPositioner_y',
																										    allowBlank:false
																										}]
																				                }
																							],
																							buttons: [{
																						         	text: '定位',
																					            	listeners: {
																						  				click :function(){
																				  							var x = parseFloat($('gaussPositioner_x').value);	
																				  							var y = parseFloat($('gaussPositioner_y').value);	
																				  							var type = 0;
																				  							if($('gaussPositioner_fendai').value=='请选择') {
																				  									Ext.Msg.alert('系统提示','请选择分带。');
																				  									return;
																				  							}
																				  							if($('gaussPositioner_fendai').value=='6度带') {
																				  									type = 1;
																				  							}
																				  							Ext.getCmp('gaussPositionWindow').hide();
																				  							var pt = GaussPrj.gaussToLatLonGauss(x,y,type);
																				  							var bound = map.calculateBounds(pt, 0.0000858306884765625);
																				  							map.zoomToExtent(bound);
																						  				}
																					        		}
																						        }
																					        ]
																						})
																	       ]
																	  });
											                    	}
											                    	gaussPositionWindow.show();
																}
											                }
											            ]  
												    })
										},'-',
										{
											text : '放大',
											iconCls : 'zin',
											handler : function()
											{
												clearActivate();
												zoomin2D();
											}
										}, '-', {
											text : '缩小',
											handler : function(){
												clearActivate();
												zoomout2D();
											},
											iconCls : 'zout'
										}, '-', {
											text : '复位',
											handler : function(){
												closezoom();
												zoomToExtent();
											},
											iconCls : 'resetmap'
										}, '-', {
											text : '漫游',
											iconCls : 'pan',
											handler:function(){
												closezoom();
												clearActivate();
												//Ext.getCmp('East').collapse(true);
											}
										}, '-', {
											text : '测量 ',
											menu:measureMenu2D,
											iconCls : 'measure',
											handler : function()
											{
												clearActivate();
											}
										}, '-', {
											text : '清除',
											iconCls : 'clear',
											handler:function(){
												closezoom();
												clearActivate();
												clearLastResult();
												clearPopup();
												//清除专题图图层
												//clearThematicMapLayer();
												//清除测量图层
												clearMeasure();
												pointLayer.clearMarkers();
											}
										},'-',{
											text : '工具',
											menu:toolMenu,
											iconCls : 'tool',
											handler : function()
											{
												clearActivate();
											}
										}
										/* ,'-',{
											text : '专题图',
											menu:thematicmapMenu,
											iconCls : 'thematicmap',
											handler : function()
											{
												
											}
										} */
										,'-', {
											text:'小班查询',
											menu:new Ext.menu.Menu({  
								            //设置菜单四条边都有阴影  
								            shadow : 'frame',  
								            //添加菜单项  
								            items:[  
								                {  
								                    text:'点选 查询',
								                    iconCls : 'selectByPnt',
								                    handler : function(){
								                    	selectByPnt();
														closezoom();
								                    }
								                }
								                ,  
								                {  
								                    text:'多边形查询', 
								                    handler : function(){
								                    	toggleControl('selectByPolygon');
								                    	//map.controls[10].activate();
								                    }
								                }
								            ]
								            })  
										},'-',{
											text : '行政区查询',
											menu:staticsMenu,
											iconCls : 'selectByPnt',
											handler : function(){
												toggleControl('staticsByPnt');
											}
										},'-',
										new Ext.form.Checkbox({    				
						    				boxLabel:'图例',
						    				listeners: {
												check:function(chkbox,checked){
													var panel =Ext.getCmp('legendPanel');
							                    	if(panel==undefined){
								                    	panel = new Ext.Panel({
																id:'legendPanel',
																x: document.body.clientWidth-150,
														        y: 120,
														        renderTo: Ext.getBody(),
																floating:true,
																height:500,
																width:150,
																autoScroll:true,
																html:'<img src="legends/1.jpg"></img>'
														});
							                    	}
							                    	if(checked){
							                    		panel.show();
							                    	}else{
							                    		panel.hide();
							                    		panel.destroy();
							                    	}
												}
											}      
						    			}),'-','小班年份',{
											xtype:'combo',
											fieldLabel:'年度',
											name:'fieldName',
											store:new Ext.data.ArrayStore({
										        fields: ['year','year'],
										        data: [['2012', '2012'],['2013', '2013'],['2014','2014'],['2015','2015']]
										    }),
										    value:'2012',
										    mode: 'local',
											valueField: 'year',
											displayField: 'year',
											id:'yearID',
											width:50,
											listeners:{
												 select : function(_combo) {  
										            var year = _combo.getValue();
										            switchXB(year);
										         }  
											}
										}
										/* , '-', '关键字:', {
											xtype : 'textfield',
											width:'65px',
											id:'keyword'
										}, {
											text : '搜索',
											handler : function(){
												closezoom();
												clearActivate();
												Ext.getCmp('East').expand(true);
												query(Ext.getCmp('keyword').getValue());
											}
										//handler : query()
										}  */
										],
										items:[
											{
												xtype:'panel',
												title:'地图',
												header:false,
												layout:'border',
												//layout:'hbox',
												items:[
													{
														title: '中',
														header:false,
														id:'panelMap1',
								                        xtype: "panel",
								                        contentEl:"center1",
								                        //collapsible:true,
								                        region:'center',
								                        //html: "<div id='2dMap'></div>",
								                        listeners:{
								                        	resize:function(){
								                        		var panel1 = Ext.getCmp('panelMap1');
																var panel2 = Ext.getCmp('panelMap2');
								                        		document.getElementById("2dMap").style.width=panel1.getWidth();
																document.getElementById("2dMap1").style.width=panel2.getWidth();
																document.getElementById("2dMap").style.height=panel1.getHeight();
																document.getElementById("2dMap1").style.height=panel2.getHeight();
								                        	}
								                        }
													},
													{
														title: '东',
														header:false,
														id:'panelMap2',
														hidden:false,
														contentEl:'props-panel',
														collapsed:true,
								                        //collapsible:true,
								                        xtype: "panel",
								                        region:'east',
								                        html: "<div id='2dMap1'></div>",
								                        tbar : [
								                        	{
																text:'显示变化小班',
																handler:function(){
																	showDiffXB();
																}
															},'-',
															'小班年份', {
																xtype:'combo',
																fieldLabel:'年度',
																name:'fieldName',
																store:new Ext.data.ArrayStore({
															        fields: ['year','year'],
															        data: [['2012', '2012'],['2013', '2013'],['2014','2014'],['2015','2015']]
															    }),
															    value:'2012',
															    mode: 'local',
																valueField: 'year',
																displayField: 'year',
																id:'yearID2',
																width:50,
																listeners:{
																	 select : function(_combo) {  
															            var year = _combo.getValue();
															            switchXB2(year);
															         }  
																}
															}
														],
														listeners:{
															collapse:function(){
																/* var panel1 = Ext.getCmp('panelMap1');
																var panel2 = Ext.getCmp('panelMap2');
																console.log(panel1);
																document.getElementById("2dMap").style.width=panel1.getWidth();
																document.getElementById("2dMap1").style.width=panel2.getWidth(); */
															}
														}
													} 
												],
												defaults: 
								                {
								                 	split: true                  //是否有分割线
								                } 
											}
											/* {
												title: '中',
												id:'panelMap1',
						                        xtype: "panel",
						                        region:'center',
						                        html: "<div id='2dMap'></div>"
											},
											{
												title: '东',
												id:'panelMap2',
												hidden:true,
						                        xtype: "panel",
						                        region:'east',
						                        html: "<div id='2dMap1'></div>"
											}  */
										],
										/* defaults: 
						                {
						                 	split: true,                  //是否有分割线
						                },   */
										autoScroll : true
									}],
									listeners : {
										tabchange : function(tabPanl,newTab,currentTab) {
										}
									}
							})]
				});
				App.bodyHeight=document.body.clientHeight;
				App.bodyWidth=document.body.clientWidth;
				
				document.getElementById("2dMap").style.width=(document.body.clientWidth-310)+"px"; 
				document.getElementById("2dMap").style.height=(document.body.clientHeight-150)+"px";
				document.getElementById("2dMap1").style.width=(document.body.clientWidth-310)+"px"; 
				document.getElementById("2dMap1").style.height=(document.body.clientHeight-150)+"px"; 
				init2DMap();
	});
			
	function onPageLoad(){
        //获取applet
        getWWJApplet(); 
        //使用前先创建，为的是初始化的时候不用加载全部new出来，用到在new，下面的都同理
        createBaseTool();
       	createQueryTool();
        createMeasureTool(); 
        createMarkerTool();
        createDrawTool();
      	createKmlFiles();
      	createShpFiles();
      	createModelTool();
      	createWindowOption();
        createAirspaceTool();
        createWorldModel();
        createAnalyseTool();
        ViewControlTool.elementToggle(8,false);
        ViewControlTool.elementToggle(9,false);
        ViewControlTool.elementToggle(6,false);
        //flyToTime(41.5736,122.8858,24000,100,70,10000,10000);
       
     }

	/**
	*三维点击事件回调方法(返回坐标点)
	*/
	function xbFieldShow(lat,lng){
		if(isClickXBShow){
			getFeatureByXY(lng,lat,xbFieldShowCallBack);
		}
	}	
	/**
	*openlayers查询结果回调方法(返回features)
	*显示小班属性信息
	*三维上绘画小班区域
	*/
	function xbFieldShowCallBack(response){
		var g = new OpenLayers.Format.GML();
		var features = g.read(response.responseText);
		removedAllShape();
		if(features.length>0){
			var feature=features[0];
			showXBInfo(feature);
			var components=feature.geometry.components[0].components;
			for(var i=0;i<components.length;i++){
				var points=components[i].getVertices();
				var pointStr="";//33.5,125;
				for(var j=0;j<points.length;j++){
					if(pointStr==""){
						pointStr=points[j].y+","+points[j].x;
					}else{
						pointStr=pointStr+"|"+points[j].y+","+points[j].x;
					}
				}
				addSurfacePolygon(pointStr,"blue","lightGray",0.5,feature.attributes.c_xb+i);
			}
		}
	}	
	
	/**
	*openlayers查询结果回调方法(返回features)
	*三维上绘画行政区域
	*/
	function areaInfoShowCallBack(response){
		var g = new OpenLayers.Format.GML();
		var features = g.read(response.responseText);
		removedAllShape();
		if(features.length>0){
			var feature=features[0];
			var components=feature.geometry.components[0].components;
			for(var i=0;i<components.length;i++){
				var points=components[i].getVertices();
				var pointStr="";//33.5,125;
				for(var j=0;j<points.length;j++){
					if(pointStr==""){
						pointStr=points[j].y+","+points[j].x;
					}else{
						pointStr=pointStr+"|"+points[j].y+","+points[j].x;
					}
				}
				addSurfacePolygon(pointStr,"blue","lightGray",0.5,feature.attributes.c_xb+i);
			}
			flyTo(feature.geometry.getCentroid().y,feature.geometry.getCentroid().x);
			addMarker(feature.geometry.getCentroid().y,feature.geometry.getCentroid().x,"null");///../../../../../com/sx
		}
	}
	
	/**
	*openlayers查询结果回调方法(返回features)
	*三维上绘画行政区域
	*/
	function areaInfoShowCallBack(response){
		var g = new OpenLayers.Format.GML();
		var features = g.read(response.responseText);
		removedAllShape();
		if(features.length>0){
			var feature=features[0];
			var components=feature.geometry.components[0].components;
			for(var i=0;i<components.length;i++){
				var points=components[i].getVertices();
				var pointStr="";//33.5,125;
				for(var j=0;j<points.length;j++){
					if(pointStr==""){
						pointStr=points[j].y+","+points[j].x;
					}else{
						pointStr=pointStr+"|"+points[j].y+","+points[j].x;
					}
				}
				addSurfacePolygon(pointStr,"blue","lightGray",0.5,feature.attributes.C_XB+i);
			}
			flyTo();
		}
	}
	
     function logout(){
     	var bln=confirm("您确认要退出森林资源管理系统?");
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
	
	function isShowLayer(obj){
		if(obj.name!=null&&obj.name!=""){
			var layerArray=obj.name.split(","); //字符分割 
			for(var i=0;i<layerArray.length;i++) { 
				setWMSLayerIsEnabled(layerArray[i],obj.checked); 
			} 	
		}	
	}
	
	function isShowModel(obj){
		if(obj.name!=null&&obj.name!=""){
			var layerArray=obj.name.split(","); //字符分割 
			for(var i=0;i<layerArray.length;i++) { 
				setKmlIsEnabled(layerArray[i],obj.checked);
			} 	
		}	
	}
	
	//三维切换专题图图层
	function switchShowLayer(name){
		for(var i=0;i<layers.length;i++){
			var layer=layers[i];
			 if(layer.layers!=null&&layer.wms!=null){
				 if(layer.layers==name){
					 setWMSLayerIsEnabled(layer.layers,true);
				 }else{
					 setWMSLayerIsEnabled(layer.layers,false);
				 }
			 }
         }
	}
	
	// 删除场景功能的调用
	function delSceneRecord(val){	
		if(val){
			return '<span style="color:green;"><a href="javascript:deleteScene('+val+')">删  除</a></span>';
		}else{
			return val;
		}
	}
	function deleteScene(id){
		Ext.Ajax.request({
				url:SystemTool.basePath+'/scene.jhtml?method=delete',				
				params:{'ids':id},
				callback: function(options,success,response) {
					var responseJson = Ext.util.JSON.decode(response.responseText);
			 			Ext.Msg.alert('系统提示',responseJson.msg);
			 			Ext.getCmp('sceneGrid').getStore().reload();
			 			loadSceneMenu();
				}
		});
	}
	function loadSceneMenu(){
		var sceneMenu=Ext.getCmp('sceneMenu');
		sceneMenu.removeAll();
		Ext.Ajax.request({
	        url: SystemTool.basePath+'/scene.jhtml?method=queryAll',
	        success: function(res){
	        		var jsonResult = Ext.util.JSON.decode(res.responseText);  
	            	for(var i=0;i<jsonResult.length;i++) {
						var cj = jsonResult[i];
						sceneMenu.add({
		        			text: cj.name,
		        			lon:cj.lon,
		        			lat:cj.lat,
		        			height:cj.height,
		        			pitch:cj.pitch,
		        			heading:cj.heading,
		        			zoom:cj.zoom,
		        			handler:function(){
		        				IndexTool.stopAllTool();
								flyToLocation(this.lat,this.lon,this.height,this.heading,this.pitch,this.zoom);
				            }
						});
				}
	         }
	   });
	}
	// 删除飞行路线功能的调用
	function delFlyRouteRecord(val){	
		if(val){
			return '<span style="color:green;"><a href="javascript:deleteFlyRoute('+val+')">删  除</a></span>';
		}else{
			return val;
		}
	}
	function deleteFlyRoute(id){
		Ext.Ajax.request({
				url:SystemTool.basePath+'/flyRoute.jhtml?method=delete',				
				params:{'ids':id},
				callback: function(options,success,response) {
					var responseJson = Ext.util.JSON.decode(response.responseText);
			 			Ext.Msg.alert('系统提示',responseJson.msg);
			 			Ext.getCmp('flyRouteGrid').getStore().reload();
			 			loadFlyRouteMenu();
				}
		});
	}
	function loadFlyRouteMenu(){
		var flyRouteMenu=Ext.getCmp('flyRouteMenu');
		flyRouteMenu.removeAll();
		Ext.Ajax.request({
	        url: SystemTool.basePath+'/flyRoute.jhtml?method=queryAll',
	        success: function(res){
	        		var jsonResult = Ext.util.JSON.decode(res.responseText);  
	            	for(var i=0;i<jsonResult.length;i++) {
						var flyRoute = jsonResult[i];			
						flyRouteMenu.add({
		        			text: flyRoute.name,
		        			points:flyRoute.points,
		        			handler:function(){
		        				showFlyOptionWindow(this);
		        				//IndexTool.stopAllTool();
								//flyToLocation(this.lat,this.lon,this.height,this.heading,this.pitch,this.zoom);
				            }
						});
					}
	         }
	   	});
	}
	
	
	
   function showMenu(menuName,name){
		Ext.getCmp('layerManage').setVisible(false);
		Ext.getCmp('onlineInfo').setVisible(false);
		Ext.getCmp('spatialAnalysis').setVisible(false);
		Ext.getCmp('infoQuery').setVisible(false);
		Ext.getCmp('themequery').setVisible(false);
		Ext.getCmp('staticsquery').setVisible(false);
		Ext.getCmp('systemManage').setVisible(false);
		Ext.getCmp('queryID').setVisible(false);
		
		Ext.getCmp('controlTab').setActiveTab(1);
		
     	Ext.getCmp(menuName).setVisible(true);
     	Ext.getCmp('controlHeader').setTitle(name);
		hideThemeLayer();
		switchShowLayer(null);
   }
   
  //显示飞行线路控制窗口
  function showFlyOptionWindow(obj){
		var points=Ext.util.JSON.decode(obj.points);
		bugFixed = obj;
		var routePoints="";//116.20,40.22;116.21,40.566;
		var distance = 0;
		for(var i=0;i<points.length-1;i++) {
			var pt1 = points[i];
			var pt2 = points[i+1];
			distance += Math.sqrt((pt2.longitude-pt1.longitude)*(pt2.longitude-pt1.longitude) + (pt2.latitude-pt1.latitude)*(pt2.latitude-pt1.latitude));
			routePoints+=pt1.longitude+","+pt1.latitude+";";
			if(i==points.length-1){
				routePoints+=pt2.longitude+","+pt2.latitude+";";
			}
		}
		if(distance>1000) {
			distance = Math.round(distance/1000);
		} else {
			distance = Math.round(distance)/1000;
		}
		var speedData = [[0],[1],[2],[5],[10],[20],[50],[100],[200],[500]];
		var speedStore = new Ext.data.SimpleStore({
       		fields: ['display'],
       		data : speedData
		});
		
		var zoomData = [[100],[200],[500],[1000],[2000],[5000],[10000]];
		var zoomStore = new Ext.data.SimpleStore({
       		fields: ['display'],
       		data : zoomData
		});
		
		var scaleData = [['1:1000'],['1:2000'],['1:5000'],['1:10000'],['1:50000'],['1:100000']];
		var scaleStore = new Ext.data.SimpleStore({
       		fields: ['display'],
       		data : scaleData
		});
		
		var tiltData = [[5],[10],[20],[30],[45],[60],[75],[90]];
		var tiltStore = new Ext.data.SimpleStore({
       		fields: ['display'],
       		data : tiltData
		});
		
		var seconds = distance/(5/3600);
		var minute= Math.floor(seconds/60);
		var second = Math.round(seconds%60);
			
		var htmls = '路线总长<span id="flyOption_routeLength" style="font-weight:bold;">'+distance+'</span>千米,';
		htmls += '飞行时间<span id="flyOption_routeMinute" style="font-weight:bold;">'+minute+'</span>分';
		htmls += '<span id="flyOption_routeSecond" style="font-weight:bold;">'+second+'</span>秒';
		var flyOptionWindow =Ext.getCmp('flyOptionWindow');
    	if(flyOptionWindow==undefined){
    		flyOptionWindow = new Ext.Window({
				id:'flyOptionWindow',
	       		title:'飞行浏览',
	       		width:500,
		     	height:160,
		     	y:115,
		     	collapsible:true,
		     	autoScroll:false,
	       		modal:false,
	       		closeAction:'hide',
	       		resizable:false,
	       		plain: false,
	       		minButtonWidth:30,	       
	       		items: [
					new Ext.FormPanel({
						labelAlign: 'left',
					    bodyStyle:'padding:5px',
					    autoWidth:true,
					    border:false,				        
					    labelWidth:45,
					    items: [
					   		{
						    	border:false,
						    	html:htmls,
						    	style:'margin-bottom:3px;'
					    	},
					    	{
					    		layout:'column',
					    		border:false,
					    		items:[
					    		{
					           		columnWidth:.33,
						           	layout: 'form',
						           	border:false,
						           	items: [
						                    new Ext.form.ComboBox({
						                	   id:'flyOption_speed',
						                       fieldLabel:'速度(千米/时)',
						                       store:speedStore,
						                       displayField:'display',
						                       valueField:'display',
						                       mode:'local',
						                       triggerAction:'all',
						                       selectOnFocus:true,
						                       width:60,
						                       allowBlank:false,
						                       value:'5',
						                       emptyText:'请选择',
						                       listeners:{
						                       		'select': function(){
							                    	   	var seconds = distance/(this.value/3600);
							                   			var minute = Math.floor(seconds/60);
							                   			var second = Math.round(seconds%60);
							                   			$('flyOption_routeMinute').innerText = minute;
							                   			$('flyOption_routeSecond').innerText = second;
						                           	}
						                       }
						                   })
									]
						       	},{
					           		columnWidth:.34,
						           	layout: 'form',
						           	border:false,
						           	items: [
											new Ext.form.ComboBox({
						                	   id:'flyOption_zoom',
						                       fieldLabel:'比例尺',
						                       store:scaleStore,
						                       displayField:'display',
						                       valueField:'display',
						                       mode:'local',
						                       triggerAction:'all',
						                       selectOnFocus:true,
						                       width:80,
						                       value:'1:2000',
						                       emptyText:'请选择',
						                       listeners:{
						                       'select': function(){
						                    	   	
						                           }
						                       }
						                   })
									]
						       	},{
					           		columnWidth:.32,
						           	layout: 'form',
						           	border:false,
						           	items: [
											new Ext.form.ComboBox({
												id:'flyOption_tilt',
											    fieldLabel:'视角(度)',
											    store:tiltStore,
											    displayField:'display',
											    valueField:'display',
											    mode:'local',
											    triggerAction:'all',
											    selectOnFocus:true,
											    width:60,
											    value:'75',
											    emptyText:'请选择',
											    listeners:{
											    'select': function(){
											 	   	
											        }
											    }
											})
										]
						       		}
						       	]
					    	}				
						    ],
								buttons: [
								{
						  			id:'flyOption_startFly',
					    			text: '开始',
					    			listeners: {
					  					click :function(){
					  						var speedPerSecond = parseFloat($('flyOption_speed').value) * 1000 / 3600;
					  						var strScale = $('flyOption_zoom').value;
					  						var scaleStrings = strScale.split(':');
					  						var scale = 0;
					  						if(scaleStrings.length==2 && !isNaN(scaleStrings[1])) {
					  							scale = parseFloat(scaleStrings[1]);
					  						} else if(!isNaN(strScale)) {
					  							scale = parseFloat(strScale)
					  						}
					  						if(scale==0) {
					  							Ext.Msg.alert('系统提示','请选择合适的比例尺。');
					  							return;
					  						}
					  						var tilt = parseFloat($('flyOption_tilt').value);
					  						var doRecording =false;
					  						flyOptionWindow.items.items[0].buttons[0].disable();
					  						flyOptionWindow.items.items[0].buttons[1].enable();
					  						flyOptionWindow.items.items[0].buttons[2].enable();
					  						console.log("obj.points"+bugFixed.points);
					  						startFly(bugFixed.points,scale,tilt,'0.001D');
					  					}
									}
					    		},
					    		{
					    	  		id:'flyOption_pauseFly',
					        		text: '暂停',
					        		listeners: {
					  					click :function(){
					  						flyOptionWindow.items.items[0].buttons[0].disable();		
					  						flyOptionWindow.items.items[0].buttons[1].enable();
					  						flyOptionWindow.items.items[0].buttons[2].enable();
					  						if(flyOptionWindow.items.items[0].buttons[1].getText()=='继续') {
					  							flyOptionWindow.items.items[0].buttons[1].setText('暂停');
					  							resumeFly();
					  						} else if(flyOptionWindow.items.items[0].buttons[1].getText()=='暂停'){
					  							flyOptionWindow.items.items[0].buttons[1].setText('继续');
					  							pauseFly();				
					  						}
					  					}
					    			}
					    		},
					    		{
					    	  		id:'flyOption_endFly',
					        		text: '结束',
					        		listeners: {
					  					click :function(){
					  						flyOptionWindow.items.items[0].buttons[0].enable();		
					  						flyOptionWindow.items.items[0].buttons[1].enable();
					  						flyOptionWindow.items.items[0].buttons[2].enable();
					  						quitFly();
					  					}
					    			}
					    		}
					    ]
					})
	       		]
	  		});
    	}
	  flyOptionWindow.show();
	  $('flyOption_routeMinute').innerText = minute;
	  $('flyOption_routeSecond').innerText = second;
	  $('flyOption_routeLength').innerText = distance;
	  //PeKong.menu.flyroute.resetButtons();
}
</script>
<body>
	<div id="north" align="center">
		<%-- <img src="${ctx}/images/banner_01.png" width="100%" height="83" style="border:0;"> --%>
		<img src="${ctx}/images/banner_03.png" width="55%" height="83" border="0" style="cursor:pointer;z-index:600; top:3%;;position:absolute; left:0px;">
		<img src="${ctx}/images/banner_02.png" width="100%" height="83" style="z-index:500; top:0px;position:absolute; right:0px;" >
		
		<span onclick="showMenu('layerManage','图层管理');" style="cursor:pointer;z-index:1000; position:absolute; right:43%; top:14px; width: 68px; height: 61px;font-size:13px;">
			<img src="${ctx}/images/projectShow.png" alt="图层管理"/><div style="font-weight:bold;color:#FFF">图层管理</div>
		</span>
		
		<span onclick="showMenu('staticsquery','统计分析');" style="cursor:pointer;z-index:1000; position:absolute; right:35%; top:14px; width: 68px; height: 61px;font-size:13px;">
			<img src="${ctx}/images/view.png" alt="统计分析"/><div style="font-weight:bold;color:#FFF">统计分析</div>
		</span>
		 
		<span onclick="showMenu('spatialAnalysis','空间分析');" style="cursor:pointer;z-index:1000; position:absolute; right:27%; top:14px; width: 68px; height: 61px;font-size:13px;">
			<img src="${ctx}/images/spatial.png" alt="空间分析"/><div style="font-weight:bold;color:#FFF">空间分析</div>
		</span>
		
		<span onclick="showMenu('queryID','查询');" style="cursor:pointer;z-index:1000; position:absolute; right:19%; top:14px; width: 68px; height: 61px;font-size:13px;">
			<img src="${ctx}/images/query.png" alt="查询"/><div style="font-weight:bold;color:#FFF"">查询</div>
		</span>
		
		<span onclick="showMenu('themequery','专题图');" style="cursor:pointer;z-index:1000; position:absolute; right:11%; top:14px; width: 68px; height: 61px;font-size:13px;">
			<img src="${ctx}/images/loadSHP.png" alt="专题图"/><div style="font-weight:bold;color:#FFF"">专题图</div>
		</span>
		
		<span onclick="showMenu('systemManage','系统管理');" style="cursor:pointer;z-index:1000; position:absolute; right:3%; top:14px; width: 68px; height: 61px;font-size:13px;">
			<img src="${ctx}/images/system.png" alt="系统管理"/><div style="font-weight:bold;color:#FFF">系统管理</div>
		</span>
	</div>
	
	<div style="display:none;">
		<div id="infoMenu">
			<table style="border:0;" width="100%">
				<tr align="center">
					<td width="25%" onclick="IndexTool.openInfo('water','水文信息');" style="cursor:pointer;"><img src="${ctx}/images/SWXX.png" alt="水文信息"/><div style="font-size:14px;">水文信息</div></td>
					<td width="25%" onclick="IndexTool.openInfo('water','水位信息');" style="cursor:pointer;"><img src="${ctx}/images/SWXX1.png" alt="水位信息"/><div style="font-size:14px;">水位信息</div></td>
					<td width="25%" onclick="IndexTool.openInfo('water','两情信息');" style="cursor:pointer;"><img src="${ctx}/images/YQXX.png" alt="两情信息"/><div style="font-size:14px;">雨情信息</div></td>
					<td width="25%" onclick="IndexTool.showVideoInfo('water','视频监控');" style="cursor:pointer;"><img src="${ctx}/images/SPJK.png" alt="视频监控"/><div style="font-size:14px;">视频监控</div></td>
				</tr>
				<tr align="center">
					<td onclick="IndexTool.openInfo('water','气象信息');" style="cursor:pointer;"><img src="${ctx}/images/QXXX.png" alt="气象信息"/><div style="font-size:14px;">气象信息</div></td>
					<td onclick="IndexTool.openInfo('water','地震监测信息');" style="cursor:pointer;"><img src="${ctx}/images/DZJCXX.png" alt="地震监测信息"/><div style="font-size:14px;">地震监测</div></td>
					<td onclick="IndexTool.openInfo('water','积雪监测信息');" style="cursor:pointer;"><img src="${ctx}/images/JXJCXX.png" alt="积雪监测信息"/><div style="font-size:14px;">积雪监测</div></td>
					<td onclick="IndexTool.openInfo('water','大坝监测信息');" style="cursor:pointer;"><img src="${ctx}/images/DBJCXX.png" alt="大坝监测信息"/><div style="font-size:14px;">大坝监测</div></td>
				</tr>
				<tr align="center">
					<td onclick="IndexTool.openInfo('water','发电站信息');" style="cursor:pointer;"><img src="${ctx}/images/FDZXX.png" alt="发电站信息"/><div style="font-size:14px;">电站信息</div></td>
					<td onclick="IndexTool.toggleReservoirVolume(true);" style="cursor:pointer;"><img src="${ctx}/images/SWKRZTT.png" alt="水位库容曲线分析"/><div style="font-size:14px;">曲线分析</div></td>
					<td></td>
					<td></td>
				</tr>
			</table>
		</div>
		<div id="queryMenu">
			<table style="border:0;" width="100%">
				<tr align="center">
					<td width="25%" onclick="queryTool2D.openInfo('query_xb','小班查询');" style="cursor:pointer;"><img src="${ctx}/images/SWXX.png" alt="小班查询"/><div style="font-size:14px;">小班查询</div></td>
					<td width="25%" onclick="queryTool2D.openInfo('query_ld','林班查询');" style="cursor:pointer;"><img src="${ctx}/images/SWXX1.png" alt="林带查询"/><div style="font-size:14px;">林带查询</div></td>
					<td width="25%" onclick="queryTool2D.openInfo('query_cond','条件查询');" style="cursor:pointer;"><img src="${ctx}/images/YQXX.png" alt="条件查询"/><div style="font-size:14px;">条件查询</div></td>
					<td width="25%"/>
				</tr>
			</table>
		</div>
		<div id="spatialAnalysisMenu">
			<table style="border:0;" width="100%">
				<tr align="center">
					<td width="25%" onclick="IndexTool.toggleAnalyse('sightAnalyseForm');" style="cursor:pointer;"><img src="${ctx}/images/TSFX.png" alt="通视分析"/><div style="font-size:14px;">通视分析</div></td>
					<td width="25%" onclick="IndexTool.toggleAnalyse('slopeAnalyseForm');" style="cursor:pointer;"><img src="${ctx}/images/PDPXFX.png" alt="坡度坡向分析"/><div style="font-size:14px;">坡度坡向</div></td>
					<%-- <td width="25%" onclick="IndexTool.toggleAnalyse('waterFloodAnalyseForm');" style="cursor:pointer;"><img src="${ctx}/images/SYFX.png" alt="水淹分析"/><div style="font-size:14px;">水淹分析</div></td> --%>
					<td width="25%" onclick="IndexTool.toggleAnalyse('terrainAnalyseForm');" style="cursor:pointer;"><img src="${ctx}/images/PMFX.png" alt="剖面分析"/><div style="font-size:14px;">剖面分析</div></td> 
					<td onclick="IndexTool.toggleAnalyse('measureAnalyseForm');" style="cursor:pointer;"><img src="${ctx}/images/projectShow.png" alt="量算分析"/><div style="font-size:14px;">量算分析</div></td>
				</tr>
				<tr align="center">
<%-- 					<td onclick="IndexTool.toggleAnalyse('fluctuateAnalyseForm');" style="cursor:pointer;"><img src="${ctx}/images/XLQFX.png" alt="消落区分析"/><div style="font-size:14px;">消落区分析</div></td> --%>
<%-- 					<td onclick="IndexTool.toggleAnalyse('digFillAnalyseForm');" style="cursor:pointer;"><img src="${ctx}/images/WTFFX.png" alt="挖填方分析"/><div style="font-size:14px;">挖填方分析</div></td>
					<td onclick="IndexTool.toggleAnalyse('lightAnalyseForm');" style="cursor:pointer;"><img src="${ctx}/images/TYGZ.png" alt="光照分析"/><div style="font-size:14px;">光照分析</div></td> --%>
				</tr>
				<tr align="center" height="70">
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
			</table>
		</div>
		<div id="systemManageMenu">
			<table style="border:0;" width="100%">
				<tr align="center">
					<td width="25%" onclick="App.tabs.userManager.init();" style="cursor:pointer;"><img src="${ctx}/images/usersManagerment.png" alt="用户管理"/><div style="font-size:14px;">用户管理</div></td>
					<td width="25%" onclick="App.tabs.roleManager.init();" style="cursor:pointer;"><img src="${ctx}/images/roleManagerment.png" alt="角色管理"/><div style="font-size:14px;">角色管理</div></td>
					<td width="25%" onclick="App.tabs.moduleManager.init();" style="cursor:pointer;"><img src="${ctx}/images/limitsManagerment.png" alt="权限管理"/><div style="font-size:14px;">权限管理</div></td>
					<td width="25%" onclick="App.tabs.logManager.init();" style="cursor:pointer;"><img src="${ctx}/images/logsMangerment.png" alt="日志管理"/><div style="font-size:14px;">日志管理</div></td>
				</tr>
			</table>
		</div>
		<div id="queryButtonMenu">
			<table style="border:0;" width="100%">
				<tr align="center">
					<td width="25%" onclick="startDrawShape('Polygon');" style="cursor:pointer;"><img src="${ctx}/images/icon/quest_pol.png" alt="多边形"/></td>
					<td width="25%" onclick="startDrawShape('Rectangle');" style="cursor:pointer;"><img src="${ctx}/images/icon/quest_rec.png" alt="正方形"/></td>
					<td width="25%" onclick="startDrawShape('Circle');" style="cursor:pointer;"><img src="${ctx}/images/icon/quest_cir.png" alt="圆"/></td>
					<td width="25%" onclick="clearQuery();" style="cursor:pointer;"><img src="${ctx}/images/icon/clear.png" alt="清除"/></td>
				</tr>
			</table>
		</div>
		
		<div id="measureAnalyseMenu">
			<table style="border:0;" width="100%">
				<tr align="center">
					<td width="25%" onclick="IndexTool.stopAllTool();startMeasureDistance('0');" style="cursor:pointer;"><img src="${ctx}/images/measureDistance.png" alt="测距离"/><div style="font-size:13px;">测距离</div></td>
					<td width="25%" onclick="IndexTool.stopAllTool();startMeasureArea('1');" style="cursor:pointer;"><img src="${ctx}/images/measureArea.png" alt="测面积"/><div style="font-size:13px;">测面积</div></td>
					<td width="25%" onclick="IndexTool.stopAllTool();startMeasureHeight();" style="cursor:pointer;"><img src="${ctx}/images/measureHeight.png" alt="测高度"/><div style="font-size:13px;">测高度</div></td>
					<td width="25%" onclick="IndexTool.stopAllTool();startMeasureVolume();" style="cursor:pointer;"><img src="${ctx}/images/measureVolume.png" alt="测体积"/><div style="font-size:13px;">测体积</div></td>
				</tr>
			</table>
		</div>
		
		<div id="lightAnalyseMenu">
			<table style="border:0;" width="100%">
				<tr align="center">
					<td width="25%" onclick="IndexTool.stopAllTool();ViewControlTool.elementToggle(9,true);" style="cursor:pointer;"><img src="${ctx}/images/TYGZ.png" alt="太阳光照"/><div style="font-size:13px;">太阳光照</div></td>
					<td width="25%" onclick="IndexTool.stopAllTool();ViewControlTool.elementToggle(8,true);" style="cursor:pointer;"><img src="${ctx}/images/WHXS.png" alt="雾化显示"/><div style="font-size:13px;">雾化显示</div></td>
					<td width="25%"></td>
					<td width="25%"></td>
				</tr>
			</table>
		</div>
	</div>
	<div id="center1">
		<div id="2dMap" style="overflow:hidden;"></div>
	</div>
	<div id="props-panel" style="width:200px;height:200px;overflow:hidden;"></div>
  </body>
</html>
