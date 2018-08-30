/*
 * 数据加载工具 2013-12-20 11:25:16
 * */
//类 DataTool
var DataLoadTool={
		isTerrainAnalyse:true,
		isSightAnalyse:true,
		/**
		*打开数据加载菜单
		*KML文件、Shape文件、影像文件
		*/
		dataLoad:function(){
			var html='<div style="text-align: center;vertical-align: middle;" onclick="DataLoadTool.loadKML();"><img src="images/loadKML.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">KML文件</pan></div></div>'+
			'<div style="text-align: center;vertical-align: middle;" onclick="DataLoadTool.loadSHP();"><img src="images/loadSHP.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">Shape文件</span></div></div>'+
			'<div style="text-align: center;vertical-align: middle;" onclick="DataLoadTool.loadImage();"><img src="images/loadImage.png" style="cursor: pointer;"></img><div><span style="cursor: pointer;">影像文件</span></div></div>';
			var isShow=SystemTool.createTab("dataLoadTab","数据加载",html);
			if(isShow){
				return;
			}
		},
		/**
		*加载KML文件
		*/
		loadKML:function(){
			var isShow=SystemTool.createTab("loadKMLTab","加载KML文件",'<div id="loadKMLDiv"></div>');
			if(isShow){
				return;
			}
			var file;
			var loadKMLForm = new Ext.FormPanel({
                labelWidth: 75, // label settings here cascade unless overridden
                url:SystemTool.basePath+'/servlet/upload',
                frame:true,
                renderTo:'loadKMLDiv',
                title: '加载KML文件',
                bodyStyle:'padding:5px 5px 0',
                autoWidth:true,
                fileUpload:true,
                defaultType: 'textfield',
                items: [{
                    xtype: 'fileuploadfield',
                    id: 'kmlFile',
                    emptyText: '请选择kml文件...',
                    fieldLabel: 'KML文件',
                    name: 'kmlFilePath',
                    permitted_extensions:['kmz','jpg','jpeg','JPEG','GIF','gif'],  
                    anchor:'90%',
                    buttonText: '',
                    buttonCfg: {
                        iconCls: 'upload-icon'
                    }
                }],
                buttons: [{
                    text: '上传文件',
                    handler:function(){
                    	if(loadKMLForm.getForm().isValid()){
                    		loadKMLForm.getForm().submit({
        	                    success: function(fp, o){
        	                    	file=o.result;
        	                    	alert('KML文件上传成功');
        	                    	document.getElementById("wwjAppletIframe").src=document.getElementById("wwjAppletIframe").src;
        	                    }
        	                });
                        }
                    }
                },{
                    text: '加载文件',
                    handler:function(){
                    	addKml("http://192.168.0.132:8080/WRMS/datas/kml/ceshi.kmz","aaaaa");
                    	if(file==null){
                    		alert("请先上传KML文件!");
                    	}else{
                    		alert(SystemTool.basePath+"/common/download.jsp?fileName="+file.fileName+file.fileExt);
                    		addKml(SystemTool.basePath+"/common/download.jsp?fileName="+file.fileName+file.fileExt,file.fileName);
                    		addKml3("http://192.168.0.132:8080/WRMS/datas/upload/ceshi.kmz",file.fileName);
                    	}
    		        }
                },{
                    text: '取消',
                    handler:function(){
                    	SystemTool.deleteTab("loadKMLTab");
    		        }
                }]
            });
		},
		/**
		 * 加载Shape文件
		 */
		loadSHP:function() {
			var isShow=SystemTool.createTab("loadSHPTab","加载Shape文件",'<div id="loadSHPDiv"></div>');
			if(isShow){
				return;
			}
			var file;
			var loadSHPForm = new Ext.FormPanel({
                labelWidth: 75, // label settings here cascade unless overridden
                url:SystemTool.basePath+'/servlet/upload',
                frame:true,
                renderTo:'loadSHPDiv',
                title: '加载Shape文件',
                bodyStyle:'padding:5px 5px 0',
                autoWidth:true,
                fileUpload:true,
                defaultType: 'textfield',
                items: [{
                    xtype: 'fileuploadfield',
                    id: 'shapeFile',
                    emptyText: '请选择Shape文件...',
                    fieldLabel: 'Shape文件',
                    name: 'shapeFilePath',
                    permitted_extensions:['kmz','jpg','jpeg','JPEG','GIF','gif'],  
                    anchor:'90%',
                    buttonText: '',
                    buttonCfg: {
                        iconCls: 'upload-icon'
                    }
                }],
                buttons: [{
                    text: '上传文件',
                    handler:function(){
                    	if(loadSHPForm.getForm().isValid()){
                    		loadSHPForm.getForm().submit({
        	                    success: function(fp, o){
        	                    	file=o.result;
        	                    	alert('shp文件上传成功');
        	                    }
        	                });
                        }
                    }
                },{
                    text: '加载文件',
                    handler:function(){
                    	if(file==null){
                    		alert("请先上传Shp文件!");
                    	}else{
                    		addShp1(SystemTool.basePath+"/common/download.jsp?fileName="+file.fileName+file.fileExt,file.fileName);
                    	}
                    }
                },{
                    text: '取消',
                    handler:function(){
                    	SystemTool.deleteTab("loadSHPTab");
    		        }
                }]
            });
		},
		/**
		*加载影像文件
		*/
		loadImage:function(){
			var isShow=SystemTool.createTab("loadImageTab","加载影像文件",'<div id="loadImageDiv"></div>');
			if(isShow){
				return;
			}
			var file;
			var loadImageForm = new Ext.FormPanel({
                labelWidth: 75, // label settings here cascade unless overridden
                url:SystemTool.basePath+'/servlet/upload',
                frame:true,
                renderTo:'loadImageDiv',
                title: '加载影像文件',
                bodyStyle:'padding:5px 5px 0',
                autoWidth:true,
                fileUpload:true,
                defaultType: 'textfield',
                items: [{
                    xtype: 'fileuploadfield',
                    id: 'imageFile',
                    emptyText: '请选择影像文件...',
                    fieldLabel: '影像文件',
                    name: 'imageFilePath',
                    permitted_extensions:['kmz','jpg','jpeg','JPEG','GIF','gif'],  
                    anchor:'90%',
                    buttonText: '',
                    buttonCfg: {
                        iconCls: 'upload-icon'
                    }
                }],
                buttons: [{
                    text: '上传影像文件',
                    handler:function(){
                    	if(loadImageForm.getForm().isValid()){
                    		loadImageForm.getForm().submit({
        	                    success: function(fp, o){
        	                    	file=o.result;
        	                    	alert('影像文件上传成功');
        	                    	document.getElementById("wwjAppletIframe").src=document.getElementById("wwjAppletIframe").src;
        	                    }
        	                });
                        }
                    }
                },{
                    text: '加载影像文件',
                    handler:function(){
                    	if(file==null){
                    		alert("请先上传Tif文件!");
                    	}else{
                    		flyToTif();
                    	}
    		        }
                },{
                    text: '取消',
                    handler:function(){
                    	SystemTool.deleteTab("loadImageTab");
    		        }
                }]
            });
		}
};
