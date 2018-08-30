/**
 * 
 */
//查询类型
var queryType='query_xb';
var queryStore= new Ext.data.JsonStore({fields : ['objectid','c_xb','c_dilei'],data : []});
var queryData=[];

var queryTool2D={
	//查询
	xbquery:{
		border:false,
		layout:'fit',
		id:'queryID',
		autoHeight:true,
		items:[{
				el : 'queryMenu',
				items:[{
						id:'searchPanel',
						title : '小班查询',
						autoScroll:true,
						hidden:false,
						//autoHeight:true,
						height:600,
						border : true,
						items:[new Ext.Panel({
					        bodyStyle: 'padding:5px 5px 0',
					        autoWidth:true,
					        height:180,
					        border : false,
					        items: [
								{
								    xtype:'fieldset',
								    id:'fieldsetArea',
								    autoWidth:true,
								    items :[
											{
					                            xtype: 'treepicker',
					                            fieldLabel: '行政区划',
					                            labelAlign: 'right',
					                            labelWidth: 80,
					                            anchor: '100%',
					                            margin: 10,
					                            id:'xblocationUnit',
					                            name: 'unitID',
					                            displayField: 'text',
					                            valueField: 'value',
					                            rootVisible: true,
					                            maxPickerHeight:300,
					                            store: Ext.create('Ext.data.TreeStore', {
					                                fields: ['text', 'value','codelevel','code'],
					                                root: {
					                                	expanded: true,
														text : cur_areaName,//"辽宁省",
														id : cur_areaID,//'0021',
											            leaf:false
					                                },
					                                proxy: {
					                                    type: 'ajax',
					                                    url: SystemTool.basePath +'/j2UnitCode.jhtml?method=queryList',
					                                    reader: {
					                                        type: 'json'
					                                    }
					                                }
					                            })
					                        }]
								},
					            {
						            xtype:'fieldset',
						            autoWidth:true,
						            id:'fieldsetXB',
						            items :[
										{
								        	xtype:'textfield',
								            fieldLabel: '林班号',
								            name: 'lbh',
								            id: 'lbhID',
								            width: 150
								        },{
								        	xtype:'textfield',
								            fieldLabel: '小班号',
								            name: 'xbh',
								            id: 'xbhID',
								            width: 150
									    }
						            ]
						        },{
						        	xtype:'fieldset',
						            autoWidth:true,
						            hidden:true,
						            id:'fieldsetCond',
						            items :[
										{
											xtype:'combo',
											fieldLabel:'字段',
											name:'fieldName',
										    store: new Ext.data.JsonStore({
										    	autoDestroy: true,
										    	autoLoad:true,
										        url: SystemTool.basePath + '/xbField.jhtml?method=queryList&isEnable=1',
										        storeId: 'fieldStore',
										        // reader configs
										        root: null,
										        idProperty: 'name',
										        fields: ['fieldName', 'fieldAlias','codeName']
										    }),
										    mode: 'local',
											valueField: 'fieldName',
											displayField: 'fieldAlias',
											id:'fieldID',
											width:150,
											listeners:{
										        'select': function(combo, record, index){
										        	var store = Ext.getCmp('valID').getStore();
										        	var codeId = record.get('fieldName');
										        	var codeName = record.get('codeName');
										        	if(codeName==""){
										        		store.removeAll();
										        		return;
										        	}
										        	store.load({params:{codeName:codeName,codeId:codeId}});
										        }
										    }
										},{
											xtype:'combo',
											fieldLabel:'关系',
											name:'relName',
											store:new Ext.data.ArrayStore({
										        fields: ['rel','relName'],
										        data: [['=', '等于']]
										    }),
										    mode: 'local',
											valueField: 'rel',
											displayField: 'relName',
											id:'relID',
											width:150
										},{
											xtype:'combo',
											fieldLabel:'值',
											store:new Ext.data.JsonStore({
										    	autoDestroy: true,
										    	autoLoad:true,
										        url: SystemTool.basePath + '/codeTable.jhtml?method=queryList',
										        storeId: 'valueStore',
										        // reader configs
										        root: null,
										        idProperty: 'name',
										        fields: ['psbCode', 'psbValue']
										    }),
										    mode: 'local',
											valueField: 'psbCode',
											displayField: 'psbValue',
											name:'valName',
											id:'valID',
											width:150
										}
						            ]
						        }
					        ],
					        buttons: [{
					            text: '查询',
					            handler:function(){
					            	/*points=stopQueryTool();
					            	if(Ext.getCmp('layerName').getValue()!=""){
					            		QueryTool.doQuery(Ext.getCmp('layerName').getValue(),Ext.get('keyword').dom.value,points);
					            	}*/
					            	queryTool2D.doQuery();
					            }
					        }]
						}),
						new Ext.grid.GridPanel({
							id:'resultGrid',
							hidden:false,
							title:'查询结果',
							border : true,
							columnLines : true,
							autoScroll : true,
							store : queryStore,
							//autoHeight:true,
							height:270,
							stripeRows:true,
							loadMask : {msg : '正在加载数据……'},
							colModel: new Ext.grid.ColumnModel({
						        defaults: {
						            width: 150,
						            sortable: false
						        },
						        columns: [
						            new Ext.grid.RowNumberer(),
						            {header: '小班ID', dataIndex: 'objectid',width:90},
						            {header: '小班号', dataIndex: 'c_xb',width:90},
						            {header: '地类', dataIndex: 'c_dilei',width:120}
						        ]
						    }),
						    listeners:{
								rowclick:function(grid,rowIndex,e){
									locateResultFeature(rowIndex);
								}
							}
						})
						]
					}
				 ]
			}/*,
			new Ext.grid.GridPanel({
				id:'userGrid',
				border : false,
				columnLines : true,
				autoScroll : true,
				store : store,
				autoHeight:true,
				stripeRows:true,
				cm : cm,
				sm : sm,
				loadMask : {msg : '正在加载数据……'}
			})*/
			]
	},
	
	//专题信息
	themequery:{
		border:false,
		layout:'fit',
		id:'themequery',
		autoHeight:true,
		items:[new Ext.grid.GridPanel({
			id:'themeGrid',
			hidden:false,
			header:false,
			title:'专题图',
			border : true,
			columnLines : true,
			autoScroll : true,
			store : new Ext.data.JsonStore({
		        fields: ['themeName','url','theme'],
		        url:SystemTool.basePath+'/themeMap.jhtml?method=queryList',
		        autoLoad:true
		    }),
			autoHeight:true,
			stripeRows:true,
			loadMask : {msg : '正在加载数据……'},
			colModel: new Ext.grid.ColumnModel({
		        defaults: {
		            width: 150,
		            sortable: false
		        },
		        columns: [
		            new Ext.grid.RowNumberer(),
		            {header: '专题图名称', dataIndex: 'themeName',width:250},
		            {header: '地址', dataIndex: 'url',hidden:true}
		        ]
		    }),
		    listeners:{
				rowclick:function(grid,rowIndex,e){
					var themeNum = grid.getStore().getAt(rowIndex).get('theme');
					Ext.util.CSS.swapStyleSheet('theme', 'extjs3/resources/theme/'+themeNum+'/resources/css/ext-all.css');  
					var name=grid.getStore().getAt(rowIndex).get('themeName');
					var url=grid.getStore().getAt(rowIndex).get('url');
					loadThemeLayer(name,url);
				}
			}
		})]
	},
	
	//统计信息
	staticsquery:{
		border:false,
		layout:'fit',
		tbar : [],
		id:'staticsquery',
		autoHeight:false,
		height:550,
		items:[new Ext.grid.GridPanel({
			id:'staticsGrid',
			hidden:false,
			header:false,
			title:'统计表',
			border : true,
			columnLines : true,
			autoScroll : true,
			store : new Ext.data.JsonStore({
		        fields: ['name','alias'],
		        data:[
				        {name:'table1',alias:'附表01.各类土地面积统计表'},
				        {name:'table2',alias:'附表02.各类土地按土地使用权面积统计表'},
				        {name:'table3',alias:'附表03.各工程类别面积统计表'},
				        {name:'table4',alias:'附表04.各类土地按水系面积统计表'},
				        {name:'table5',alias:'附表05.各类土地按生态区位面积统计表'},
				        {name:'table6',alias:'附表06.各类森林林木面积蓄积统计表'},
				        {name:'table7',alias:'附表07.各类森林林木按水系面积蓄积统计表'},
				        {name:'table8',alias:'附表08.各类森林林木按生态分区面积蓄积统计表'},
				        {name:'table9',alias:'附表09.林分按组成树种面积蓄积统计表'},
				        {name:'table10',alias:'附表10.公益林(地)面积统计表'},
				        {name:'table11',alias:'附表11.各工程类别公益林(地)面积统计表'},
				        {name:'table12',alias:'附表12.商品林(地)面积统计表'},
				        {name:'table13',alias:'附表13.各工程类别商品林(地)面积统计表'},
				        {name:'table14',alias:'附表14.林分各林种按龄组面积蓄积统计表'},
				        {name:'table15',alias:'附表15.人工林面积蓄积统计表'},
				        {name:'table16',alias:'附表16.天然林面积蓄积统计表'},
				        {name:'table17',alias:'附表17.用材林按龄级面积蓄积统计表'},
				        {name:'table18',alias:'附表18.用材林近成过熟林按组成树种可及度面积蓄积统计表'},
				        {name:'table19',alias:'附表19.经济林面积统计表'},
				        {name:'table20',alias:'附表20.立地类型面积统计表'},
				        {name:'table21',alias:'附表21.各立地类型小班一览表'},
				        {name:'table22',alias:'附表22.经营措施类型面积蓄积统计表'},
				        {name:'table23',alias:'附表23.非林地造林面积蓄积统计表'}
		        ]
		    }),
		    height:550,
			stripeRows:true,
			loadMask : {msg : '正在加载数据……'},
			colModel: new Ext.grid.ColumnModel({
		        defaults: {
		            width: 150,
		            sortable: false
		        },
		        columns: [
		            new Ext.grid.RowNumberer(),
		            {header: '表名称', dataIndex: 'alias',width:250},
		            {header: '表名称', dataIndex: 'name',hidden:true}
		        ]
		    }),
		    listeners:{
				rowclick:function(grid,rowIndex,e){
					var data = grid.getStore().getAt(rowIndex);
					var name = data.get('name');
					//window.open ('/slzy/servlet/ReadExcel?type='+name, 'newwindow', 'height=600, width=800, top=0, left=0, toolbar=no, menubar=no, scrollbars=yes, resizable=no,location=n o, status=yes') 
					
					var win = new Ext.Window({
						title:'统计条件',
						height:400,
						width:350,
						iconCls:'edit-icon',
						constrain:true,
						modal:true,
						resizable:false,
						closeAction:'close',
						bodyStyle:'background-color:white;',
						listeners:{
							close:function(){win.destroy();win = null;}
						},
						items:[
						   {
							   xtype:'panel',
							   height:30,
							   layout:'hbox',
							   align:'middle',
							   items:[
							      {
							    	  xtype:"myComboxTree",emptyText:'请选择地区',id:'cmbAreaID',width:150,
										fieldLabel: "地    区",
										tree:new Ext.tree.TreePanel({
											id:'dqTree-',
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
							    	  xtype:'combo',
							    	  emptyText:'请选择年度',
								      fieldLabel:'年度',
									  name:'fieldName',
									  store:new Ext.data.ArrayStore({
									        fields: ['year','year'],
									        data: [['2011','2011'],['2012', '2012'],['2013', '2013'],['2014', '2014'],['2015', '2015']]
									    }),
									  mode: 'local',
								      valueField: 'year',
									  displayField: 'year',
									  id:'cmbYearID',
									  width:100
							      },
							      {
							    	  xtype:'button',
							    	  text:'统计',
							    	  handler:function(){
							    		  var areaCode = Ext.getCmp('cmbAreaID').code;
							    		  var year = Ext.getCmp('cmbYearID').value;
							    		  var tableName = 'j2'+areaCode.substring(0,6)+'tjnew01_'+year;
							    		  var tjdw = areaCode;
							    		  var grid = Ext.getCmp('queryStaticsGrid');
							    		  var selections = grid.getSelectionModel().getSelections();
							    		  if(selections.length<1)return;
							    		  var alias=[];
							    		  var fields='';
							    		  for (var i = 0; i < selections.length; i++) {
					                           var record = selections[i];
					                           //fields+=record.data.name+',';
					                           alias.push(record.data.alias);
					                           if(record.data.isCode!='1'){
					                        	   fields+=record.data.name+',';
					                           }else if(record.data.isUnit=='1'){
					                        	   fields+='(select name from j2_unitcode where CODE='+record.data.name+'),';
					                           }
					                           else{
					                        	   fields+='(select PSB_VALUE from code_table where CODE_ID=\''+record.data.code_id+'\' and PSB_CODE='+record.data.name+'),';
					                           }
					                      }
							    		  
							    		  fields = fields.substring(0, fields.length-1);

							    		  Ext.Ajax.request({
							    			  url:SystemTool.basePath+'/tjTable.jhtml?method=findData',
							    			  params:{
							    				  tabelName:tableName,
							    				  tjdw:tjdw,
							    				  fields:fields
							    			  },
							    			  success:function(req){
							    				  var data = req.responseText;
							    				  var objs = Ext.util.JSON.decode(data);
							    				 
							    				  var ht = '<table class="gridtable"><tr>'
					    				  		  // 表头
							    				  for(var i=0;i<alias.length;i++){
							    					  ht+='<th>'+alias[i]+'</th>';
							    				  }
							    				  ht+='</tr>';
							    				  for(var j=0;j<objs.length;j++){
							    					  ht += '<tr>';
							    					  for(var k=0;k<objs[j].length;k++){
							    						  ht+='<td>'+objs[j][k]+'</td>';
							    					  }
							    					  ht += '</tr>';
							    				  }
					    				  				
							    				  ht+='</table>';
							    				  
							    				  
							    				  var win = new Ext.Window({
							  						title:'统计结果',
													height:600,
													width:800,
													iconCls:'edit-icon',
													constrain:true,
													modal:true,
													resizable:true,
													closeAction:'close',
													bodyStyle:'background-color:white;',
													listeners:{
														close:function(){win.destroy();win = null;}
													},
													html:ht
							    				  });
							    				  win.show();
							    			  }
							    		  })
							    	  }
							      }
							   ]
						   },
						   {
							   xtype:'grid',
							   id:'queryStaticsGrid',
								hidden:false,
								header:false,
								title:'统计表',
								border : true,
								columnLines : true,
								autoScroll : true,
								store : new Ext.data.JsonStore({
							        fields: ['name','alias','isCode','isUnit','code_id'],
							        url:SystemTool.basePath+'/tableMetadata.jhtml?method=queryList'
//							        data:[
//									        {name:'c_tjdw',alias:'统计单位',isCode:'1',isUnit:'1',code_id:''},
//									        {name:'c_tdsyq',alias:'土地所有权',isCode:'1',isUnit:'0',code_id:'C_TDSY'},
//									        {name:'c_sllb',alias:'森林类别',isCode:'1',isUnit:'0',code_id:''},
//									        {name:'D_ZMJ',alias:'总面积',isCode:'0',isUnit:'0',code_id:''}
//							        ]
							    }),
							    height:550,
								stripeRows:true,
								loadMask : {msg : '正在加载数据……'},
								colModel: new Ext.grid.ColumnModel({
							        defaults: {
							            width: 150,
							            sortable: false
							        },
							        columns: [
							            new Ext.grid.RowNumberer(),
							            new Ext.grid.CheckboxSelectionModel({
							            	singleSelect:false
							            }),
							            {header: '列名称', dataIndex: 'alias',width:250},
							            {header: '列名称', dataIndex: 'name',hidden:true},
							            {header: '是否为Code', dataIndex: 'isCode',hidden:true}
							        ]
							    })
						   }
						]
					});
					win.show();
					
					var store = Ext.getCmp('queryStaticsGrid').getStore();
					store.load({
						params:{
							tableType:name
						}
					});
				}
			}
		})]
	},
	
	openInfo:function(type,title){
		if(queryType==type)return;
		//清除查询结果
		
		//设置查询类型及标题
		queryType = type;
		Ext.getCmp('searchPanel').setTitle(title);
		if(queryType=="query_xb"){
			Ext.getCmp('fieldsetXB').setVisible(true);
			Ext.getCmp('fieldsetCond').setVisible(false);
		}else if(queryType=="query_ld"){
			Ext.getCmp('fieldsetXB').setVisible(true);
			Ext.getCmp('fieldsetCond').setVisible(false);
		}else if(queryType=="query_cond"){
			Ext.getCmp('fieldsetXB').setVisible(false);
			Ext.getCmp('fieldsetCond').setVisible(true);
		}
	},
	
	doQuery:function(){
		if(queryType=="query_xb"){
			queryTool2D.queryxb();
		}else if(queryType=="query_ld"){
			queryTool2D.queryld();
		}else if(queryType=="query_cond"){
			queryTool2D.querycond();
		}
	},
	//小班定位
	locateXB:function(cun,linban,xiaoban,callback){
		var text="";
		if(cun!=undefined&& cun!=""){
			text+='c_cun:'+cun+","
		}
		if(linban!=undefined&& linban!=""){
			text+='c_lb:'+linban+","
		}
		if(xiaoban!=undefined&& xiaoban!=""){
			text+='c_xb:'+xiaoban+","
		}
		text=text.substring(0,text.length-1);
		
		if (text == "")
			return;
		var conds = text.split(',');

		var filter = new OpenLayers.Filter.Logical({
			type : OpenLayers.Filter.Logical.AND
		});

		for (var i = 0; i < conds.length; i++) {
			var coms = conds[i].split(':');
			var filtertemp = new OpenLayers.Filter.Comparison({// 比较操作符
				type : OpenLayers.Filter.Comparison.EQUAL_TO,
				property : coms[0],
				value : coms[1]
			})
			filter.filters[i] = filtertemp;
		}

		// 构造请求数据
		var filter_1_0 = new OpenLayers.Format.Filter.v1_0_0();
		var xml = new OpenLayers.Format.XML();
		var xmlPara = "<?xml version='1.0' encoding='UTF-8'?>"
				+ "<wfs:GetFeature maxFeatures='50' service='WFS' version='1.0.0' "
				+ "xmlns:wfs='http://www.opengis.net/wfs' "
				+ "xmlns:gml='http://www.opengis.net/gml' "
				+ "xmlns:ogc='http://www.opengis.net/ogc' "
				+ "xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' "
				+ "xsi:schemaLocation='http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/wfs.xsd'>"
				+ "<wfs:Query typeName='shwy:J2210000JB2012XBM' srsName='EPSG:4610' >"
				+ xml.write(filter_1_0.write(filter)) + "</wfs:Query>"
				+ "</wfs:GetFeature>";
		// 发送请求
		var request = OpenLayers.Request.POST({
			url : wfs_url,
			data : xmlPara,// 请求数据
			callback : callback
			})
	},
	//小班查询
	queryxb:function(){
		var text="";
	    var areaCode = Ext.getCmp('areaID').code;
	    var codelevel = Ext.getCmp('areaID').codelevel;
	    if(areaCode=="")alert("请选择村");
	    if(codelevel=="3"){
		    text+="c_xian:"+areaCode+",";
	    }else if(codelevel=="4"){
		    text+="c_xiang:"+areaCode+",";
	    }else if(codelevel=="5"){
	    	text+="c_cun:"+areaCode+",";
	    }
	    else{
	    	alert("请选择县级以下单位查询");
	    	return;
	    }
	    var lbh = Ext.getCmp('lbhID').getValue();
	    if(lbh!=""){
	    	text+="c_lb:"+lbh+",";
	    }
	    var xbh = Ext.getCmp('xbhID').getValue();
	    if(xbh!=""){
	    	text+="c_xb:"+xbh+",";
	    }
		queryXB(text.substring(0,text.length-1));
	},
	//林带查询
	queryld:function(){
		
		
	},
	//条件查询
	querycond:function(){
		var text="";
	    var areaCode = Ext.getCmp('areaID').code;
	    var codelevel = Ext.getCmp('areaID').codelevel;
	    if(areaCode=="")alert("请选择村");
	    if(codelevel=="3"){
		    text+="c_xian:"+areaCode+",";
	    }else if(codelevel=="4"){
		    text+="c_xiang:"+areaCode+",";
	    }else if(codelevel=="5"){
	    	text+="c_cun:"+areaCode+",";
	    }
	    else{
	    	alert("请选择县级以下单位查询");
	    	return;
	    }
	    var field = Ext.getCmp('fieldID').getValue();
	    var rel = Ext.getCmp('relID').getValue();
	    var val = Ext.getCmp('valID').getValue();
	    if(field!="" && rel!="" && val!=""){
	    	// 目前只支持等于
	    	text += field +":"+val+",";
	    }
		queryXB(text.substring(0,text.length-1));
		
	}
};
