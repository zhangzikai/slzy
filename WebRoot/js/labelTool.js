/*
 * 系统工具 2014-04-09 11:25:16
 * */
//类 LabelTool
var LabelTool={
	isShow:0,//配置是否显示标注
	labelTypeStore:new Ext.data.ArrayStore({
        fields: ['id','name'],
        data :[
               ['kuergan_Hydrology','水文站'],
               ['kuergan_Rainfall','雨量站'],
               ['kuergan_level','水位站'],
               ['kuergan_weather','气象站'],
               ['kuergan_power','电站'],
               ['kuergan_Reservoir','水库'],
               ['kuergan_dam','大坝']
         ]
    }),
    
	/**
	 * 地球上加载标注,显示与隐藏
	 */
	loadLabel:function(){
		if(this.isShow==0){
			Ext.Ajax.request({
                url: SystemTool.basePath+'/label.jhtml?method=queryAll',
                method: 'POST',
                success: function(response,options){
             	   	var dataJson = Ext.util.JSON.decode(response.responseText);
             	   	for(var i=0;i<dataJson.length;i++){
	      				var label=dataJson[i];
	      				var point=Ext.util.JSON.decode(label.point);
	      				addMarker(point.latitude,point.longitude,SystemTool.basePath+label.img,label.labelname,label.id);
             	   	}
                }
           });
			this.isShow=1;
		}else{
			removeAllMarkers();
			this.isShow=0;
		}
	},
	/**
	*标注管理
	*查询、添加、修改、删除功能
	*/
	labelQuery:function(){
		var isShow=SystemTool.createTab("labelTab","标注管理",'<div id="labelToolBarDiv"></div><div id="labelGridDiv"></div>');
		if(isShow){
			return;
		}
		var ds = new Ext.data.Store({//这是数据源
	        proxy : new Ext.data.HttpProxy({url:SystemTool.basePath+'/label.jhtml?method=queryList'}),
	        reader: new Ext.data.JsonReader({
	            root: 'rows',
	            totalProperty: 'total',
	            id: 'id'
	            },['id','labelname','category','point','img','remark'])
	    });
	    var colModel = new Ext.grid.ColumnModel([//定义列
	         {header:'ID',width:40,sortable:true,dataIndex:'id'},
	         {header:'名称',width:80,sortable:true,dataIndex:'labelname'},
	         {header:'类型',width:80,sortable:true,renderer:function(value){if(value!=null&&value!=""){return LabelTool.labelTypeStore.query("id",value,false).first().get("name");}},dataIndex:'category'},
	         {header:'备注',width:160,sortable:true,dataIndex:'remark'}
	        ]);
	    var grid = new Ext.grid.GridPanel({//列表
	    	 tbar : [ {  
                    xtype : 'button',  
                    text : '新增',  
                    handler :function() {
                    	SystemTool.createTab("newLabelTab","新增标注",'<div id="newLabelDiv"></div>');
                    	var newLabelForm = new Ext.FormPanel({
                            labelWidth: 75, // label settings here cascade unless overridden
                            url:SystemTool.basePath+'/label.jhtml?method=add',
                            frame:true,
                            renderTo:'newLabelDiv',
                            title: '新增标注',
                            bodyStyle:'padding:5px 5px 0',
                            autoWidth:true,
                            defaults: {width: 250},
                            defaultType: 'textfield',
                            items: [{
                                    fieldLabel: '名称',
                                    id:'labelnameTxt1',
                                    name: 'labelname',
                                    anchor:'90%',
                                    allowBlank:false
                                },new Ext.form.ComboBox({
                                    store: LabelTool.labelTypeStore,
                                    displayField:'name',
                                    fieldLabel: "类型",
                                    typeAhead: true,
                                    valueField: "id",
                                    mode: 'local',
                                    forceSelection: true,
                                    triggerAction: 'all',
                                    emptyText:'请选择...',
                                    anchor:'90%',
                                    selectOnFocus:true,
                                    hiddenName:'category',
                                    allowBlank:false,
                                    name:'category'
                                }),{
                                    xtype: 'radiogroup',
                                    fieldLabel: '图标',
                                    name: 'img',
                                    id: 'img1',
                                    columns: 4,
                                    items: [{
                                    		xtype: 'box', 
                                    		width: 5, 
										    height: 30, 
										    autoEl: {  
										        tag: 'img', 
										        src:SystemTool.basePath+'/images/marker/marker-flag-red.png' 
										    }  
										},{boxLabel: '红色', name: 'img',inputValue:'/images/marker/marker-flag-red.png'},
										{
                                    		xtype: 'box',  
                                    		width: 5, 
										    height: 30, 
										    autoEl: {  
										        tag: 'img', 
										        src:SystemTool.basePath+'/images/marker/marker-red.png' 
										    }  
										},{boxLabel: '红色', name: 'img',inputValue:'/images/marker/marker-red.png'},
                                        {
                                    		xtype: 'box',  
                                    		width: 5, 
										    height: 30, 
										    autoEl: {  
										        tag: 'img', 
										        src:SystemTool.basePath+'/images/marker/marker-flag-blue.png' 
										    }  
										},{boxLabel: '蓝色', name: 'img',inputValue:'/images/marker/marker-flag-blue.png'},
                                        {
                                    		xtype: 'box',  
                                    		width: 5, 
										    height: 30,  
										    autoEl: {  
										        tag: 'img', 
										        src:SystemTool.basePath+'/images/marker/marker-blue.png' 
										    }  
										},{boxLabel: '蓝色', name: 'img',inputValue:'/images/marker/marker-blue.png'},
										{
                                    		xtype: 'box',  
										    width: 5, 
										    height: 30, 
										    autoEl: {  
										        tag: 'img', 
										        src:SystemTool.basePath+'/images/marker/marker.png' 
										    }  
										},{boxLabel: '标准', name: 'img',inputValue:'/images/marker/marker.png',checked: true},
                                    ]
	                             },{
	                                    fieldLabel: '备注',
	                                    name: 'remark',
	                                    xtype: 'textarea',
	                                    anchor:'90%',
	                                    allowBlank:false
	                                },{
                                     fieldLabel:'point',
                                     id:'pointTxt1',
                                     name:'point',
                                     hideLabel:true,
                                     hidden:true
                                 }
                            ],
							bbar:[{
									text : '点',
									iconCls : 'move',
									handler : function(){
										if(newLabelForm.getForm().isValid()){
											if(Ext.getCmp('img1').getValue()==null){
												alert("请选择图标!");
											}else{
												startAddMarker(SystemTool.basePath+Ext.getCmp('img1').getValue().inputValue,Ext.get('labelnameTxt1').dom.value);
											}
										}
									}
								},'-',{
									text : '清除',
									iconCls : 'clear',
									handler : function(){
										removeAllMarkers();
									}
								}],
                            buttons: [{
                                text: '保存',
                                handler:function(){
                                	if(newLabelForm.getForm().isValid()){
                                		Ext.get('pointTxt1').dom.value=stopAddMarker();
                                		newLabelForm.getForm().submit();
		            	             	SystemTool.deleteTab("newLabelTab"); 
		            	             	ds.load({params:{start:0, limit:20}});
                                	}
                                }
                            },{
                                text: '重置',
                                handler:function(){
                                	newLabelForm.getForm().reset();
	            		        }
                            },{
                                text: '取消',
                                handler:function(){
                                	SystemTool.deleteTab("newLabelTab");
	            		        }
                            }]
                        });
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
                    	SystemTool.createTab("editLabelTab","编辑标注",'<div id="editLabelDiv"></div>');
                    	var editLabelForm = new Ext.FormPanel({
                            labelWidth: 75, // label settings here cascade unless overridden
                            url:SystemTool.basePath+'/label.jhtml?method=edit',
                            frame:true,
                            renderTo:'editLabelDiv',
                            title: '编辑标注',
                            bodyStyle:'padding:5px 5px 0',
                            autoWidth:true,
                            defaults: {width: 250},
                            defaultType: 'textfield',
                            items: [{
                                    name:'id',
                                    hideLabel:true,
                                    hidden:true
                                },{
                                    fieldLabel: '名称',
                                    id:'labelnameTxt2',
                                    name: 'labelname',
                                    anchor:'90%',
                                    allowBlank:false
                                },new Ext.form.ComboBox({
                                    store: LabelTool.labelTypeStore,
                                    displayField:'name',
                                    fieldLabel: "类型",
                                    typeAhead: true,
                                    valueField: "id",
                                    mode: 'local',
                                    forceSelection: true,
                                    triggerAction: 'all',
                                    emptyText:'请选择...',
                                    anchor:'90%',
                                    selectOnFocus:true,
                                    editable: false,
                                    allowBlank:false,
                                    hiddenName:'category',
                                    name:'category'
                                }),{
                                    xtype: 'radiogroup',
                                    fieldLabel: '图标',
                                    name: 'img',
                                    id:'img2',
                                    columns: 4,
                                    items: [{
                                    		xtype: 'box',  
										    width: 8, 
										    height: 25, 
										    autoEl: {  
										        tag: 'img', 
										        src:SystemTool.basePath+'/images/marker/marker.png' 
										    }  
										},{boxLabel: '标准', name: 'img',inputValue:'/images/marker/marker.png'},
										{
                                    		xtype: 'box',  
										    width: 8, 
										    height: 25, 
										    autoEl: {  
										        tag: 'img', 
										        src:SystemTool.basePath+'/images/marker/marker-flag-red.png' 
										    }  
										},{boxLabel: '红色', name: 'img',inputValue:'/images/marker/marker-flag-red.png'},
										{
                                    		xtype: 'box',  
                                    		width: 8, 
										    height: 25, 
										    autoEl: {  
										        tag: 'img', 
										        src:SystemTool.basePath+'/images/marker/marker-red.png' 
										    }  
										},{boxLabel: '红色', name: 'img',inputValue:'/images/marker/marker-red.png'},
                                        {
                                    		xtype: 'box',  
                                    		width: 8, 
										    height: 25,  
										    autoEl: {  
										        tag: 'img', 
										        src:SystemTool.basePath+'/images/marker/marker-flag-blue.png' 
										    }  
										},{boxLabel: '蓝色', name: 'img',inputValue:'/images/marker/marker-flag-blue.png'},
                                        {
                                    		xtype: 'box',  
                                    		width: 8, 
										    height: 25,  
										    autoEl: {  
										        tag: 'img', 
										        src:SystemTool.basePath+'/images/marker/marker-blue.png' 
										    }  
										},{boxLabel: '蓝色', name: 'img',inputValue:'/images/marker/marker-blue.png'}
                                    ]
	                             },{
	                                    fieldLabel: '备注',
	                                    name: 'remark',
	                                    anchor:'90%',
	                                    xtype: 'textarea',
	                                    allowBlank:false
	                                },{
                                     fieldLabel:'point',
                                     id:'pointTxt2',
                                     name:'point',
                                     hideLabel:true,
                                     hidden:true
                                 }
                               
                            ],
							bbar:[{
									text : '点',
									iconCls : 'move',
									handler : function(){
										if(editLabelForm.getForm().isValid()){
											if(Ext.getCmp('img2').getValue()==null){
												alert("请选择图标!");
											}else{
												startAddMarker(SystemTool.basePath+Ext.getCmp('img2').getValue().inputValue,Ext.get('labelnameTxt2').dom.value);
											}
										}
									}
								},'-',{
									text : '清除',
									iconCls : 'clear',
									handler : function(){
										removeAllMarkers();
									}
								}],
                            buttons: [{
                                text: '保存',
                                handler:function(){
                                	if(editLabelForm.getForm().isValid()){
                                		var point=stopAddMarker();
                                		if(point!=null&&point!=""){
                                			Ext.get('pointTxt2').dom.value=point;
                                		}
                                		editLabelForm.getForm().submit();
        	                    		SystemTool.deleteTab("editLabelTab"); 
        	                    		ds.load({params:{start:0, limit:20}});
                                	}
                                }
                            },{
                                text: '重置',
                                handler:function(){
                                	editLabelForm.getForm().reset();
	            		        }
                            },{
                                text: '取消',
                                handler:function(){
                                	SystemTool.deleteTab("editLabelTab");
	            		        }
                            }],
                            tabPosition:'bottom',
							autoScroll : true
                        });
            	        var record = grid.getSelectionModel().getSelected(); 
            	        editLabelForm.getForm().loadRecord(record);
            	    } 
                }, {  
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
            	                       url: SystemTool.basePath+'/label.jhtml?method=delete&ids='+ids,
            	                       success: function(result){
            	                    	   ds.load({params:{start:0, limit:20}});
            	                        }
            	                  });
                            	removeAllMarkers();
                            }  
            	        } else {
            	        	alert('你还没有选择要操作的记录！');
            	        }
                    }    
                }], 
                border:false,
                height:330,
                autoWidth:true,
                loadMask: true,
                title:'标注列表',
                store: ds,
                cm: colModel,
                applyTo:'labelGridDiv',
                autoScroll: true,
                bbar: new Ext.PagingToolbar({
                    pageSize: 20,
                    store: ds,
                    displayInfo: true
                })
            });
	    grid.addListener('rowclick', function(grid, rowIndex, columnIndex, e){
	    	var label = grid.getStore().getAt(rowIndex); //Get the Record  
	    	var point=eval("("+label.get("point")+")");
	    	removeAllMarkers();
	    	addMarker(point.latitude,point.longitude,SystemTool.basePath+label.get("img"),label.get("labelname"),label.get("id"));
	    	flyTo(point.latitude,point.longitude);
	    });
	    
	    
	    
	    var searchForm= new Ext.FormPanel({//这里是搜索表单
	        buttonAlign:'right',
	        labelWidth:70,
	        region:'center',
	        frame:true,
	        applyTo:'labelToolBarDiv',
	        title: '搜索',
	        items: [{
	                layout:'column',
	                items:[{
		                    columnWidth:.5,
		                    layout: 'form',
		                    items: [new Ext.form.ComboBox({
                                store: this.labelTypeStore,
                                displayField:'name',
                                fieldLabel: "类型",
                                typeAhead: true,
                                valueField: "id",
                                mode: 'local',
                                forceSelection: true,
                                triggerAction: 'all',
                                emptyText:'请选择...',
                                anchor:'90%',
                                selectOnFocus:true,
                                id:'search_category'
                            })]
		                },{
		                    columnWidth:.5,
		                    layout: 'form',
		                    items: [{
		                    	xtype:'textfield',
		                        fieldLabel: '名称',
		                        id:'search_labelname',
		                        anchor:'90%'
		                }]
		           }]
	        }],
	        buttons: [{
	            text: '搜索',
	            handler:function(){
	                ds.load({params:{start:0, limit:20,labelname:Ext.get('search_labelname').dom.value,category:Ext.getCmp('search_category').getValue()}});
	            }
	        },{
	            text: '重置',
	            handler:function(){searchForm.form.reset();}
	        }]
	    });
	    
	    ds.load({params:{start:0, limit:20}});
	    // 这里很关键，如果不加，翻页后搜索条件就变没了，这里的意思是每次数据载入前先把搜索表单值加上去，这样就做到了翻页保留搜索条件了
	    ds.on('beforeload',function(){
	        Ext.apply(
	        this.baseParams,
	        {
	        	labelname:Ext.get('search_labelname').dom.value
	        });
	    });
	}
};
