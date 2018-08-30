package com.sx.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.sx.entity.ThemeMap;
import com.sx.service.ThemeMapService;
@Controller
@RequestMapping("")
public class SysController{

	@Autowired
	private ThemeMapService themeMapManager;
	@RequestMapping("/getLayers.jhtml")
	public void getLayers(HttpServletRequest request, HttpServletResponse response){
		File file = new File(this.getClass().getClassLoader().getResource("").getPath()+"sysConfig.properties");
		String layers="";
		BufferedReader reader = null;
        try{
            reader = new BufferedReader(new FileReader(file));
            String tempString = null;
            while ((tempString = reader.readLine()) != null) {
            	if(tempString.trim().length()!=0&&tempString.indexOf("#")==-1){
           		   if(layers.trim().length()==0){
           				layers+=tempString.substring(tempString.indexOf("=")+1);
	         	   }else{
	         		   layers+="#"+tempString.substring(tempString.indexOf("=")+1);
	         	   }
            	}
            }
            List<ThemeMap> dataList=themeMapManager.queryList();
            for(ThemeMap themeMap:dataList){
            	if(themeMap.getWms()!=null&&themeMap.getLayers()!=null){
            		layers+="#"+themeMap.getWms()+"&"+themeMap.getLayers()+"&false&Layer";
            	}
            }
            reader.close();
            response.getWriter().write(layers);
        } catch (IOException e) {
            e.printStackTrace();
        } 
	}
}
