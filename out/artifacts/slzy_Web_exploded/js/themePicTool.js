/*!
 * Ext JS Library 3.0.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
var ThemePicTool= {
    lookup : {},
	show : function(classify){
			this.classify=classify;
			this.initTemplates();
			this.store = new Ext.data.JsonStore({
			    url:SystemTool.basePath+'/themePic.jhtml?method=queryList&classify='+classify,
			    fields: [
			        'id','picName', 'picDesc','picUrl','picThubmUrl','createTime','createUser','classify'
			    ],
			    listeners: {
			    	'load': {fn:function(){ this.view.select(0); }, scope:this, single:true}
			    }
			});
			this.store.load();

			var formatData = function(data){
		    	data.shortName = data.picName.ellipse(15);
		    	data.classifyName = data.classify.dicName;
		    	data.userName = data.createUser.username;
		    	this.lookup[data.id] = data;
		    	return data;
		    };

		    this.view = new Ext.DataView({
				tpl: this.thumbTemplate,
				singleSelect: true,
				overClass:'x-view-over',
				itemSelector: 'div.thumb-wrap',
				emptyText : '<div style="padding:10px;">没有匹配的图片</div>',
				store: this.store,
				listeners: {
					'selectionchange': {fn:this.showDetails, scope:this, buffer:100},
					'dblclick'       : {fn:this.doCallback, scope:this},
					'loadexception'  : {fn:this.onLoadException, scope:this},
					'beforeselect'   : {fn:function(view){
				        return view.store.getRange().length > 0;
				    }}
				},
				prepareData: formatData.createDelegate(this)
			});
		    
		    
		    var themePicPanel=new Ext.Panel({
		    	layout: 'border',
				width:530,
				height:330,
				modal: true,
				closeAction: 'hide',
				border: false,
				items:[{
					id: 'img-chooser-view',
					region: 'center',
					autoScroll: true,
					items: this.view,
                    tbar:[{
                    	text: '关键字:'
                    },{
                    	xtype: 'textfield',
                    	id: 'filter',
                    	selectOnFocus: true,
                    	width: 100,
                    	listeners: {
                    		'render': {fn:function(){
						    	Ext.getCmp('filter').getEl().on('keyup', function(){
						    		this.filter();
						    	}, this, {buffer:500});
                    		}, scope:this}
                    	}
                    }, ' ', '-', {
                    	text: '排序:'
                    },{
                    	id: 'sortSelect',
                    	xtype: 'combo',
				        typeAhead: true,
				        triggerAction: 'all',
				        width: 150,
				        editable: false,
				        mode: 'local',
				        displayField: 'desc',
				        valueField: 'picName',
				        lazyInit: false,
				        value: 'picName',
				        store: new Ext.data.ArrayStore({
					        fields: ['picName', 'desc'],
					        data:[['picName', '名称'],['dicName', '类型'],['createTime', '时间']]
					    }),
					    listeners: {
							'select': {fn:this.sortImages, scope:this}
					    }
				    },'-',{
						text : '上传',
						iconCls : 'upload-icon',
						handler:function(){
							ThemePicTool.showAddOrUpdate("add");
						}
					},'-',{
						text : '编辑',
						iconCls:'edit-icon',
						handler:function(){
							ThemePicTool.showAddOrUpdate("edit");
						}
					},'-',{
						text : '删除',
						iconCls : 'delete-icon',
						handler:function(){
							ThemePicTool.doDelete();
						}
					},'-',{
						text : '刷新',
						iconCls : 'refresh-icon',
						handler:function(){
							ThemePicTool.store.load();
						}
					}]
				},{
					id: 'img-detail-panel',
					region: 'east',
					split: true,
					width: 350,
					minWidth: 300,
					maxWidth: 400
				}]
			});
			
		    var win = new Ext.Window({
				id:"themePicWin",
				height:350,
				width:500,
				title : '&nbsp;专题图列表&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
				iconCls:"role",
				constrain:true,
				modal:true,
				resizable:false,
				renderTo: document.body,
				closeAction:'close',
				bodyStyle:'background-color:white;',
				listeners:{close:function(){win.destroy();win = null;}},
				layout:'fit',
				items:[themePicPanel]
			});
			tabId="roleWin";
			win.show();
	},
	initTemplates : function(){
		this.thumbTemplate = new Ext.XTemplate(
			'<tpl for=".">',
				'<div class="thumb-wrap" id="{id}">',
				'<div class="thumb"><img src="'+SystemTool.basePath+'{picThubmUrl}" title="{picName}"></div>',
				'<span>{picName}</span></div>',
			'</tpl>'
		);
		this.thumbTemplate.compile();
		this.detailsTemplate = new Ext.XTemplate(
			'<div class="details">',
				'<tpl for=".">',
					'<img width="350" src="'+SystemTool.basePath+'{picUrl}"><div class="details-info">',
					'<span style=" display:block"><b style="display:inline">名称:</b>{picName}</span>',
					'<span style=" display:block"><b style="display:inline">类型:</b>{classifyName}</span>',
					'<span style=" display:block"><b style="display:inline">上传者:</b>{userName}</span>',
					'<span style=" display:block"><b style="display:inline">描述:</b>{picDesc}</span>',
					'<span style=" display:block"><b style="display:inline">时间:</b>{createTime}</span></div>',
				'</tpl>',
			'</div>'
		);
		this.detailsTemplate.compile();
	},

	showDetails : function(){
	    var selNode = this.view.getSelectedNodes();
	    var detailEl = Ext.getCmp('img-detail-panel').body;
		if(selNode && selNode.length > 0){
			selNode = selNode[0];
		    var data = this.lookup[selNode.id];
            detailEl.hide();
            this.detailsTemplate.overwrite(detailEl, data);
            detailEl.slideIn('l', {stopFx:true,duration:.2});
		}else{
		    detailEl.update('');
		}
	},

	filter : function(){
		var filter = Ext.getCmp('filter');
		this.view.store.filter('picName', filter.getValue(),true,false);
		this.view.select(0);
	},

	sortImages : function(){
		var v = Ext.getCmp('sortSelect').getValue();
    	this.view.store.sort(v,v=='picName'?'asc':'desc');
    	this.view.select(0);
    },
    /** 添加或者修改角色 **/
	showAddOrUpdate:function(type){
		var title='',iconCls='',btnText='',url='',updateRole=null;
		
		if(type == 'add'){
			title='添加专题图',iconCls='add-icon',btnText='保存',url=SystemTool.basePath+'/themePic.jhtml?method=add';
		}else if(type == 'edit'){
			title='修改专题图',iconCls='edit-icon',btnText='修改',url=SystemTool.basePath+'/themePic.jhtml?method=edit';
			var selectNode = this.view.getSelectedNodes();
			if(selectNode && selectNode.length > 0){
				selectNode = selectNode[0];
				selectNode =this.lookup[selectNode.id];
			}
		}
		var addOrUpdateWin = new Ext.Window({
				title:title,
				height:230,
				width:350,
				iconCls:iconCls,
				constrain:true,
				modal:true,
				resizable:false,
				renderTo:'themePicWin',
				closeAction:'close',
				items:[new Ext.form.FormPanel({
					id:'themePicForm',
					layout:'form',
					border:false,
					labelWidth:70,
					labelAlign:'left',
					bodyStyle:'padding:10px 10px 0',
	                autoWidth:true,
	                fileUpload:true,
					buttonAlign:'center',
					defaults:{anchor:'90%',allowBlank: false},
					items:[{
						xtype:'hidden',
						id:'id',
						name:'id'
					},{
						xtype:'textfield',
						fieldLabel:'专题图名称',
						id:'picName',
						name:'picName',
						maxLength:60,
						maxLengthText:'最长不超过{0}个长度'
					},{
						xtype:'combo',
						id:'classifyId',
						fieldLabel:"分类",
						triggerAction:"all",
						mode:"local",
						maxLength:20,
						emptyText:"请选择...",
						store:new Ext.data.Store({
							autoLoad:true,
							proxy:new Ext.data.HttpProxy({url:SystemTool.basePath+'/sysDic.jhtml?method=queryList&parentId=1'}),
							reader:new Ext.data.JsonReader({fields:[{name:'id'},{name:'dicName'}]})
						}),
						displayField:"dicName",
		 				valueField:"id",
						autoShow:true,
						listeners: {
							select: function(f,r,i){
								Ext.getCmp('classify').setValue(f.value);
							}	
						}
					},{
						xtype:'hidden',
						id:'classify',
						name:'classify.id'
					},{
	                    xtype: 'fileuploadfield',
	                    id: 'picFile',
	                    name: 'tempFile',
	                    emptyText: '请选择图片文件...',
	                    fieldLabel: '专题图',
	                    permitted_extensions:['jpg','jpeg','JPEG','GIF','gif'],  
	                    buttonText: '',
	                    allowBlank:true,
	                    buttonCfg: {
	                        iconCls: 'upload-icon'
	                    }
	                },{
						xtype:'textarea',
						height:80,
						fieldLabel:'描&nbsp;&nbsp;&nbsp;述',
						id:'picDesc',
						name:'picDesc',
						maxLength:6000,
						maxLengthText:'最长不超过{0}个长度'
					}]
				})]
					,
					bbar:['->',{
						text:btnText,
						iconCls:'accept-icon',
						handler:function(){
							if(Ext.getCmp('themePicForm').getForm().isValid()){
								if(type == 'add'&&Ext.getCmp('picFile').getValue()==""){
									Ext.Msg.alert('系统提示','请选择上传专题图!');
									return ;
								}
								Ext.getCmp('themePicForm').getForm().submit({ 
									url:url,
				                    waitTitle : '请等待' ,  
				                    waitMsg: '正在提交中',  
				                    success:function(form,action){  
				                    	Ext.Msg.alert('系统提示','操作成功');  
				                    	ThemePicTool.store.load();
										addOrUpdateWin.close();
				                    },  
				                    failure : function(form, action) {  
				                    	Ext.Msg.alert('系统提示','操作成功');  
				                    	ThemePicTool.store.load();
										addOrUpdateWin.close();
				                    }  
								});  
							}
						}
					},'-',{text:'重置',iconCls:'reset-icon',handler:function(){Ext.getCmp('themePicForm').getForm().reset();}},
					'-',{text:'取消',iconCls:'cancel-icon',handler:function(){addOrUpdateWin.close();}}
					]
			});
		addOrUpdateWin.show();
		if(type == 'edit'){
			Ext.getCmp('id').setValue(selectNode.id);
			Ext.getCmp('picName').setValue(selectNode.picName);
			Ext.getCmp('picDesc').setValue(selectNode.picDesc);
			Ext.getCmp('classify').setValue(selectNode.classify.id);
			Ext.getCmp('classifyId').setValue(selectNode.classify.dicName);
		}
	},
	
	doDelete:function(){
		var selectNode = this.view.getSelectedNodes();
		if(selectNode && selectNode.length > 0){
			selectNode = selectNode[0];
			Ext.Msg.confirm("提示","删除专题图，您确定要删除吗？",function(val){
				if(val=='yes'){
					Ext.Ajax.request({
	                       url: SystemTool.basePath+'/themePic.jhtml?method=delete&ids='+selectNode.id,
	                       success: function(result){
	                    	   Ext.Msg.alert("提示","删除成功");
	                    	   ThemePicTool.show(ThemePicTool.classify);
	                        }
	                  });
				}
			});
		}
	}
};

String.prototype.ellipse = function(maxLength){
    if(this.length > maxLength){
        return this.substr(0, maxLength-3) + '...';
    }
    return this;
};
