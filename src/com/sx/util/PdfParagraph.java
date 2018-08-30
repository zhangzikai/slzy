package com.sx.util;
//����pdf��������,�����¸�����   
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import com.lowagie.text.BadElementException;
import com.lowagie.text.Cell;
import com.lowagie.text.Chunk;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Font;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.BaseFont;

public class PdfParagraph extends Paragraph {   

 private static final long serialVersionUID = -244970043180837974L;   
// private static Properties pro ;   
// private static InputStream is ;   
// static{   
//      try {   
//         is =  PdfParagraph.class.getClassLoader().getResourceAsStream("fontSrc.properties");   
//          pro = new Properties();   
//          pro.load(is);   
//      } catch (FileNotFoundException e) {   
//          // TODO Auto-generated catch block   
//          e.printStackTrace();   
//      } catch (IOException e) {   
//          // TODO Auto-generated catch block   
//          e.printStackTrace();   
//      }finally{   
//    	  if(is!=null){
//            try {   
//        		  is.close();    
//		          } catch (IOException e) {   
//		              e.printStackTrace();   
//		          }  
//    	  }
//      }   
//  }    
// public static String getPlan(String source){   
//        
//     return pro.getProperty(source);   
// }   
    
 public PdfParagraph(String content) {   

    super(content, getChineseFont(12, false));   
 }   

 public PdfParagraph(String content, int fontSize, boolean isBold) {   

    super(content, getChineseFont(fontSize, isBold));   
 }   

 // ��������-������������   
 protected static Font getChineseFont(int nfontsize, boolean isBold) {   

    BaseFont bfChinese;   
    Font fontChinese = null;   

    try {   
           
   //    bfChinese = BaseFont.createFont(getPlan("fontSrc") + ":\\windows\\fonts\\simsun.ttc,1",BaseFont.IDENTITY_H, BaseFont.EMBEDDED);   
       bfChinese = BaseFont.createFont("STSong-Light", "UniGB-UCS2-H",BaseFont.NOT_EMBEDDED);  
       if (isBold) {   

          fontChinese = new Font(bfChinese, nfontsize, Font.BOLD);   
       } else {   

          fontChinese = new Font(bfChinese, nfontsize, Font.NORMAL);   
       }   

    } catch (DocumentException e) {   

       // TODO Auto-generated catch block   
       e.printStackTrace();   
    } catch (IOException e) {   

       // TODO Auto-generated catch block   
       e.printStackTrace();   
    }   
    return fontChinese;   
 }   

 // ת������   
 protected Cell ChangeCell(String str, int nfontsize, boolean isBold) throws IOException, BadElementException, DocumentException {   

    Phrase ph = ChangeChinese(str, nfontsize, isBold);   
    Cell cell = new Cell(ph);   
    // cell.setBorderWidth(3);   
    return cell;   
 }   

 // ת������   
 protected Chunk ChangeChunk(String str, int nfontsize, boolean isBold) throws IOException, BadElementException, DocumentException {   

    Font FontChinese = getChineseFont(nfontsize, isBold);   
    Chunk chunk = new Chunk(str, FontChinese);   
    return chunk;   
 }   

 // ת������   
 protected Phrase ChangeChinese(String str, int nfontsize, boolean isBold) throws IOException, BadElementException, DocumentException {   

    Font FontChinese = getChineseFont(nfontsize, isBold);   
    Phrase ph = new Phrase(str, FontChinese);   
    return ph;   
 }   
    
 }   

