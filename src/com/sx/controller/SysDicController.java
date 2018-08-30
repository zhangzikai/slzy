package com.sx.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.sx.entity.SysDic;
import com.sx.service.SysDicService;

import net.sf.json.JSONObject;

@Controller
@RequestMapping("/sysDic")
public class SysDicController{
	@Autowired
	private SysDicService sysDicManager;

	private ObjectMapper objectMapper = null;
	
	@RequestMapping(params = "method=queryList")
	public void queryListThematicPic(HttpServletRequest request, HttpServletResponse response){
		String parentId=request.getParameter("parentId");
		List<SysDic> dataList=sysDicManager.queryList(Integer.parseInt(parentId));
		objectMapper = new ObjectMapper();
        try {
			response.getWriter().write(objectMapper.writeValueAsString(dataList));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@RequestMapping(params = "method=gaussToBL")
    public void GaussToBL(HttpServletRequest request, HttpServletResponse response)//, double *longitude, double *latitude)
    {
		double X=Double.parseDouble(request.getParameter("x"));
		double Y=Double.parseDouble(request.getParameter("y"));
		int Z=Integer.parseInt(request.getParameter("z"));

		objectMapper = new ObjectMapper();
		
        int ProjNo; int ZoneWide; ////带宽
        double[] output = new double[2];
        double longitude1,latitude1, longitude0, X0,Y0, xval,yval;//latitude0,
        double e1,e2,f,a, ee, NN, T,C, M, D,R,u,fai, iPI;
        iPI = 0.0174532925199433; ////3.1415926535898/180.0;
        a = 6378245.0; f = 1.0/298.3; //54年北京坐标系参数
        //a=6378140.0; f=1/298.257; //80年西安坐标系参数
        ZoneWide = 3; ////6度带宽
        if(Z==6){
        	ZoneWide = 6;
        }
        ProjNo = (int)(X/1000000L) ; //查找带号
        longitude0 = (ProjNo-1) * ZoneWide + ZoneWide / 2;
        longitude0 = longitude0 * iPI ; //中央经线
        longitude0 = 120*iPI;


        X0 = ProjNo*1000000L+500000L;
        Y0 = 0;
        xval = X-X0; yval = Y-Y0; //带内大地坐标
        e2 = 2*f-f*f;
        e1 = (1.0-Math.sqrt(1-e2))/(1.0+Math.sqrt(1-e2));
        ee = e2/(1-e2);
        M = yval;
        u = M/(a*(1-e2/4-3*e2*e2/64-5*e2*e2*e2/256));
        fai = u+(3*e1/2-27*e1*e1*e1/32)*Math.sin(2*u)+(21*e1*e1/16-55*e1*e1*e1*e1/32)*Math.sin(
                4*u)
                +(151*e1*e1*e1/96)*Math.sin(6*u)+(1097*e1*e1*e1*e1/512)*Math.sin(8*u);
        C = ee*Math.cos(fai)*Math.cos(fai);
        T = Math.tan(fai)*Math.tan(fai);
        NN = a/Math.sqrt(1.0-e2*Math.sin(fai)*Math.sin(fai));
        R = a*(1-e2)/Math.sqrt((1-e2*Math.sin(fai)*Math.sin(fai))*(1-e2*Math.sin(fai)*Math.sin(fai))*(1-e2*Math.sin
                (fai)*Math.sin(fai)));
        D = xval/NN;
        //计算经度(Longitude) 纬度(Latitude)
        longitude1 = longitude0+(D-(1+2*T+C)*D*D*D/6+(5-2*C+28*T-3*C*C+8*ee+24*T*T)*D
                *D*D*D*D/120)/Math.cos(fai);
        latitude1 = fai -(NN*Math.tan(fai)/R)*(D*D/2-(5+3*T+10*C-4*C*C-9*ee)*D*D*D*D/24
                +(61+90*T+298*C+45*T*T-256*ee-3*C*C)*D*D*D*D*D*D/720);
        //转换为度 DD
        output[0] = longitude1 / iPI;
        output[1] = latitude1 / iPI;
        
        try {
        	JSONObject obj = new JSONObject();
        	obj.put("x", output[0]);
        	obj.put("y", output[1]);
			response.getWriter().write(objectMapper.writeValueAsString(obj));
        }catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }
	
}
