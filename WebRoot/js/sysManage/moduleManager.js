App.tabs.moduleManager = (function(){
	var limit = 20,tabId = "moduleTab",addOrUpdateWin,curPanel=null;
	
	/** 添加或者修改 **/
	function showAddOrUpdate(type){
		var title='', iconCls='', btnText='', url='', id=0, pid='0';
		var treeCmp = Ext.getCmp("moduleTree");
		var node = treeCmp.getSelectionModel().getSelectedNode();
		if(type == 'add'){
			title='添加模块',iconCls='add-icon',btnText='保存',url=App.baseURL+'/sysModule.jhtml?method=add';
			if(node){
				pid = node.id;
			}
		}else if(type == 'update'){
			title='修改模块',iconCls='edit-icon',btnText='修改',url=App.baseURL+'/sysModule.jhtml?method=edit';
			if(!node){
				Ext.Msg.alert('提示','请选择一个节点进行修改!');
				return;
			}else{
				id = node.id;
				pid = node.attributes.pid;
			}
		}
		if(!addOrUpdateWin){
			addOrUpdateWin = new Ext.Window({
				title:title,
				height:150,
				width:320,
				iconCls:iconCls,
				constrain:true,
				modal:true,
				resizable:false,
				renderTo:tabId,
				closeAction:'close',
				bodyStyle:'background-color:white;',
				listeners:{
					close:function(){addOrUpdateWin.destroy();addOrUpdateWin = null;}
				},
				items:[new Ext.form.FormPanel({
					ref:'itemForm',
					layout:'form',
					border:false,
					labelWidth:75,
					labelAlign:'right',
					buttonAlign:'center',
					defaults:{anchor:'93%',xtype:'textfield',ctCls:'formMargin'},
					items:[{
						fieldLabel:'模块名称',
						ref:'../text',
						allowBlank:false,
						maxLength:20
					},{
						fieldLabel:'唯一标识',
						ref:'../scn',
						allowBlank:false,
						maxLength:50,
						minLength:2
					}]
				})],
				bbar:['->',{
					text:btnText,
					iconCls:'accept-icon',
					handler:function(){
						if(!addOrUpdateWin.itemForm.getForm().isValid()){return;}
						var text = addOrUpdateWin.text.getValue(),
						scn = addOrUpdateWin.scn.getValue(),
						myMask = new Ext.LoadMask(addOrUpdateWin.el,{msg:'正在保存数据...',removeMask:true});
						myMask.show();
						Ext.Ajax.request({
							url:url,
							method:'POST',
							params:{text:text,id:id,pid:pid,scn:scn},
							success:function(res){
								myMask.hide();
								var ret = Ext.decode(res.responseText);
								Ext.Msg.alert('提示',ret.msg);
								var newNode = new Ext.tree.TreeNode({id:ret.id,pid:pid,text:text,scn:scn});
								if(type == 'add'){
									if(node){
										node.appendChild(newNode);
										node.expand();
									}else{
										treeCmp.root.appendChild(newNode);
										treeCmp.root.expand();
									}
								}else{
									node.setText(text);
									node.attributes.scn = scn;
								}
								addOrUpdateWin.close();
							},
							failure:function(res){
								Ext.Msg.alert('提示',res.responseText);
								myMask.hide();}
						});
					}
				},'-',{text:'重置',iconCls:'reset-icon',handler:function(){addOrUpdateWin.itemForm.getForm().reset();}},
				'-',{text:'取消',iconCls:'cancel-icon',handler:function(){addOrUpdateWin.close();}}
				]
			});
		}
		addOrUpdateWin.show();
		if(type == 'update'){
			addOrUpdateWin.text.setValue(node.text);
			addOrUpdateWin.scn.setValue(node.attributes.scn);
		}
	}
	
	function init(){
		var win = new Ext.Window({
			id:"moduleWin",
			height:350,
			width:500,
			title : '&nbsp;模块管理&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
			iconCls:'right', 
			constrain:true,
			modal:true,
			resizable:false,
			renderTo: document.body,
			closeAction:'close',
			bodyStyle:'background-color:white;',
			listeners:{close:function(){win.destroy();win = null;}},
			layout:'fit',
			items:[new Ext.Panel({
				    items:[new Ext.tree.TreePanel({
						id : 'moduleTree',
						root : new Ext.tree.AsyncTreeNode({
							id : 'root',
							text : '根节点',
							expanded:true,
							leaf:false
						}),
						loader : new Ext.tree.TreeLoader({
							url : App.baseURL + '/sysModule.jhtml?method=listTree'
						}),
						border : false,
						rootVisible : false,
						lines : true,
						autoScroll : true,
						enableDD : false,
						animate : true,
						split : true,
						containerScroll: true,
						collapsible : false
					})],
					tbar:[' ',' ',{	
		                iconCls: 'icon-expand-all',
		                text: '全部展开',
		                handler: function(){
		                    var treePanel = Ext.getCmp('moduleTree');
		                    treePanel.root.expand(true);
		                },
		                scope: this
		            }, '-', {
		                iconCls: 'icon-collapse-all',
		                text: '全部收缩',
		                handler: function(){ 
		                    var treePanel = Ext.getCmp('moduleTree');
		                    treePanel.root.collapseChildNodes(true);    
		                },
		                scope: this
		            },
			        '->',{text:'添加',iconCls:'add-icon',hidden:!hasPermission('sys_module_add'),handler:function(){showAddOrUpdate("add");}},
					' ',{text:'修改',iconCls:'edit-icon',hidden:!hasPermission('sys_module_update'),handler:function(){showAddOrUpdate("update");}},
					' ',{text:'删除',iconCls:'delete-icon',hidden:!hasPermission('sys_module_delete'),handler:doDelete}
				]
			})]
		});
		tabId="moduleWin";
		win.show();
	}
	
	function doDelete(){
		var tree = Ext.getCmp('moduleTree'),node = tree.getSelectionModel().getSelectedNode();
		if(!node){
			Ext.Msg.alert('提示','请选择对象进行删除!');
			return;
		}
		Ext.Msg.confirm("提示","删除模块信息，将把模块相关信息一起删除，您确定要删除吗？",function(val){
			if(val=='yes'){
				 Ext.Ajax.request({
					url:App.baseURL+'/sysModule.jhtml?method=delete',
					method:'POST',
					params:{id:node.id},
					success:function(response){
						var json = Ext.decode(response.responseText);
							Ext.Msg.alert("提示",json.msg);
							tree.root.reload();
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


