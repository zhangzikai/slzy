/*
 * 飞行路径管理工具 2013-12-20 11:25:16
 * */
//类 FlyLineManageTool
var FlyLineManageTool={
		/**
		*飞行路径管理
		*查询、添加、修改、删除功能
		*/
		flyLineQuery:function(){
			var ds = new Ext.data.Store({//这是数据源
		        proxy : new Ext.data.HttpProxy({url:SystemTool.basePath+'/flyLine.jhtml?method=queryList'}),
		        reader: new Ext.data.JsonReader({
		            root: 'rows',
		            totalProperty: 'total',
		            id: 'id'
		            },['id','linename','line','elevation','linecolor','flyspeed','pitch','startpoint'])
		    });
			var lineColorStore = new Ext.data.ArrayStore({
		        fields: ['name','id'],
		        data :[
		               ['黑色','black'],
		               ['蓝色','blue'],
		               ['红色','red'],
		               ['青色','cyan'],
		               ['灰色','gray'],
		               ['绿色','green'],
		               ['橙色','orange'],
		               ['白色','white'],
		               ['黄色','yellow'],
		               ['洋红','magenta'],
		               ['深灰色','darkGray'],
		               ['浅灰色','lightGray'],
		               ['粉红色','pink']
		         ] // from states.js
		    });
			
		    var colModel = new Ext.grid.ColumnModel([//定义列
		         {header:'ID',width:40,sortable:true,dataIndex:'id'},
		         {header:'名称', width:100,sortable:true,dataIndex:'linename'},
		         {header:'高度',width:60,sortable:true,dataIndex:'elevation'},
		         {header:'颜色',width:60,sortable:true,renderer:function(value){return lineColorStore.query("id",value,false).first().get("name");},dataIndex:'linecolor'},
		         {header:'速度',width:60,sortable:true,dataIndex:'flyspeed'},
		         {header:'视角',width:60,sortable:true,dataIndex:'pitch'},
		         {header:'线路',width:60,hidden:true,sortable:true,dataIndex:'line'}
		        ]);
		    var grid = new Ext.grid.GridPanel({//列表
		    	 tbar : [ {  
	                    xtype : 'button',  
	                    text : '新增',  
	                    handler :function() {
	                    	var newFlyLineForm = new Ext.FormPanel({
	                            labelWidth: 75, // label settings here cascade unless overridden
	                            url:SystemTool.basePath+'/flyLine.jhtml?method=add',
	                            frame:true,
	                            bodyStyle:'padding:5px 5px 0',
	                            autoWidth:true,
	                            autoHeight:true,
	                            defaults: {width: 230},
	                            defaultType: 'textfield',
	                            items: [{
	                                    fieldLabel: '名称',
	                                    name: 'linename',
	                                    anchor:'90%',
	                                    allowBlank:false
	                                },new Ext.form.ComboBox({
	                                     store: lineColorStore,
	                                     displayField:'name',
	                                     fieldLabel: "颜色",
	                                     typeAhead: true,
	                                     valueField: "id",
	                                     mode: 'local',
	                                     forceSelection: true,
	                                     triggerAction: 'all',
	                                     emptyText:'请选择...',
	                                     anchor:'90%',
	                                     selectOnFocus:true,
	                                     name: 'linecolor',
	                                     hiddenName:'combo',
	                                     allowBlank:false
	                                 }),{
	                                	xtype: 'spinnerfield',
	                                	fieldLabel: '高度',
	                                	name: 'elevation',
	                                	minValue: 0,
	                                	maxValue: 10000,
	                                	allowDecimals: true,
	                                	decimalPrecision: 1,
	                                	incrementValue: 1,
	                                	accelerate: true,
	                                	anchor:'90%',
	                                    allowBlank:false
	                                },{
	                                	xtype: 'spinnerfield',
	                                	fieldLabel: '速度',
	                                	name: 'flyspeed',
	                                	minValue: 0.0001,
	                                	maxValue: 0.01,
	                                	allowDecimals: true,
	                                	decimalPrecision: 4,
	                                	incrementValue: 0.0001,
	                                	accelerate: true,
	                                	anchor:'90%',
	                                    allowBlank:false
	                                },new Ext.Slider({
	                                	 fieldLabel: '视角',
	                                	 id:'pitchSlider',
	                                	 anchor:'90%',
	                                	 value:80,
	                                     minValue:0,
	                                     maxValue:180,
	                                     plugins: new Ext.ux.SliderTip()
	                                 }),{
	                                    id:'pitchTxt',
	                                    name:'pitch',
	                                    hideLabel:true,
	                                    hidden:true
	                                },{
	                                    id:'lineTxt',
	                                    name:'line',
	                                    hideLabel:true,
	                                    hidden:true
	                                }
	                            ],
								bbar:[{
										text : '线',
										iconCls : 'selectByPolygon',
										handler : function(){
											startDrawShape("Path");
										}
									},'-',{
										text : '结束',
										iconCls : 'selectByPolygon',
										handler : function(){
											stopMeatureTool();
										}
									},'-',{
										text : '清除',
										iconCls : 'clear',
										handler : function(){
											clearMeasure();
										}
									}],
	                            buttons: [{
	                                text: '保存',
	                                handler:function(){
	                                	if(newFlyLineForm.getForm().isValid()){
	                                		Ext.get('lineTxt').dom.value=stopMeatureTool();
	                                		Ext.get('pitchTxt').dom.value=Ext.getCmp('pitchSlider').getValue();
	                                		newFlyLineForm.getForm().submit();
			            	             	ds.load({params:{start:0, limit:20}});
	                                	}
	                                }
	                            },{
	                                text: '重置',
	                                handler:function(){
	                                	newFlyLineForm.getForm().reset();
		            		        }
	                            },{
	                                text: '取消',
	                                handler:function(){
	                                	acrWin.close();
		            		        }
	                            }]
	                        });
	                    	
	                    	var acrWin = new Ext.Window({
	            				title:"新增飞行线路",
	            				height:253,
	            				width:320,
	            				constrain:true,
	            				modal:true,
	            				resizable:false,
	            				autoScroll:true,
	            				closeAction:'close',
	            				bodyStyle:'background-color:white;',
	            				listeners:{
	            					close:function(){acrWin.destroy();acrWin = null;}
	            				},
	            				items:[newFlyLineForm]
	            			});
	                    	acrWin.show();
	            				       
	            	    }  
	                },{  
	                    xtype : 'button',  
	                    text : '编辑',  
	                    handler :function() {
	                    	var s = grid.getSelectionModel().getSelections();
	            	        if (s.length==0) {
	            	            alert('你还没有选择要操作的记录！');
	            	            return;
	            	        }
	                    	var editFlyLineForm = new Ext.FormPanel({
	                            labelWidth: 75, // label settings here cascade unless overridden
	                            url:SystemTool.basePath+'/flyLine.jhtml?method=edit',
	                            frame:true,
	                            bodyStyle:'padding:5px 5px 0',
	                            autoWidth:true,
	                            autoHeight:true,
	                            defaults: {width: 230},
	                            defaultType: 'textfield',
	                            items: [{
	                                    fieldLabel:'id',
	                                    name:'id',
	                                    hideLabel:true,
	                                    hidden:true
	                                },{
	                                    fieldLabel: '名称',
	                                    name: 'linename',
	                                    anchor:'90%',
	                                    allowBlank:false
	                                },new Ext.form.ComboBox({
	                                     store: lineColorStore,
	                                     displayField:'name',
	                                     fieldLabel: "颜色",
	                                     typeAhead: true,
	                                     valueField: "id",
	                                     mode: 'local',
	                                     forceSelection: true,
	                                     triggerAction: 'all',
	                                     emptyText:'请选择...',
	                                     anchor:'90%',
	                                     selectOnFocus:true,
	                                     hiddenName:'combo',
	                                     name:'linecolor',
	                                     id:'linecolorTxt'
	                                 }),{
	                                	xtype: 'spinnerfield',
	                                	fieldLabel: '高度',
	                                	name: 'elevation',
	                                	minValue: 0,
	                                	maxValue: 10000,
	                                	allowDecimals: true,
	                                	decimalPrecision: 1,
	                                	incrementValue: 1,
	                                	accelerate: true,
	                                	anchor:'90%',
	                                    allowBlank:false
	                                },{
	                                	xtype: 'spinnerfield',
	                                	fieldLabel: '速度',
	                                	name: 'flyspeed',
	                                	minValue: 0.0001,
	                                	maxValue: 0.01,
	                                	allowDecimals: true,
	                                	decimalPrecision: 4,
	                                	incrementValue: 0.0001,
	                                	accelerate: true,
	                                	anchor:'90%',
	                                    allowBlank:false
	                                },new Ext.Slider({
	                                	 fieldLabel: '视角',
	                                	 id:'pitchSlider',
	                                	 anchor:'90%',
	                                	 value:0,
	                                     minValue:0,
	                                     maxValue:180,
	                                     plugins: new Ext.ux.SliderTip()
	                                 }),{
	                                    id:'pitchTxt',
	                                    name:'pitch',
	                                    hideLabel:true,
	                                    hidden:true
	                                },{
	                                    id:'lineTxt',
	                                    name:'line',
	                                    hideLabel:true,
	                                    hidden:true
	                                }
	                            ],
	                            buttons: [{
	                                text: '保存',
	                                handler:function(){
	                                	if(editFlyLineForm.getForm().isValid()){
	                                		if(stopMeatureTool()!="[]"){
	                                			Ext.get('lineTxt').dom.value=stopMeatureTool();
	                                		}
	                                		Ext.get('pitchTxt').dom.value=Ext.getCmp('pitchSlider').getValue();
	                                		editFlyLineForm.getForm().submit();
            	                    		ds.load({params:{start:0, limit:20}});
	                                	}
	                                }
	                            },{
	                                text: '重置',
	                                handler:function(){
	                                	editFlyLineForm.getForm().reset();
		            		        }
	                            },{
	                                text: '取消',
	                                handler:function(){
	                                	acrWin.close();
		            		        }
	                            }],
	                            tabPosition:'bottom',
								autoScroll : true,
								bbar : [{
										text : '线',
										iconCls : 'selectByPolygon',
										handler : function(){
											startDrawShape("Path");
										}
									}, '-', {
										text : '清除',
										iconCls : 'clear',
										handler : function(){
											clearMeasure();
										}
									}]
	                        });
	            	        var acrWin = new Ext.Window({
	            				title:"编辑飞行线路",
	            				height:257,
	            				width:320,
	            				constrain:true,
	            				modal:true,
	            				resizable:false,
	            				autoScroll:true,
	            				closeAction:'close',
	            				bodyStyle:'background-color:white;',
	            				listeners:{
	            					close:function(){acrWin.destroy();acrWin = null;}
	            				},
	            				items:[editFlyLineForm]
	            			});
	                    	acrWin.show();
	                    	 var record = grid.getSelectionModel().getSelected(); 
	            	        editFlyLineForm.getForm().loadRecord(record);
	            	        Ext.getCmp('pitchSlider').setValue(record.get('pitch'),true);
	            	        Ext.getCmp('linecolorTxt').setValue(record.get('linecolor')); 
	            	    } 
	                },{  
	                    xtype : 'button',  
	                    text : '删除',  
	                    handler :function(){
	                    	var s =grid.getSelectionModel().getSelections();
	                    	var ids="0";
	                        for (i=0;i<s.length;i++) {
	                            ids=ids+","+s[i].id;
	                        }
	                        if(ids!="0") {
	                        	var bln=confirm("确认要删除吗?");
	                            if (bln==true){
	                            	Ext.Ajax.request({
	            	                       url: SystemTool.basePath+'/flyLine.jhtml?method=delete&ids='+ids,
	            	                       success: function(result){
	            	                    	   ds.load({params:{start:0, limit:20}});
	            	                        }
	            	                  });
	                            }  
	            	        } else {
	            	        	alert('你还没有选择要操作的记录！');
	            	        }
	                    }    
	                },{  
	                    xtype : 'button',  
	                    text : '飞行',  
	                    handler :function(){
	                    	var s =grid.getSelectionModel().getSelections();
	                    	if (s.length==0) {
	            	            alert('你还没有选择要操作的记录！');
	            	            return;
	            	        }
	                    	var record = grid.getSelectionModel().getSelected(); 
	                    	startFly(record.get("line"),record.get("elevation"),record.get("pitch"),record.get("flyspeed"));
	                    }    
	                },{  
	                    xtype : 'button',  
	                    text : '停止',  
	                    handler :function(){
	                    	var s =grid.getSelectionModel().getSelections();
	                    	if (s.length==0) {
	            	            alert('你还没有选择要操作的记录！');
	            	            return;
	            	        }
	                    	stopFly();
	                    }    
	                },{  
	                    xtype : 'button',  
	                    text : '退出',  
	                    handler :function(){
	                    	var s =grid.getSelectionModel().getSelections();
	                    	if (s.length==0) {
	            	            alert('你还没有选择要操作的记录！');
	            	            return;
	            	        }
	                    	quitFly();
	                    	clearMeasure();
	                    }    
	                }], 
	                border:false,
	                height:330,
	                autoWidth:true,
	                loadMask: true,
	                title:'飞行路径列表',
	                store: ds,
	                region:'center',
	    			border : false,
	                id:"flyLineGrid",
	                cm: colModel,
	                autoScroll: true,
	                bbar: new Ext.PagingToolbar({
	                    pageSize: 20,
	                    store: ds,
	                    emptyMsg : "<font color='red'>没有记录</font>",
	                    displayInfo: true,
	                    plugins:new Ext.ux.ComboPageSize({addToItem:true,index:10})
	                })
	            });
		    grid.addListener('rowclick', function(grid, rowIndex, columnIndex, e){
		    	var record = grid.getStore().getAt(rowIndex); //Get the Record  
		    	var point;
		    	var pointsJson=eval("("+record.get("line")+")");
		    	var points="";
		    	Ext.iterate(pointsJson,function(item,key){
		    		if(points==""){
		    			points=item.latitude+","+item.longitude;
		    		}else{
		    			points+=";"+item.latitude+","+item.longitude;
		    		}
				});
		    	removeAllMarkers();
		    	removedAllShape();
		    	addSurfacePolyline(points,record.get("linecolor"),2.0,record.get("id"));
		    	point=eval("("+record.get("startpoint")+")");
		    	addMarker(point.latitude,point.longitude,SystemTool.basePath+"/images/marker/fly.png",record.get("linename"),record.get("id"));
		    	flyTo(point.latitude,point.longitude);
		    });
		    var searchForm= new Ext.FormPanel({//这里是搜索表单
		        buttonAlign:'right',
		        region:'north',
				border:false,
				split:true,
		        labelWidth:70,
		        height:100,
		        frame:true,
		        title: '搜索',
		        items: [{
                    xtype:'textfield',
                    fieldLabel: '名称',
                    id:'linename',
                    anchor:'50%'
		        }],
		        buttons: [{
		            text: '搜索',
		            handler:function(){
		                Ext.apply(ds.baseParams,{linename:Ext.get('linename').dom.value});
		                ds.load();
		            }
		        },{
		            text: '重置',
		            handler:function(){searchForm.form.reset();}
		        }]
		    });
		    
		    // 这里很关键，如果不加，翻页后搜索条件就变没了，这里的意思是每次数据载入前先把搜索表单值加上去，这样就做到了翻页保留搜索条件了
		    /*ds.on('beforeload',function(){
		        Ext.apply(this.baseParams,{linename:Ext.get('linename').dom.value});
		    });*/
		
		    var win = new Ext.Window({
				id:"roleWin",
				height:350,
				width:500,
				title : '&nbsp;飞行线路管理&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
				iconCls:"role",
				constrain:true,
				modal:true,
				resizable:false,
				renderTo: document.body,
				closeAction:'close',
				bodyStyle:'background-color:white;',
				listeners:{close:function(){win.destroy();win = null;}},
				layout:'fit',
				items:[{
					layout : 'border',
					items:[searchForm,grid]
				}]
			});
		    win.show();
		    ds.load({params:{start:0, limit:20}});
		}
};
