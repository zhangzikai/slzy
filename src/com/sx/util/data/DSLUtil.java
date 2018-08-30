package com.sx.util.data;

import java.util.Map;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import net.sourceforge.jeval.Evaluator;

public class DSLUtil {

	  private static DSLUtil singleInstance =  new DSLUtil();   
	  private static Evaluator evaluator =  new Evaluator();  
	    //Marking default constructor private   
	    //to avoid direct instantiation.   
	    private DSLUtil() {   
	    }   
	   
	    public static DSLUtil getDefaultInstance() {   
	        return singleInstance;   
	    }  
	    
	    //Get instance for class SimpleSingleton   
	    public static DSLUtil getInstance() {   
	        return singleInstance;   
	    }   
	    
		public Object compute(String filterString, Map<String, Object> row) {
			//Boolean object=false;
			filterString = filterString.toLowerCase();
			Object object = -1;
			filterString = filterString.replaceAll("and", "&&");
			filterString = filterString.replaceAll("or", "||");
			filterString = filterString.replaceAll("=", "==");
			for (Map.Entry<String, Object> entry : row.entrySet()) {
				if(entry.getValue()!=null){
					filterString = filterString.replaceAll(entry.getKey().toString(), "'"+entry.getValue().toString()+"'");
				}else{
					filterString = filterString.replaceAll(entry.getKey().toString(), "''");
				}
			}  
			System.out.println(filterString);
			try {
				object = evaluator.evaluate(filterString);
			} catch (Exception e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
	        return object;
	    }
		
		public Object compute(String filterString, DataTable dataTable) {
			Boolean object=true;
			
			String expression = "...";
			ScriptEngineManager mgr = new ScriptEngineManager();
			ScriptEngine engine = mgr.getEngineByName("JavaScript");
			// 如果正确的表达式，返回的是个Number类型（比如Double)的对象，否则，可能返回null，或者抛出Exception
			try {
				engine.eval(expression);
				object=false;
			} catch (ScriptException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	        return object;
	    }
}
