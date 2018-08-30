package com.sx.util;

import java.util.List;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.orm.hibernate3.HibernateTemplate;

public class PublicHibTempFactory {

	public static HibernateTemplate getTemplate(){
		ApplicationContext application=new ClassPathXmlApplicationContext("applicationContext.xml");
		return (HibernateTemplate)application.getBean("hibernateTemplate");
	}
	
	private static final String SELECT = " from Users";

	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		HibernateTemplate temp=	PublicHibTempFactory.getTemplate();
		System.out.println(temp);
		System.out.println(temp.getSessionFactory());
		List list=temp.find(SELECT);
		System.out.println(list.size());
	}

}
