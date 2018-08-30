Ext.define('MyApp.view.XBCondQueryView', {
    extend: 'Ext.panel.Panel',
    alias:'widget.xbCondQueryWidget',

    requires: [
        'Ext.form.field.ComboBox',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.grid.View'
    ],

    height: 499,
    width: 307,
    layout: 'border',
    header: false,
    title: '条件查询',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    region: 'north',
                    height: 240,
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
                            xtype: 'combobox',
                            anchor: '100%',
                            margin: 10,
                            fieldLabel: '字段',
                            labelAlign: 'right',
                            labelWidth: 80,
                            name:'fieldName',
							valueField: 'fieldName',
							displayField: 'fieldAlias',
							id:'fieldID1',
							editable:false,
						    store: new Ext.data.JsonStore({
						    	autoDestroy: true,
						    	autoLoad:true,
						    	proxy: {
						            type: 'ajax',
						            url: SystemTool.basePath + '/xbField.jhtml?method=queryList&isEnable=1',
						            reader: {
						                type: 'json'
						            }
						        },
						        storeId: 'fieldStore',
						        root: null,
						        idProperty: 'name',
						        fields: ['fieldName', 'fieldAlias','codeName']
						    }),
						    listeners:{
						        'change': function(combo, newValue,oldValue, index){
						        	var combo = Ext.getCmp('fieldID1');
						        	var codeId = combo.getValue();
						        	var codeName = combo.getRawValue();
						        	var store = Ext.getCmp('valID1').getStore();
						        	if(codeName==""){
						        		store.removeAll();
						        		return;
						        	}
						        	Ext.getCmp('valID1').fireEvent('expand');
						        	store.load({params:{codeName:codeName,codeId:codeId}});
						        }
						    }
                        },
                        {
                            xtype: 'combobox',
                            anchor: '100%',
                            margin: 10,
                            fieldLabel: '关系',
                            labelAlign: 'right',
                            labelWidth: 80,
                            store:new Ext.data.ArrayStore({
						        fields: ['rel','relName'],
						        data: [['=', '等于'],['>','大于'],['<','小于'],['Like','Like']]
						    }),
						    id:'relID1',
						    name:'relID',
						    valueField: 'rel',
							displayField: 'relName'
                        },
                        {
                            xtype: 'combobox',
                            anchor: '100%',
                            margin: 10,
                            fieldLabel: '值',
                            labelAlign: 'right',
                            labelWidth: 80,
                            store:new Ext.data.JsonStore({
						    	autoDestroy: true,
						    	autoLoad:true,
						    	proxy: {
						            type: 'ajax',
						            url: SystemTool.basePath + '/codeTable.jhtml?method=queryList',
						            reader: {
						                type: 'json'
						            }
						        },
						        storeId: 'valueStore',
						        root: null,
						        idProperty: 'name',
						        fields: ['psbCode', 'psbValue']
						    }),
						    queryMode:'local',
						    valueField: 'psbCode',
							displayField: 'psbValue',
						    name:'valID',
							id:'valID1'
                        },
                        {
                        	xtype:'textareafield',
                        	name:'textSql',
                        	anchor:'100%',
                        	margin:10,
                        	readOnly:true,
                        	fieldLabel:'查询条件',
                        	labelAlign: 'right',
                            labelWidth: 80,
                            height:50
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
                            		xtype:'button',
                            		width:80,
                            		text:'添加',
                            		handler:function(){
                            			var textfield = Ext.ComponentQuery.query('xbCondQueryWidget textareafield[name="textSql"]')[0];
                            			var text = textfield.getValue();
                            			
                            			var field = Ext.ComponentQuery.query('xbCondQueryWidget combobox[name="fieldName"]')[0].getValue();
                                	    var rel = Ext.ComponentQuery.query('xbCondQueryWidget combobox[name="relID"]')[0].getValue();
                                	    var val = Ext.ComponentQuery.query('xbCondQueryWidget combobox[name="valID"]')[0].getValue();

                                	    if(field=="" || rel=="" || val=="")return;
                                	    if(text.length>0){
                                	    	text+=" {and} ";
                                	    }
                                	    
                                	    if(rel=='Like'&&val[val.length-1]=='0'){
                                	    	val=val.substring(0,val.length-1)+'.';
                                	    }
                                	    text += field +" "+rel+" "+val;
                                	    
                                	    textfield.setValue(text);
                            		}
                            	},
                            	{
                            		xtype:'button',
                            		width:80,
                            		text:'清除',
                            		handler:function(){
                            			var textfield = Ext.ComponentQuery.query('xbCondQueryWidget textareafield[name="textSql"]')[0];
                            			textfield.setValue('');
                            		}
                            	},
                                {
                                    xtype: 'button',
                                    margin: '',
                                    width: 80,
                                    text: '查询',
                                    handler:function(){
                                    	var text="";
                                    	var treepicker = Ext.ComponentQuery.query('xbCondQueryWidget treepicker[name="unitID"]')[0];
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
                                	    //var field = Ext.ComponentQuery.query('xbCondQueryWidget combobox[name="fieldName"]')[0].getValue();

                                	    //var rel = Ext.ComponentQuery.query('xbCondQueryWidget combobox[name="relID"]')[0].getValue();

                                	    //var val = Ext.ComponentQuery.query('xbCondQueryWidget combobox[name="valID"]')[0].getValue();
                                	   
                                	    //if(field!="" && rel!="" && val!=""){
                                	    	// 目前只支持等于
                                	    //	text += field +":"+val+",";
                                	    //}

                                	    //text +="rel:"+rel+","
                                	    var textfield = Ext.ComponentQuery.query('xbCondQueryWidget textareafield[name="textSql"]')[0];
                            			var textSql = textfield.getValue();
                                	    text+=textSql;
                                	    
                                		queryXB('condQuery',text);
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
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            text: '林班号',
                            dataIndex:'c_lb',
                            flex: 1
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
                            		             var grid = Ext.ComponentQuery.query('xbCondQueryWidget gridpanel')[0];
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
                            		             var grid = Ext.ComponentQuery.query('xbCondQueryWidget gridpanel')[0];
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
//                                console.log(value);
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