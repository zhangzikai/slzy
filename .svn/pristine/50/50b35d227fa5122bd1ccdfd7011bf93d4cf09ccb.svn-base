package com.sx.util;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

public class FileUtil {

	/**保存文件  
     * @param stream  
     * @param path  
     * @param filename  
     * @throws IOException  
     */  
	public static void SaveFileFromInputStream(InputStream stream,String path,String filename) throws IOException{         
	    FileOutputStream fs=new FileOutputStream( path + "/"+ filename);   
	    byte[] buffer =new byte[1024*1024];   
	    int byteread = 0;    
	    while ((byteread=stream.read(buffer))!=-1){   
	       fs.write(buffer,0,byteread);   
	       fs.flush();   
	    }    
	    fs.close();   
	    stream.close();         
	}     
}
