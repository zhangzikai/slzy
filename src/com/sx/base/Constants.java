package com.sx.base;

import java.util.HashMap;
import java.util.Map;

/**
 * copyright (c) by 中科软
 * @author：苗双飞
 * E-mail: miaoshuangfei11256@sinosoft.com.cn
 * @date：July 16, 2012 5:12:28 PM
 */
public class Constants {

	public static final String AVAILIST_ROLES = "availistRoles";

	public static final String AVAILABLE_ROLES = "availableRoles";

	public static final String AVAILIST_PERMISSONS = "availistpermissons";

	public static final String ROLE_LIST = "roleList";
	
	public static final String EMERGENCY_LIST = "emergencyList";

	public static final String AVAILABLE_PERMISSONS = "availablepermissons";

	public static final String AUTHORIY_LIST = "AuthoriyList";

	public static final String USER_LIST = "userList";
	
	public static final String PAPER_LIST = "paperList";
	
	public static final String QUESTION_LIST = "questionList";
	
	public static final String RESCUE_LIST = "rescueList";
	
	public static final String HELP_LIST = "helpList";
	
	public static final String PAPERQUESTION_LIST = "paperquestionList";
	
	public static final String SELECTION_LIST = "selectionList";

	public static final String USER_COUNT_LIST = "usercountlist";

	public static final String SESSION_USER_LIST = "sessionuserlist";

	public static final String CONFIG = "appConfig";

	public static final String CSS_THEME = "csstheme";

	public static final String PREFERRED_LOCALE_KEY = "org.apache.struts2.action.LOCALE";

	public static final String ADMIN_ROLE = "ROLE_ADMIN";

	public static final String LOCAL_USER = "localuser";

	public static final String LOCAL_SATELLITES = "satelites";

	public static final String LOCAL_SENSORS = "sensors";

	public static final String CHECKSTATUS = "checkstatus";

	public static final String ORDERSTATUS = "orderstatus";

	public static final String ORDER_LIST = "orderlist";

	public static final String SHOPCAR_LIST = "shopcarlist";

	// public static final String SHOPCAR_SESSION_LIST ="shopcarsessionlist";

	public static final String ORDERMODEL_LIST = "ordermodel";

	public static final String SYSTEM_CONFIG = "systemConfig";

	public static final String SYSTEMCONFIG_LIST = "sysConfigList";

	public static final String COLLECTINFO_LIST = "collectinfolist";

	public static final String COLLECTMODEL_LIST = "collectmodellist";

	public static final String TABLE_TYPE_CONTENT_EN = "EN";

	public static final String TABLE_TYPE_CONTENT_ZH = "ZH";

	public static final String CONTENT_TYPE_NEWS = "1";

	public static final String CONTENT_TYPE_ANNOUNCEMENT = "2";

	public static final String CONTENT_TYPE_SYSINTRODUCTION = "3";
	
	public static final String CONTENT_TYPE_CONTENT = "4";

	public static final String CONTENT_ISRELEASE_YES = "1";
	

	public static final String CONTENT_ISRELEASE_NO = "2";

	public static final String ORDER_DESC = "desc";

	public static final String ORDERY_ASC = "asc";

	public static final String ATTACHMENT_SOFT = "2";

	public static final String ATTACHMENT_FILE = "1";

	public static final String ATTACHMENT_ISRELEASE_YES = "1";

	public static final String ATTACHMENT_ISRELEASE_NO = "2";

	public static final String SYSTEMLOG_LIST = "sysLogList";

	public static final int pagesize = 10; // 页面显示的条数

	public static final String LOG_ERROR = "error";
	public static final String LOG_INFO = "info";
	public static final String LOG_WARN = "warn";
	public static final String LOG_DEBUG = "debug";
	public static final String USERTYPE_ORDINARY = "ORDINARY";
	
	public static final String LEVEL0_SCENE  = "LEVEL0";//元数据级别
	
	public static final String LEVEL_1  = "LEVEL1";//元数据级别
	public static final String LEVEL_2  = "LEVEL2";//元数据级别
	public static final String LEVEL_3  = "LEVEL3";//元数据级别
	public static final String LEVEL_4  = "LEVEL4";//元数据级别
	public static final String LEVEL_1A  = "LEVEL1A";//元数据级别
	public static final String LEVEL_1B  = "LEVEL1B";//元数据级别
	public static final String LEVEL_1C  = "LEVEL1C";//元数据级别
	public static final String LEVEL_2A  = "LEVEL2A";//元数据级别
	public static final String LEVEL_2B  = "LEVEL2B";//元数据级别
	public static final String LEVEL_2C  = "LEVEL2C";//元数据级别
	public static final String LEVEL_DEM = "DEM";
	public static final String LEVEL_DOM = "DOM";
	public static final String LEVEL_EPISTEREO = "EPISTEREO";
	public static final String LEVEL_RECT = "RECT";
	public static final String LEVEL_SDEM = "SDEM";
	public static final String LEVEL_SDOM = "SDOM";
	
	public static final String LEVEL_0_MODEL  = "ZywxImage0";//元数据级别
	public static final String LEVEL_1_MODEL  = "ZywxImage1";//元数据级别
	public static final String LEVEL_1A_MODEL  = "ZywxImage1a";//元数据级别
	public static final String LEVEL_1B_MODEL  = "ZywxImage1b";//元数据级别
	public static final String LEVEL_1C_MODEL  = "ZywxImage1c";//元数据级别
	public static final String LEVEL_2_MODEL  = "ZywxImage2";//元数据级别
	public static final String LEVEL_2A_MODEL  = "ZywxImage2a";//元数据级别
	public static final String LEVEL_2B_MODEL  = "ZywxImage2b";//元数据级别
	public static final String LEVEL_2C_MODEL  = "ZywxImage2c";//元数据级别
	public static final String LEVEL_3_MODEL  = "ZywxImage3";//元数据级别
	public static final String LEVEL_4_MODEL  = "ZywxImage4";//元数据级别
	public static final String LEVEL_DEM_MODEL = "ZywxImageHighDem";
	public static final String LEVEL_DOM_MODEL = "ZywxImageHighDom";
	public static final String LEVEL_EPISTEREO_MODEL = "ZywxImageHighEpistereo";
	public static final String LEVEL_RECT_MODEL = "ZywxImageHighRect";
	public static final String LEVEL_SDEM_MODEL = "ZywxImageHighSdem";
	public static final String LEVEL_SDOM_MODEL = "ZywxImageHighSdom";
	
	public static final String LEVEL_0_TABLE = "zywx_image_0";
	
	/**
	 * android 下载URL
	 */
	public static final String ANDROID_URL = "http://192.168.200.70:8080/ERSS/android/android.apk";
	/**
	 * android 版本号
	 */
	public static final String ANDROID_VERSION = "1.0";
	
	public static final String USER_NOLOCK = "1";
	
	public static final String USER_LOCKED = "0";
	
	public static final String OPERATOR_NAME = "sys";
	
	public static final String INDEX_QUERY_SQL = "newproductsql";
	
	public static final String NEW_PRODUCT_SESSION = "newproduct";
	
	public static final String VIEW_ALL_ORDER = "viewAllOrder";//查看所有订单资源
	
	public static final String COLLECT_ORDER = "viewAllCollectOrder";//查看所有订单资源
	
	public static final String VIEW_ALL_SHOPCAR = "viewAllShopcar";//查看所有购物车资源
	
	public static final String VIEW_ALL_ORDER_MODEL = "viewAllOrdermodel";//查看所有订单模板 
	
	/**
	 * CMS内容管理地址
	 */
	public static final String CMS_URL = "http://192.168.200.70:86/wcms/";
	
	/**
	 * 状态:删除
	 */
	public static final String DELETED = "-1";
	
	/**
	 * 审核状态:待审
	 */
	public static final String CHECKING = "0";
	
	/**
	 * 审核状态:审核成功
	 */
	public static final String CHECKOK = "1";
	
	/**
	 * 审核状态:审核失败
	 */
	public static final String CHECKNO = "2";
	
	/**
	 * 所有数据状态配置
	 */
	public static final Map<String, String> CheckStatusMap=new HashMap<String, String>();
	
	static{
		CheckStatusMap.put(DELETED, "删除");
		CheckStatusMap.put(CHECKING, "等待审核");
		CheckStatusMap.put(CHECKOK, "审核成功");
		CheckStatusMap.put(CHECKNO, "审核失败");
	}
	
	/**
	 * 所有求助类型配置
	 */
	public static final Map<String, String> HelpTypeMap=new HashMap<String, String>();
	static{
		HelpTypeMap.put("1", "埋压");
		HelpTypeMap.put("2", "重伤");
	}
	
	/**
	 * 所有事件类型配置
	 */
	public static final Map<String, String> EventTypeMap=new HashMap<String, String>();
	static{
		EventTypeMap.put("1", "滑坡");
		EventTypeMap.put("2", "泥石流");
	}
	
	/**
	 * 所有预警级别配置
	 */
	public static final Map<String, String> AlertLevelMap=new HashMap<String, String>();
	static{
		AlertLevelMap.put("1", "红色");
		AlertLevelMap.put("2", "橙色");
		AlertLevelMap.put("3", "黄色");
		AlertLevelMap.put("4", "蓝色");
	}
	
	/**
	 * 所有危害程度配置
	 */
	public static final Map<String, String> HarmLevelMap=new HashMap<String, String>();
	static{
		HarmLevelMap.put("1", "低度");
		HarmLevelMap.put("2", "中度");
		HarmLevelMap.put("3", "高度");
	}
	
	/**
	 * 所有紧急程度配置
	 */
	public static final Map<String, String> UrgencyLevelMap=new HashMap<String, String>();
	static{
		UrgencyLevelMap.put("1", "非紧急");
		UrgencyLevelMap.put("2", "紧急");
	}
	
	/**
	 * 所有公众感受上报  感受信息配置
	 */
	public static final Map<String, String> FeelingMap=new HashMap<String, String>();
	static{
		FeelingMap.put("1", "无所谓，没有感到恐惧");
		FeelingMap.put("2", "有些慌，但能承受");
		FeelingMap.put("3", "比较恐惧，跑出了房间");
		FeelingMap.put("4", "很恐惧， 整天都感觉心神不宁");
	}
	
	/**
	 * 所有公众感受上报 应该学习信息配置
	 */
	public static final Map<String, String> LearnMap=new HashMap<String, String>();
	static{
		LearnMap.put("1", "面对地震发生时的临危不乱 ");
		LearnMap.put("2", " 对于地震的预防措施和知识的普及");
		FeelingMap.put("3", "比较恐惧，跑出了房间");
		FeelingMap.put("4", "建筑物的抗震能力");
		FeelingMap.put("5", "震后各界的井然有序");
		FeelingMap.put("6", "其他");
	}
}
