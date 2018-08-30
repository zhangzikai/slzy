/**
 * 
 */
Ext
		.define(
				'MyApp.view.MyViewport',
				{
					extend : 'Ext.container.Viewport',
					alias : 'widget.ViewportWidget',

					requires : [ 'Ext.toolbar.Toolbar', 'Ext.form.Label', 'Ext.toolbar.Fill', 'Ext.tree.Panel', 'Ext.tree.View', 'Ext.button.Button' ],

					layout : 'border',

					initComponent : function() {
						var me = this;

						Ext
								.applyIf(
										me,
										{
											items : [
													{
														xtype : 'container',
														name : 'top',
														region : 'north',
														height : 83,
														layout : 'fit',
														items : [ {
															xtype : 'toolbar',
															html : '<div class="top" style="height:83px; width:100%;background-image:url(' + hostPath
																	+ '/ztt/image/banner.jpg);background-repeat:repeat"></div>',
															items : [ {
																xtype : 'label',
																name : 'title',
																text : '辽宁省森林资源专题图',
																style : 'font-size:48px;color:white'
															}, {
																xtype : 'tbfill'
															} ]
														} ]
													},
													{
														xtype : 'treepanel',
														header : true,
														name : 'xzqhTree',
														title : '行政区划',
														header : false,
														rootVisible : true,
														region : 'west',
														split : true,
														width : 241,
														viewConfig : {

														},
														useArrows : true,
														columns : [ { // 定义tree的列
															xtype : 'treecolumn',
															text : '行政区划', // 显示的表头列名称
															flex : 1,
															sortable : true,
															dataIndex : 'text' // 对应store的列字段名称
														} ],
														store : Ext.create('Ext.data.TreeStore', {
															proxy : {
																type : 'ajax',
																url : hostPath +'/j2UnitCode.jhtml?method=queryList'
															// url:
															// hostPath
															// +'/j2UnitCode.jhtml?method=queryList'
															},
															root : {
																expanded : true,
																text : cur_areaName,// "辽宁省",
																id : cur_areaID,// '0021',
																leaf : false
															},
															// autoLoad:true,
															fields : [ 'text', 'value', 'codelevel', 'code' ]
														// 跟旧版本extjs一样，节点的id和显示文本
														}),
														listeners : {
															itemclick : function(tree, record, item, index, e, eOpts) {
																var codelevel = record.get('codelevel');
																var code = record.get('code');
																var data;
																var field;
																var url;
																if (codelevel == "2") {
																	field = "c_shi";
																	data = config.shi.layerServerName;// "shwy:shi";
																	url = config.shi.wfs_url;
																} else if (codelevel == "3") {
																	field = "c_xian";
																	data = config.xian.layerServerName;// "shwy:xian";
																	url = config.xian.wfs_url;
																} else if (codelevel == "4") {
																	field = "c_xiang";
																	data = config.xiang.layerServerName;// "shwy:xiang";
																	url = config.xiang.wfs_url;
																} else if (codelevel == "5") {
																	field = "c_cun";
																	data = config.cun.layerServerName;// "shwy:cun";
																	url = config.cun.wfs_url;
																} else {
																	return;
																}

																var filtertemp = new OpenLayers.Filter.Comparison({// 比较操作符
																	type : OpenLayers.Filter.Comparison.EQUAL_TO,
																	property : field,
																	value : code
																})

																var filter = new OpenLayers.Filter.Logical({
																	type : OpenLayers.Filter.Logical.AND
																});
																filter.filters[0] = filtertemp;
																filter.filters[1] = filtertemp;

																// 构造请求数据
																var filter_1_0 = new OpenLayers.Format.Filter.v1_0_0();
																var xml = new OpenLayers.Format.XML();
																var xmlPara = "<?xml version='1.0' encoding='UTF-8'?>" + "<wfs:GetFeature maxFeatures='50' service='WFS' version='1.0.0' "
																		+ "xmlns:wfs='http://www.opengis.net/wfs' " + "xmlns:gml='http://www.opengis.net/gml' "
																		+ "xmlns:ogc='http://www.opengis.net/ogc' " + "xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' "
																		+ "xsi:schemaLocation='http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/wfs.xsd'>" + "<wfs:Query typeName='"
																		+ data + "' srsName='EPSG:4610' >" + xml.write(filter_1_0.write(filter)) + "</wfs:Query>" + "</wfs:GetFeature>";
																// 发送请求
																var request = OpenLayers.Request.POST({
																	url : url,
																	data : xmlPara,// 请求数据
																	callback : function(req) {
																		var gml = new OpenLayers.Format.GML();
																		var features = gml.read(req.responseText);
																		// 选中高亮效果
																		locateResultLayer.removeAllFeatures();
																		locateResultLayer.addFeatures(features[0]);
																		// 定位
																		map.zoomToExtent(features[0].geometry.bounds);

																		// 选中高亮效果
																		locateResultLayer.removeAllFeatures();
																		// 定位
																		map.zoomToExtent(features[0].geometry.bounds);
																	}
																})
															}
														}
													},
													{
														xtype : 'panel',
														region : 'center',
														header : false,
														title : 'My Panel',
														dockedItems : [ {
															xtype : 'toolbar',
															dock : 'top',
															height : 36,
															items : [
															// {
															// xtype:
															// 'button',
															// text:
															// '放大'
															// },
															// {
															// xtype:
															// 'button',
															// text:
															// '缩小'
															// },
															// {
															// xtype:
															// 'button',
															// text:
															// '平移'
															// },
															{
																xtype : 'button',
																text : '显示标题',
																handler : function() {
																	var value = Ext.get('zttTitle').dom.style.display;
																	if (value == "block") {
																		Ext.get('zttTitle').dom.style.display = 'none';
																	} else {
																		Ext.get('zttTitle').dom.style.display = 'block';
																	}
																}
															}, {
																text : '平移',
																handler : function() {
																	buttonClicked = null;
																	// closezoom();
																}
															}, {
																text : '清除',
																handler : function() {
																	queryResultLayer.removeAllFeatures();
																	// closezoom();
																}
															}, {
																text : '点选 查询',
																handler : function() {
																	buttonClicked = 'selectByPnt';
																	// closezoom();
																}
															}, {
																xtype : 'button',
																text : '全屏',
																handler : function() {
																	var top = Ext.ComponentQuery.query('container[name="top"]')[0];
																	var left = Ext.ComponentQuery.query('treepanel[name="xzqhTree"]')[0];
																	if (!isFullScreen) {
																		top.setVisible(false);
																		left.setVisible(false);
																		isFullScreen = true;
																	} else {
																		top.setVisible(true);
																		left.setVisible(true);
																		isFullScreen = false;
																	}
																}
															}, {
																text : '打印',
																handler : function() {
																	var code = "<body onload=window.print()>";
																	code += document.getElementById("2dMap").innerHTML;// 获取center1
																	// div
																	width = map.viewPortDiv.clientWidth;// 获取地图宽度
																	height = map.viewPortDiv.clientHeight;
																	var newwin = window.open('', '我的地图', 'width=' + width + ',height=' + height + ',resizable=no');
																	newwin.opener = null;
																	newwin.document.write(code);
																	newwin.document.close();
																}
															} ]
														} ],
														html : '<div style="height:100%;width:100%;position:relative;"><div id="2dMap" style="height:100%;width:100%;position:absolute;z-index:1"></div><p id="zttTitle" class="hover" style="display:block;font-size:32px;color:blue;position:absolute;top:-20px;left:500px;z-index:2">专题图</p></div>'
													// html:'<div id="2dMap"
													// style="height:100%;width:100%;"></div>'
													}, {
														xtype : 'container',
														region : 'south',
														height : 33
													} ]
										});

						me.callParent(arguments);
					}

				});