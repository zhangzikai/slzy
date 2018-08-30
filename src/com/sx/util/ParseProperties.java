package com.sx.util;

import java.util.*;
import java.io.*;
import java.net.URL;
import java.net.URLConnection;

/**
 * 
  *类描述： 解析数据库配置文件类
  * @author: miaoshuangfei
  * @date： 日期：Oct 26, 2011 时间：1:28:55 PM
  * @version 1.0
  * <b>Summary: </b>
  *      TODO 请在此处简要描述此类所实现的功能。因为这项注释主要是为了在IDE环境中生成tip帮助，务必简明扼要
  * <b>Remarks: </b>
  *        TODO 请在此处详细描述类的功能、调用方法、注意事项、以及与其它类的关系
  * 
  *
 */
public class ParseProperties {
	// 定义一个properties文件的名字
    private String propFile ="sysConfig.properties";
    // 定义一个properties对象
    public Properties properties = new Properties();
    /**
     * 
      * <b>Summary: </b>
      *     构造一个 ParseProperties  
      * <b>Remarks: </b>
      *     构造类 ParseProperties 的构造函数 ParseProperties
     */
    public ParseProperties() {
		super();
		try {
            // 读取properties
            InputStream file = ParseProperties.class.getClassLoader().getResourceAsStream(propFile);
            // 加载properties文件
            properties.load(file);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
		// TODO Auto-generated constructor stub
	}
    
    /**
     *  通过KEY返回对应的值
      * <b>Summary: </b>
      *     getProperty(请用一句话描述这个方法的作用)
      * @param property
      * @return
     */
	public String getProperty(String property){
    	return this.properties.getProperty(property);
    } 
	
	public static String getText(String url) throws Exception {
	      URL website = new URL(url);
	      URLConnection connection = website.openConnection();
	      BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));

	      StringBuilder response = new StringBuilder();
	      String inputLine;

	      while ((inputLine = in.readLine()) != null) 
	          response.append(inputLine);

	      in.close();

	      return response.toString();
	  }
    
	/**
     * @param args
    */
     public static void main(String[] args) {
         File file = new File(ParseProperties.class.getClass().getClassLoader().getResource("").getPath()+"sysConfig.properties");
         BufferedReader reader = null;
         try {
             reader = new BufferedReader(new FileReader(file));
             String tempString = null;
             while ((tempString = reader.readLine()) != null) {
            	 if(tempString.indexOf("#")==-1){
            		 System.out.println(tempString.substring(tempString.indexOf("=")+1));
            	 }
             }
             reader.close();
         } catch (IOException e) {
             e.printStackTrace();
         } 
     }
	
}

