Ext.define('MyApp.view.XBQueryView', {
    extend: 'Ext.panel.Panel',
    alias:'widget.xbQueryWidget',
    height: 499,
    width: 307,
    layout: 'border',
    header: false,
    title: '小班查询',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    region: 'north',
                    height: 150,
                    layout: 'anchor',
                    header: false,
                    title: 'My Panel',
                    items: [
                        {
                            xtype: 'treepicker',
                            fieldLabel: '行政区划',
                            labelAlign: 'right',
                            labelWidth: 80,
                            anchor: '100%',
                            margin: 10,
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
                                    url: hostPath +'/j2UnitCode.jhtml?method=queryList',
                                    reader: {
                                        type: 'json'
                                    }
                                }
                            })
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            margin: 10,
                            name:'lbhID',
                            fieldLabel: '林班号',
                            labelAlign: 'right',
                            labelWidth: 80
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            margin: 10,
                            name:'xbhID',
                            fieldLabel: '小班号',
                            labelAlign: 'right',
                            labelWidth: 80
                        },
                        {
                            xtype: 'container',
                            margin: 10,
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    margin: '',
                                    width: 80,
                                    text: '查询',
                                    handler:function(){
                                    	var text="";
                                    	var treepicker = Ext.ComponentQuery.query('xbQueryWidget treepicker[name="unitID"]')[0];
                                    	if(typeof(treepicker.displayTplData[0])=='undefined')
                                    		alert("请选择行政单位");
                                	    var areaCode = treepicker.displayTplData[0].code;
                                	    var codelevel = treepicker.displayTplData[0].codelevel;
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
                                	    var lbh = Ext.ComponentQuery.query('xbQueryWidget textfield[name="lbhID"]')[0].getValue();
                                	    if(lbh!=""){
                                	    	text+="c_lb:"+lbh+",";
                                	    }
                                	    var xbh = Ext.ComponentQuery.query('xbQueryWidget textfield[name="xbhID"]')[0].getValue();
                                	    if(xbh!=""){
                                	    	text+="c_xb:"+xbh+",";
                                	    }
                                		queryXB('xbQuery',text.substring(0,text.length-1));
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'gridpanel',
                    region: 'center',
                    title: '查询结果',
                    store:new Ext.data.JsonStore({fields : ['c_xb','c_lb','c_xiang','c_cun','d_mj'],data : []}),
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            text: '小班号',
                            dataIndex:'c_xb',
                            flex: 1,
                            hidden: true
                        },
                        {
                            xtype: 'gridcolumn',
                            text: '林班号',
                            dataIndex:'c_lb',
                            flex: 1,
                            hidden: false
                        },
                        {
                            xtype: 'gridcolumn',
                            text: '乡',
                            dataIndex:'c_xiang',
                            flex: 3,
                            renderer:function(value, metaData, record, rowIndex, colIndex, store){
                            	var temp = cnm.get(value);
                            	if(!temp){
                            		Ext.Ajax.request({
                            		    url: hostPath +'/j2UnitCode.jhtml?method=getName',
                            		    params: {
                            		        code: value
                            		    },
                            		    success: function(response){
                            		        var text = response.responseText;
                            		        if(text!=''){
                            		        	cnm.add(value, text);
                            		             var grid = Ext.ComponentQuery.query('xbQueryWidget gridpanel')[0];
                            		             grid.getView().getCell(record,grid.down('gridcolumn[text=乡]')).dom.childNodes[0].innerHTML=text;
                            		            }
                            		        else
                            		        	cnm.add(value,value);
                            		        	
                            		    }
                            		});
                                	return '';
                            	}
                            	else
                            		return temp;

                            	
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            text: '村',
                            dataIndex:'c_cun',
                            flex: 3,
                            renderer:function(value, metaData, record, rowIndex, colIndex, store){
                            	var temp = cnm.get(value);
                            	if(!temp){
                            		Ext.Ajax.request({
                            		    url: hostPath +'/j2UnitCode.jhtml?method=getName',
                            		    params: {
                            		        code: value
                            		    },
                            		    success: function(response){
                            		        var text = response.responseText;
                            		        if(text!=''){
                            		        	cnm.add(value, text);
                            		             var grid = Ext.ComponentQuery.query('xbQueryWidget gridpanel')[0];
                            		             grid.getView().getCell(record,grid.down('gridcolumn[text=村]')).dom.childNodes[0].innerHTML=text;
                            		            }
                            		        else
                            		        	cnm.add(value,value);
                            		        	
                            		    }
                            		});
                                	return '';
                            	}
                            	else
                            		return temp;

                            	
                            }
                            
                        },
                        {
                            xtype: 'gridcolumn',
                            text: '面积',
                            dataIndex:'d_mj',
                            flex: 3,
                            renderer: function (value, record) {
                                
                                return  (new Number(value)).toFixed(2);
                            }
                        }
                    ],
                    listeners:{
                    	itemclick:function(grid, record, item, index, e, eOpts ){
                    		locateResultFeature(index);
                    		locateResultFeature3D(index);
                    	}
					}
                }
            ]
        });

        me.callParent(arguments);
    }

});