Ext.define('MyApp.view.SysManagerView', {
    extend: 'Ext.panel.Panel',
    alias:'widget.sysManagerWidget',

    requires: [
        'Ext.form.Panel',
        'Ext.button.Button'
    ],

    height: 455,
    width: 241,
    layout: 'accordion',
    title: 'My Panel',
    header:false,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    bodyPadding: 10,
                    layout:'vbox',
		            hidden:!hasPermisson(62),
                    title: '配置管理',
                    items: [
                        {
				            xtype: 'button',
				            iconCls:'xbconfig',
				            text: '小班查询配置',
				            hidden:!hasPermisson(64),
				            scale: 'large',
				            iconAlign: 'left',
				            height:40,
				            margin:30,
				            width:200,
				            border : false,
				            style: { 
						          background:'#117DCF'
						    },
						    handler:function(){
                            	var win = Ext.widget('xbFieldWidget');
                            	win.show();
                            }
						},
                        {
                            xtype: 'button',
				            iconAlign: 'left',
				            scale: 'large',
				            border : false,
        		            hidden:!hasPermisson(65),
                            iconCls:'themeconfig',
				            height:40,
				            margin:30,
				            width:200,
                            style: { 
						          background:'#117DCF'
						    },
                            text: '专题图配置',
                            handler:function(){
                            	var win = Ext.widget('ThematicConfigViewWidget');
                            	win.show();
                            }
                        }
                        
                    ]
                },
                {
                    xtype: 'form',
                    bodyPadding: 10,
                    layout:'vbox',
		            hidden:!hasPermisson(63),
                    title: '系统设置',
                    items: [
                        {
                            xtype: 'button',
				            iconAlign: 'left',
				            iconCls:'userconfig',
				            border : false,
				            scale: 'large',
        		            hidden:!hasPermisson(66),
				            height:40,
				            margin:30,
				            width:200,
                            style: { 
						          background:'#117DCF'
						    },
                            text: '用户管理',
                            handler:function(){
                            	var win = Ext.widget('userManagerWidget');
                            	win.show();
                            }
                        },
                        {
                            xtype: 'button',
				            iconAlign: 'left',
				            scale: 'large',
				            iconCls:'roleconfig',
				            border : false,
        		            hidden:!hasPermisson(67),
				            height:40,
				            margin:30,
				            width:200,
                            style: { 
						          background:'#117DCF'
						    },
                            text: '角色管理',
                            handler:function(){
                            	var win = Ext.widget('RoleManagerWidget');
                            	win.show();
                            }
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});