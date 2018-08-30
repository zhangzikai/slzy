function GaussPrj(){};

GaussPrj.a = 6378245; // 椭球体长半轴
GaussPrj.b = 6356863.0188; // 椭球体短半周
GaussPrj.f = (GaussPrj.a - GaussPrj.b) / GaussPrj.a; // 扁率
GaussPrj.e = Math.sqrt(1 - (GaussPrj.b / GaussPrj.a) * (GaussPrj.b / GaussPrj.a)); // 第一偏心率
GaussPrj.eq = Math.sqrt((GaussPrj.a / GaussPrj.b) * (GaussPrj.a / GaussPrj.b) - 1); // 第二偏心率

GaussPrj.PI = 3.14159265358979;

//根据经度求其所属带号
GaussPrj.getDaihao = function(lon,type) {		
	if(type==0) {//3度带
		return Math.round(Math.ceil((lon - 1.5)/3.0));
	} else { //6度带
		return Math.round(Math.ceil(lon/6.0));
	}
}
//根据带号求中央经线(单位：度)
GaussPrj.getCentralMeri = function(daihao,type) {
	if(type==0) {//3度带
		return daihao * 3;
	} else { //6度带
		return daihao*6 - 3;
	}
}

// 给出经纬度坐标，转换为高克投影坐标
GaussPrj.latlonToGauss = function(lat, lon,type) {
	
	var a = GaussPrj.a;
	var b = GaussPrj.b;
	var f = GaussPrj.f;
	var e = GaussPrj.e;
	var eq = GaussPrj.eq;
	var PI = GaussPrj.PI;
	
  var dh = GaussPrj.getDaihao(lon,type);; // 带号
  var L0 = 0; // 中央经度
  var k0 = 1; // 比例因子
	
	if(type==0) {
		L0 = (3 * dh) * PI / 180;
	} else {
		L0 = (6 * dh - 3) * PI / 180;
	}	
	
	var FE = 500000 + dh * 1000000;
	var FN = 0;
	var  BY;
	var  LX;
	var  TC;
	var  CC;
	var  AC;
	var  MC;
	var  NC;

	var  rx;
	var  ry;
	// Dim resultP As PointD
	BY = lat * PI / 180;
	LX = lon * PI / 180;
	TC = Math.tan(BY) * Math.tan(BY);
	CC = eq * eq * Math.cos(BY) * Math.cos(BY);
	AC = (LX - L0) * Math.cos(BY);
	MC = a
			* ((1 - e * e / 4 - 3 * e * e * e * e / 64 - 5 * e * e * e * e
					* e * e / 256)
					* BY
					- (3 * e * e / 8 + 3 * e * e * e * e / 32 + 45 * e * e
							* e * e * e * e / 1024)
					* Math.sin(2 * BY)
					+ (15 * e * e * e * e / 256 + 45 * e * e * e * e * e
							* e / 1024) * Math.sin(4 * BY) - (35 * e * e
					* e * e * e * e / 3072)
					* Math.sin(6 * BY));
	NC = a / Math.sqrt(1 - e * e * (Math.sin(BY)) * (Math.sin(BY)));
	rx = k0
			* (MC
					+ NC
					* Math.tan(BY)
					* (AC * AC / 2 + (5 - TC + 9 * CC + 4 * CC * CC) * AC
							* AC * AC * AC / 24) + (61 - 58 * TC + 0 * 0
					+ 270 * CC - 330 * TC * CC)
					* AC * AC * AC * AC * AC * AC / 720);
	ry = FE
			+ k0
			* NC
			* (AC + (1 - TC + CC) * AC * AC * AC * AC / 6 + (5 - 18 * TC
					+ TC * TC + 14 * CC - 58 * TC * CC)
					* AC * AC * AC * AC * AC / 120);
	
	return new XPoint(rx,ry);
}

GaussPrj.gaussToLatLonGauss = function(x,y, type) 
{
	var ProjNo; var ZoneWide; ////带宽 
	var longitude1,latitude1, longitude0,latitude0, X0,Y0, xval,yval;
	var e1,e2,f,a, ee, NN, T,C, M, D,R,u,fai, iPI;
	iPI = 0.0174532925199433; ////3.1415926535898/180.0; 
	a = 6378245.0; f = 1.0/298.3; //54年北京坐标系参数 
	////a=6378140.0; f=1/298.257; //80年西安坐标系参数 
	if(type==0) {
		ZoneWide = 3; ////3度带宽			
	} else {
		ZoneWide = 6; ////6度带宽
	}
	 
	ProjNo = Math.floor(y/1000000) ; //查找带号
	longitude0 = (ProjNo-1) * ZoneWide + ZoneWide / 2;
		
	longitude0 = longitude0 * iPI ; //中央经线		
	X0 = ProjNo*1000000+500000; 
	Y0 = 0; 
	xval = y-X0; yval = x-Y0; //带内大地坐标
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
	if(type==0) {
		return [longitude1 / iPI + 1.5,latitude1 / iPI];
	} else {
		return [longitude1 / iPI,latitude1 / iPI];
	}
}