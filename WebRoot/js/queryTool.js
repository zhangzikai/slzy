/*
 * 查询工具 2013-12-20 11:25:16
 * */
//类 QueryTool
var QueryTool={
		queryGrid:null,
		queryStore:null,
		record:null,
		loading:null,
		isShowMarker:true,
		/**
		*通过关键字和空间范围
		*去打开查询页面
		*/
		goQuery:function(){
			var isShow=SystemTool.createTab("queryTab","查询",'<div id="queryDiv"></div><div id="queryGridDiv"></div>');
			if(isShow){
				return;
			}
			
			Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
			var dataArray=new Array();
		    this.queryStore = new Ext.data.ArrayStore({
		        fields: [
		           {name: 'fid'},
		           {name: 'name'},
		           {name: 'y',type: 'float'},
		           {name: 'x',type: 'float'}
		        ],
		        listeners:{  
		             beforeload:function(){  
		            	 this.loading.hide();
		             },load:function(){
		            	 if(this.loading==null){
		            		 this.loading = new Ext.LoadMask("queryGridDiv",{
			            		 msg : 'Loading...'
			            	 });            
		            	 }else{
		            		 this.loading.show();
		            	 }
		             },reload:function(){
		            	 if(this.loading==null){
		            		 this.loading = new Ext.LoadMask("queryGridDiv",{
			            		 msg : 'Loading...'
			            	 });            
			            	 this.loading.show();
		            	 }else{
		            		 this.loading.hide();
		            	 }
	                 }
		        }
		    });
		    this.queryStore.loadData(dataArray);
		    
		    var queryLayerStore = new Ext.data.ArrayStore({
		        fields: ['id','name'],
		        data :[
		               ['kuergan_Hydrology','水文站'],
		               ['kuergan_Rainfall','雨量站'],
		               ['kuergan_level','水位站'],
		               ['kuergan_weather','气象站'],
		               ['kuergan_power','电站'],
		               ['kuergan_Reservoir','水库']
		         ]
		    });
		    
		    this.queryGrid = new Ext.grid.GridPanel({
		        store:this.queryStore,
		        columns: [
		            {id:'fid',header: "fid", width: 80,hidden:false,sortable: true, dataIndex: 'fid'},
		            {header: "名称", width: 120, sortable: true, dataIndex: 'name'}
		        ],
		        stripeRows: true,
		        autoExpandColumn: 'fid',
		        width: 290,
		        title:'查询结果列表',
		        border:false,
		        autoScroll: true,
                autoHeight:true,
                autoWidth: true
		    });
		    this.queryGrid.addListener('rowclick', function(grid, rowIndex, columnIndex, e){
		    	//removeAllAnnotation();
		    	var record = grid.getStore().getAt(rowIndex); //Get the Record   
		    	flyTo(record.get("y"),record.get("x"));
		    	//addAnnotation("<p style='width:90px;'>名称:"+record.get("name")+"</p>",record.get("y"),record.get("x"),170,60,record.get("fid"));
		    });
		    var points="";
		    var searchForm = new Ext.FormPanel({//这里是搜索表单
		        buttonAlign:'right',
		        labelWidth:50,
		        region:'center',
		        autoWidth: true,
		        autoScroll: true,
		        frame:true,
		        title: '搜索条件',
		        items: [{
		                layout:'column',
		                items:[{
			                    columnWidth:.5,
			                    layout: 'form',
			                    items: [new Ext.form.ComboBox({
                                    store: queryLayerStore,
                                    displayField:'name',
                                    fieldLabel: "图层",
                                    typeAhead: true,
                                    valueField: "id",
                                    mode: 'local',
                                    forceSelection: true,
                                    triggerAction: 'all',
                                    emptyText:'请选择...',
                                    anchor:'90%',
                                    selectOnFocus:true,
                                    id:'layerName',
                                    hiddenName:'combo',
                                    allowBlank:false
                                })]
			                },{
			                    columnWidth:.5,
			                    layout: 'form',
			                    items: [{
			                        xtype:'textfield',
			                        fieldLabel: '关键字',
			                        name: 'keyword',
			                        id: 'keyword',
			                        anchor:'90%'
			                    }]
			                }]
		            },{
		                layout:'column',
		                columnWidth:1.5,
		                items:[{
							tabPosition:'bottom',
							autoScroll : true,
							tbar : [{
								text : '多边形',
								iconCls : 'selectByPolygon',
								handler : function(){
									startDrawShape("Polygon");
								}
							}, '-', {
								text : '矩形',
								iconCls : 'selectByPolygon',
								handler : function(){
									startDrawShape("Rectangle");
								}
							},'-', {
								text : '圆',
								iconCls : 'selectByPolygon',
								handler : function(){
									startDrawShape("Circle");
								}
							},  '-', {
								text : '结束',
								iconCls : 'zin',
								handler : function(){
									points=stopQueryTool();
								}
							}, '-', {
								text : '清除',
								iconCls : 'clear',
								handler : function(){
									clearQuery();
								}
							}]
		                }]
		            }
		        ],
		        buttons: [{
		            text: '搜索',
		            handler:function(){
		             // 这里是关键，重新载入数据源，并把搜索表单值提交
		            	points=stopQueryTool();
		            	if(searchForm.getForm().isValid()){
			            	QueryTool.doQuery(Ext.getCmp('layerName').getValue(),Ext.get('keyword').dom.value,points);
		            	}
		            }
		        },{
		            text: '重置',
		            handler:function(){searchForm.form.reset();}
		        }]
		    });
		    Ext.get('queryDiv').dom.innerHTML='';
		    Ext.get('queryGridDiv').dom.innerHTML='';
		    searchForm.render('queryDiv');
		    this.queryGrid.render('queryGridDiv');
		},
		/**
		*通过关键字和空间范围
		*执行查询拦坝河信息
		*/
		doQuery:function(layerName,keyword,points){
			var filter;
           if(points!="[]"&&points!=""){
        		var pointsJson=eval("("+points+")");;
    			var pointList = [];  
    			Ext.iterate(pointsJson, function(item, key){
    				pointList.push(new OpenLayers.Geometry.Point(item.longitude,item.latitude));
    			});
                var linearRing = new OpenLayers.Geometry.LinearRing(pointList);   
                var polygon=new OpenLayers.Geometry.Polygon([linearRing]); 
        	   filter = new OpenLayers.Filter.Logical({
        		   	type: OpenLayers.Filter.Logical.AND,
               		filters: [
               	          new OpenLayers.Filter.Spatial({
               	        	  type: OpenLayers.Filter.Spatial.INTERSECTS, //INTERSECTS:面与面相交- Intersects,Contains:面与面包含- Contains//相交OK
               	        	  value: polygon,
               	        	  projection: "EPSG:4326"
               	          }),
               	          new OpenLayers.Filter.Comparison({//比较操作符
               	        	  type: OpenLayers.Filter.Comparison.LIKE, //模糊查询（通配符：*/#/!），速度很慢
               	        	  property: "xiabandi:name",
               	        	  value: "*"+keyword+"*"
               	          })
               	     ]
               	});
           }else{
        	   filter = new OpenLayers.Filter.Logical({
       		   		type: OpenLayers.Filter.Logical.AND,
              		filters: [
              	          new OpenLayers.Filter.Comparison({//比较操作符
              	        	  type: OpenLayers.Filter.Comparison.LIKE, //模糊查询（通配符：*/#/!），速度很慢
              	        	  property: "xiabandi:name",
              	        	  value: "*"+keyword+"*"
              	          })
              	     ]
              	});
           }
            var filter_1_0 = new OpenLayers.Format.Filter.v1_0_0(); 
            var xml = new OpenLayers.Format.XML(); 
			// 过滤条件
			var xmlPara = "<?xml version='1.0' encoding='UTF-8'?>"
					+ "<wfs:GetFeature service='WFS' version='1.0.0' "
					+ "xmlns:wfs='http://www.opengis.net/wfs' "
					+ "xmlns:gml='http://www.opengis.net/gml' "
					+ "xmlns:ogc='http://www.opengis.net/ogc' "
					+ "xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' "
					+ "xsi:schemaLocation='http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/wfs.xsd'>"
					+ "<wfs:Query typeName='xiabandi:"+layerName+"' srsName='EPSG:4326' >"
					+xml.write(filter_1_0.write(filter))
				    + "</wfs:Query>"
					+ "</wfs:GetFeature>";
			// 发送请求
			var request = OpenLayers.Request.POST({
				url : SystemTool.wfsUrl,
				data : xmlPara,// 请求数据
				callback : this.queryHandler
			});
			
		},
		/**
		*通过关键字和空间范围
		*回调处理,添加标注和列表显示
		*/
		queryHandler:function(req){
			var gml = new OpenLayers.Format.GML();
			var queryResultFeatures = gml.read(req.responseText);
			var featureMember,point,data;
			var dataArray = new Array();
			removeAllMarkers();
			$("#resultTable").html("");
			for(var i=0;i<queryResultFeatures.length;i++){
				featureMember=queryResultFeatures[i];
				point = featureMember.geometry.getCentroid();
				addMarkerAnnotation(point.y,point.x,SystemTool.basePath+"/images/marker/goldMarker.png",featureMember.attributes.name,"<p style='width:90px;'>名称:"+featureMember.attributes.name+"</p>",170,60,featureMember.fid);
				data=new Array(featureMember.fid,featureMember.attributes.name,point.y,point.x);
				$("#resultTable").append("<tr onclick='flyTo("+point.y+","+point.x+");'><td>"+(i+1)+"、</td><td>"+featureMember.attributes.name+"</td></tr>");
				//dataArray[i]=data;
			}
			return ;
			Ext.get('queryGridDiv').dom.innerHTML='';
	    	this.queryStore = new Ext.data.ArrayStore({
		        fields: [
		           {name: 'fid'},
		           {name: 'name'},
		           {name: 'y',type: 'float'},
		           {name: 'x',type: 'float'}
		        ],
		        listeners:{  
		             beforeload:function(){  
		            	 this.loading.hide();
		             },load:function(){
		            	 if(this.loading==null){
		            		 this.loading = new Ext.LoadMask("queryGridDiv",{
			            		 msg : 'Loading...'
			            	 });            
		            	 }else{
		            		 this.loading.show();
		            	 }
		             },reload:function(){
		            	 if(this.loading==null){
		            		 this.loading = new Ext.LoadMask("queryGridDiv",{
			            		 msg : 'Loading...'
			            	 });            
			            	 this.loading.show();
		            	 }else{
		            		 this.loading.hide();
		            	 }
	                 }
		        }
		    });
	    	this.queryGrid = new Ext.grid.GridPanel({
		        store:queryStore,
		        columns: [
					//序号
					new Ext.grid.RowNumberer({header:"序号",width: 40,
						renderer: function (value, metadata, record, rowIndex) {
							return rowIndex+1;
						} 
					}),
		            {id:'fid',header: "fid", width: 80,hidden:true,sortable: true, dataIndex: 'fid'},
		            {header: "名称", width: 120, sortable: true, dataIndex: 'name'}
		        ],
		        stripeRows: true,
		        autoExpandColumn: 'fid',
		        renderTo:'queryGridDiv',
		        width: 260,
		        height: 500,
		        border:false,
		        autoScroll: true,
                autoHeight:true,
                autoWidth: true
		    });
		    this.queryGrid.addListener('rowclick', function(grid, rowIndex, columnIndex, e){
		    	var record = grid.getStore().getAt(rowIndex); //Get the Record   
		    	flyTo(record.get("y"),record.get("x"));
		    });
		    this.queryStore.loadData(dataArray);
		    this.queryGrid.getStore().reload();
		},
		
		showMarker:function(){
			if(!this.isShowMarker){
				removeAllMarkers();
				this.isShowMarker=true;
				return;
			}else{
				removeAllMarkers();
				for(var i=0;i<SystemTool.queryLayerStore.getCount();i++){
					this.doMarker(SystemTool.queryLayerStore.getAt(i).get('id'), SystemTool.queryLayerStore.getAt(i).get('marker'));
				}
				this.isShowMarker=false;
			}
		},
		doMarker:function(layerName,marker,isAdd){
			var xmlPara = "<?xml version='1.0' encoding='UTF-8'?>"
				+ "<wfs:GetFeature service='WFS' version='1.0.0' "
				+ "xmlns:wfs='http://www.opengis.net/wfs' "
				+ "xmlns:gml='http://www.opengis.net/gml' "
				+ "xmlns:ogc='http://www.opengis.net/ogc' "
				+ "xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' "
				+ "xsi:schemaLocation='http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/wfs.xsd'>"
				+ "<wfs:Query typeName='xiabandi:"+layerName+"' srsName='EPSG:4326' >"
			    + "</wfs:Query>"
				+ "</wfs:GetFeature>";
			// 发送请求
			var request = OpenLayers.Request.POST({
				url : SystemTool.wfsUrl,
				data : xmlPara,// 请求数据
				callback : function(req){
					var gml = new OpenLayers.Format.GML();
					var queryResultFeatures = gml.read(req.responseText);
					var featureMember,point,name;
					for(var i=0;i<queryResultFeatures.length;i++){
						featureMember=queryResultFeatures[i];
						point = featureMember.geometry.getCentroid();
						if(isAdd==true){
							name=featureMember.attributes.name==null?"无":featureMember.attributes.name;
							addMarkerAnnotation(point.y,point.x,SystemTool.basePath+"/images/marker/"+marker+".png",featureMember.attributes.name,"<p style='width:90px;'>名称:"+name+"</p>",170,60,featureMember.fid);
						}else{
							deleteMarker(featureMember.fid);
						}
					}
				}
			});
		}
};
