App.tabs.logManager = (function(){
	var limit = 20,tabId= 'logTab',addOrUpdateWin = null,curPanel=null;	
	
	function init(){
		var store = new Ext.data.Store({
			autoLoad:false,
			proxy:new Ext.data.HttpProxy({url:App.baseURL+'/sysLog.jhtml?method=list'}),
			reader:new Ext.data.JsonReader({
				totalProperty:'total',
				root:'rows',
				idProperty:'id'
			},['id','userName','logIp','logInfo','logTime']),
			baseParams:{start:0,limit:limit}
		}),
		sm = new Ext.grid.CheckboxSelectionModel({singleSelect:false}),
		cm = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),sm,
			{header : '<center>操作IP</center>',dataIndex : 'logIp',sortable : true,align:'center',width : 120},
			{header : '<center>操作时间</center>',dataIndex : 'logTime',sortable : true,align:'center',width : 160},
			{header : '<center>操作内容</center>',dataIndex : 'logInfo',sortable : true,width:200},
			{header : '<center>用户名</center>',dataIndex : 'userName',sortable : true,width : 100}
		]),
		grid = new Ext.grid.GridPanel({
			id:'logGrid',
			region:'center',
			border : false,
			columnLines : true,
			autoScroll : true,
			store : store,
			autoHeight:false,
			stripeRows:true,
			cm : cm,
			sm : sm,
			loadMask : {msg : '正在加载数据……'},
			bbar:new Ext.PagingToolbar({
				pageSize : limit,
				store : store,
				emptyMsg : "<font color='red'>没有记录</font>",
				displayInfo : true,
				plugins:new Ext.ux.ComboPageSize({addToItem:true,index:10})
			}),
			tbar:[
				' ',{text:'删除',iconCls:'delete-icon',hidden:!hasPermission('sys_log_delete'),handler:doDelete},
				' ',{text:'批量删除',iconCls:'batchdelete',hidden:!hasPermission('sys_log_batchDelete'),handler:doBatchDelete},
				'->',{text:'查&nbsp;&nbsp;询',iconCls:'query-icon',handler:function(){
					var formWin = Ext.getCmp('logCon');
					formWin.expand();
					var operate = formWin.operate.getValue(),
					endTime = formWin.endTime.getValue(),
					beginTime = formWin.beginTime.getValue(),
					username = formWin.username.getValue();
					Ext.apply(store.baseParams,{operate:operate,endTime:(endTime?endTime.format('Y-m-d H:i:s'):''),beginTime:(beginTime?beginTime.format('Y-m-d H:i:s'):''),username:username});
					store.load();
				}},
				'-',{text:'刷&nbsp;&nbsp;新',iconCls:'refresh',handler:function(){store.reload();}}]
		});	
		var win = new Ext.Window({
			id:"logWin",
			height:350,
			width:500,
			title : '&nbsp;日志管理&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
			iconCls:'info-icon',
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
				items:[{
					region:'north',
					border:false,
					split:true,
					collapsed:true,
					id:'logCon',
					height:35,
					layout:'column',
					items:[{
							xtype:'form',
							columnWidth:.25,
							border:false,
							labelWidth:50,
							labelAlign:'right',
							defaults:{anchor:'93%',xtype:'textfield',ctCls:'formMargin-1'},
							items:[{
								fieldLabel:'开始时间',
								editable:false,
								xtype:'datetimefield',
								format:'Y-m-d H:i:s',
								ref:'../beginTime'
							}]
						},{
							xtype:'form',
							columnWidth:.25,
							border:false,
							labelWidth:50,
							labelAlign:'right',
							defaults:{anchor:'93%',xtype:'textfield',ctCls:'formMargin-1'},
							items:[{
								fieldLabel:'结束时间',
								editable:false,
								xtype:'datetimefield',
								format:'Y-m-d H:i:s',
								ref:'../endTime'
							}]
						},{
							xtype:'form',
							columnWidth:.25,
							border:false,
							labelWidth:50,
							labelAlign:'right',
							defaults:{anchor:'93%',xtype:'textfield',ctCls:'formMargin-1'},
							items:[{
								fieldLabel:'用户名',
								width: 35,
								ref:'../username'
							}]
						},{
							xtype:'form',
							columnWidth:.25,
							border:false,
							labelWidth:50,
							labelAlign:'right',
							defaults:{xtype:'textfield',ctCls:'formMargin-1',anchor:'93%'},
							items:[{
								fieldLabel:'操作内容',
								width: 35,
								ref:'../operate'
							}]
						}]
					},grid]
			}]
		});
		win.show();
		store.load();
	}
	
	function doBatchDelete(){
		var grid = Ext.getCmp('logGrid');
		var batchWin = new Ext.Window({
			title:'批量删除',
			height:160,
			width:300,
			iconCls:'batchdelete',
			constrain:true,
			modal:true,
			resizable:false,
			autoScroll:true,
			renderTo:tabId,
			closeAction:'close',
			layout:'fit',
			listeners:{close:function(){batchWin.destroy();batchWin = null;}},
			items:[new Ext.form.FormPanel({
				ref:'itemForm',
				layout:'form',
				border:false,
				labelWidth:80,
				labelAlign:'right',
				buttonAlign:'center',
				defaults:{anchor:'93%',xtype:'textfield',ctCls:'formMargin'},
				items:[{
					fieldLabel:'开始时间',
					editable:false,
					xtype:'datetimefield',
					format:'Y-m-d H:i:s',
					ref:'../beginTime'
				},{
					fieldLabel:'结束时间',
					editable:false,
					xtype:'datetimefield',
					format:'Y-m-d H:i:s',
					ref:'../endTime'
				},{
					fieldLabel:'操作内容',
					ref:'../operate'
				}],
				bbar:['->',{
					text:'删除',
					iconCls:'batchdelete',
					handler:function(){
						if(!batchWin.itemForm.getForm().isValid()){return;}
						var operate = batchWin.operate.getValue(),
						endTime = batchWin.endTime.getValue(),
						beginTime = batchWin.beginTime.getValue();
						Ext.Ajax.request({
							url:App.baseURL+'/sysLog.jhtml?method=batchDelete',
							params:{operate:operate,endTime:(endTime?endTime.format('Y-m-d H:i:s'):''),beginTime:(beginTime?beginTime.format('Y-m-d H:i:s'):'')},
							success:function(response){
								var json = Ext.decode(response.responseText);
								Ext.Msg.alert("提示",json.msg);
								grid.getStore().reload();  
								batchWin.close();
							}
						});
					}
				},'-',{text:'重置',iconCls:'reset-icon',handler:function(){batchWin.itemForm.getForm().reset();}},
				'-',{text:'取消',iconCls:'cancel-icon',handler:function(){batchWin.close();}
				}]
			})]
		});
		batchWin.show();
	}
	
	function doDelete(){
		var ids = '',grid = Ext.getCmp('logGrid'),selects = grid.getSelectionModel().getSelections();
		if(selects.length <= 0){
			Ext.Msg.alert('提示','请选择记录进行删除!');
			return;
		}
		for (var i = 0; i < selects.length; i++) {
			ids += ',' + selects[i].json.id;
		}
		Ext.Msg.confirm("提示","确定要删除吗？",function(val){
			if(val=='yes'){
				 Ext.Ajax.request({
					url:App.baseURL+'/sysLog.jhtml?method=delete',
					method:'POST',
					params:{ids:ids.substring(1)},
					success:function(res){
						var ret = Ext.decode(res.responseText);
						Ext.Msg.alert('提示',ret.msg);
						grid.getStore().reload();
					},
					failure:function(){
						Ext.Msg.alert('提示','删除出错');
					}
				});
			}
		});
	}
	
	return {
		init:init
	};
})();	