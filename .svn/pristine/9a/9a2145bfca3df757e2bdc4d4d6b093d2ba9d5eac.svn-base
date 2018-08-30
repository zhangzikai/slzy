Ext.define("MyApp.view.XBCompareView", {
    extend: 'Ext.panel.Panel',
    xtype: 'compareView',
    layout:'border',
    items: [{
        xtype: 'form',
        region:'north',
        layout: 'anchor',
        defaults: {
            anchor: '100%'
        },
        height: 180,
        defaultType: 'textfield',
        // bodyPadding: 10,
        items: [{
            xtype: 'radiofield',
            boxLabel: '按照当前视图范围比对',
            name: 'type',
            id: 'extentRadio',
            margin: 10,
            checked: true,
            handler:function(){
            	this.nextSibling('treepicker').setDisabled(false);
            	this.nextSibling('textfield[name="lbText"]').setDisabled(false);
            }
        }, {
            xtype: 'radiofield',
            boxLabel: '按照村或林班比对',
            name: 'type',
            id: 'xbRadio',
            margin: 10,
            handler:function(){
            	this.nextSibling('treepicker').setDisabled(true);
            	this.nextSibling('textfield[name="lbText"]').setDisabled(true);
            }
        }, {
            xtype: 'treepicker',
            fieldLabel: '行政区划',
            name: 'unitTree',
            displayField: 'text',
            valueField: 'value',
            rootVisible: true,
            minPickerHeight: 400,
            maxPickerHeight: 400,
            margin: 10,
            labelWidth: 80,
            labelAlign: 'right',
            disabled: true,
            store: Ext.create('Ext.data.TreeStore', {
                fields: ['text', 'value', 'codelevel', 'code'],
                root: {
                    expanded: true,
					text : cur_areaName,//"辽宁省",
					id : cur_areaID,//'0021',
                    leaf: false
                },
                proxy: {
                    type: 'ajax',
                    url: hostPath + '/j2UnitCode.jhtml?method=queryList',
                    reader: {
                        type: 'json'
                    }
                }
            })
        }, {
            fieldLabel: '林班号',
            name: 'lbText',
            allowBlank: false,
            labelWidth: 80,
            labelAlign: 'right',
            margin: 10,
            disabled: true
        }, {
            xtype: 'container',
            margin: 10,
            layout: {
                type: 'hbox',
                align: 'stretch',
                pack: 'end'
            },
            items: [{
                xtype: 'button',
                margin: '',
                width: 80,
                text: '对比',
                handler: function() {
                	if(this.previousNode('radio').checked==true){
                		var lbh = this.previousNode('textfield').getValue();
                		var unitLevel = this.previousNode('treepicker').displayTplData&&this.previousNode('treepicker').displayTplData[0].codelevel;
                		if(unitLevel!=5){
                			Ext.Msg.alert("错误","请选择村级单位");
                			return;
                	}
                		var cunCode = this.previousNode('treepicker').displayTplData[0].code;             		
                		showDiffXBByCun(cunCode,lbh);
                	}
                	else
                		showDiffXB();
                }
            }]
        }]
    }, {
        xtype: 'gridpanel',
        region:'center',
        title: '对比结果',
        store: new Ext.data.JsonStore({
            fields: ['c_xb', 'c_lb', 'c_xiang', 'c_cun', 'c_bhyy'],
            data: []
        }),
        tools:[{
        	type:'save',
        	tooltip:'保存为excel',
        	handler:function(){
        		var diffStore=this.up('gridpanel').getStore();
        		var xb =[];
        		var xbList = diffStore.getRange(0);
        		if(xbList.length==0){
        			Ext.Msg.alert('错误','没有不同的小班，无法输出excel文件');
        			return;
        		}
        		for(var m in xbList){
        			xb.push(xbList[m].getData());
        		}
        		var field=[];
        		var fieldList = diffStore.getAt(0).getData();
        		for(var f in fieldList){
        			field.push(f);
        		}
        		var msg = Ext.JSON.encode({xb:xb,field:field});
        		Ext.Ajax.request({
        			url : hostPath + '/xbField.jhtml?method=getExcel',
        			params : {
        				msg : msg
        			},
        			success : function(response) {
        				window.open(hostPath+'/download/'+Ext.JSON.decode(response.responseText).name);
        				}
        		});
        	}
        }],
        columns: [{
            xtype: 'gridcolumn',
            text: '小班号',
            dataIndex: 'c_xb',
            flex: 1,
            hidden: true
        }, {
            xtype: 'gridcolumn',
            text: '林班号',
            dataIndex: 'c_lb',
            flex: 1,
            hidden: false
        }, {
            xtype: 'gridcolumn',
            text: '乡',
            dataIndex: 'c_xiang',
            flex: 3,
            renderer: function(value, metaData, record, rowIndex, colIndex, store) {
                var temp = cnm.get(value);
                if (!temp) {
                    Ext.Ajax.request({
                        url: hostPath + '/j2UnitCode.jhtml?method=getName',
                        params: {
                            code: value
                        },
                        success: function(response) {
                            var text = response.responseText;
                            if (text != '') {
                                cnm.add(value, text);
                                var grid = Ext.ComponentQuery.query('compareView gridpanel')[0];
                                grid.getView().getCell(record, grid.down('gridcolumn[text=乡]')).dom.childNodes[0].innerHTML = text;
                            } else cnm.add(value, value);
                        }
                    });
                    return '';
                } else return temp;
            }
        }, {
            xtype: 'gridcolumn',
            text: '村',
            dataIndex: 'c_cun',
            flex: 3,
            renderer: function(value, metaData, record, rowIndex, colIndex, store) {
                var temp = cnm.get(value);
                if (!temp) {
                    Ext.Ajax.request({
                        url: hostPath + '/j2UnitCode.jhtml?method=getName',
                        params: {
                            code: value
                        },
                        success: function(response) {
                            var text = response.responseText;
                            if (text != '') {
                                cnm.add(value, text);
                                var grid = Ext.ComponentQuery.query('compareView gridpanel')[0];
                                grid.getView().getCell(record, grid.down('gridcolumn[text=村]')).dom.childNodes[0].innerHTML = text;
                            } else cnm.add(value, value);
                        }
                    });
                    return '';
                } else return temp;
            }
        }, {
            xtype: 'gridcolumn',
            text: '变化原因',
            dataIndex: 'c_bhyy',
            flex: 3
//            ,
//            renderer: function(value, record) {
//                return (new Number(value)).toFixed(2);
//            }
        }],
        listeners: {
            itemclick: function(grid, record, item, index, e, eOpts) {
                locateResultFeature(index);
            }
        }
    }]
});