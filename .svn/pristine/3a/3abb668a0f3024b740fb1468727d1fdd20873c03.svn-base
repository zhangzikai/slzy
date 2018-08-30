/**
 * 
 */
Ext.define('MyApp.view.MyViewport', {
    extend: 'Ext.container.Viewport',
    alias:'widget.ViewportWidget',
    
    requires: [
        'Ext.grid.Panel',
        'Ext.grid.View',
        'Ext.tree.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.tree.View',
        'Ext.tree.Column',
        'Ext.form.Panel',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.form.field.TextArea'
    ],

    layout: 'border',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    region: 'west',
                    split: true,
                    width: 150,
                    title: '报表',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'string',
                            text: '报表名称',
                            flex: 1
                        }
                    ]
                },
                {
                    xtype: 'treepanel',
                    region: 'center',
                    split: true,
                    title: '指标树',
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            width: 150,
                            items: [
                                {
                                    xtype: 'button',
                                    text: '添加'
                                },
                                {
                                    xtype: 'button',
                                    text: '修改'
                                },
                                {
                                    xtype: 'button',
                                    text: '删除'
                                }
                            ]
                        },
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'button',
                                    text: '添加节点'
                                },
                                {
                                    xtype: 'button',
                                    text: '修改节点'
                                },
                                {
                                    xtype: 'button',
                                    text: '删除节点'
                                }
                            ]
                        }
                    ],
                    viewConfig: {

                    },
                    columns: [
                        {
                            xtype: 'treecolumn',
                            dataIndex: 'text',
                            text: '指标',
                            flex: 1
                        }
                    ]
                },
                {
                    xtype: 'form',
                    region: 'east',
                    split: true,
                    width: 207,
                    bodyPadding: 10,
                    title: '节点信息',
                    items: [
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            fieldLabel: '节点名称',
                            labelAlign: 'right',
                            labelWidth: 80
                        },
                        {
                            xtype: 'radiogroup',
                            fieldLabel: '因子',
                            labelAlign: 'right',
                            labelWidth: 80,
                            items: [
                                {
                                    xtype: 'radiofield',
                                    boxLabel: '株数'
                                },
                                {
                                    xtype: 'radiofield',
                                    boxLabel: '蓄积'
                                },
                                {
                                    xtype: 'radiofield',
                                    boxLabel: '面积'
                                }
                            ]
                        },
                        {
                            xtype: 'textareafield',
                            anchor: '100%',
                            fieldLabel: '表达式',
                            labelAlign: 'right',
                            labelWidth: 80
                        },
                        {
                            xtype: 'button',
                            text: '保存'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});