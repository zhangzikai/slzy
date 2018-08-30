Ext.define('MyApp.view.ThematicView', {
    extend: 'Ext.panel.Panel',
    alias:'widget.thematicWidget',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View'
    ],

    layout: 'fit',
    header: false,
    title: 'My Panel',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {   
                	xtype:'gridpanel',
        			id:'themeGrid',
        			hidden:false,
        			header:false,
        			title:'专题图名称',
        			flex:1,
        			border : true,
        			columnLines : true,
        			autoScroll : true,
           	        store:new Ext.data.JsonStore({
	           	         autoDestroy: true,
	           	      	 autoLoad:true,
	           	      	 proxy:{
	           	      		 type:'ajax',
		           	         url:SystemTool.basePath+'/themeMap.jhtml?method=queryList',
		           	         reader:{
		           	        	 type:'json',
			           	         idProperty: 'id'
		           	         }
	           	      	 },

	           	         fields: ['themeName', 'url','theme','layers']
	           	     }),
        			autoHeight:true,
        			stripeRows:true,
        			loadMask : {msg : '正在加载数据……'},
        			columns:[
        			         {xtype:'rownumberer'},
        			         {
                        xtype: 'gridcolumn',
                        dataIndex: 'themeName',
                        text: '专题图名称',
                        flex: 1
                    }],
        		    listeners:{
        				itemClick:function(grid, record, item, index, e, eOpts){
        					var themeNum = record.get('theme'); 
        					var name=decodeURI(record.get('themeName'));
        					var url=record.get('url');
        					var layer = record.get('layers');
        					//loadThemeLayer(name,url);
        					window.open(hostPath+"/ztt.jsp?zttName="+name+"&url="+url+"&layer="+layer);
        				}
        			}
        		}
            ]
        });

        me.callParent(arguments);
    }

});