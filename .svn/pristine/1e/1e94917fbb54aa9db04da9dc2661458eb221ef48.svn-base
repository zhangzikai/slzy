Ext.define('MyApp.view.RoleEditWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.RoleEditWidget',
    constrain: true,

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.TextArea',
        'Ext.tree.Panel'
    ],

    name: 'window_role_add',
    layout: 'fit',
    height: 225,
    width: 423,
    title: '角色编辑',
    draggable: true,
    resizable: false,
    constrain: true,
    modal: true,

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    bodyPadding: 10,
                    header: false,
                    fieldDefaults: {
                        labelWidth: 53,
                        labelAlign: "right"
                    },
                    buttons: [{
                        text: "保存",
                        name: "btnSave",
                        handler:function(button,e,eOpt){
                        	var form = button.up('form');
                        	if(form.isValid()){
                        		form.submit({
                        			url:hostPath+'/sysRole.jhtml?method=add',
                        			success:function(form2, action) {
                        			   var gridpanel = Ext.ComponentQuery.query('RoleManagerWidget gridpanel')[0];
                        			   gridpanel.getStore().load();
                        			   var win = form.up('window');
     	                    		   win.close();
                    			    }
                        		});
                        	}
                        }
                    }, {
                        text: "取消",
                        name: "btnCancel",
                        scope:this,
                        handler:function(button,e,eOpt){
                        	this.close();
                        }
                    }
                    ],
                    items: [
                         {
                             xtype: 'hiddenfield',
                             fieldLabel: 'Label',
                             name: 'id'
                         },
                        {
                            xtype: 'textfield',
                            name: 'roleName',
                            anchor: '100%',
                            fieldLabel: '角色名称',
                            allowBlank: false  // 表单项非空
                        },
                        {
                            xtype: 'textareafield',
                            name: 'remark',
                            anchor: '100%',
                            height: 45,
                            fieldLabel: '角色描述'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});