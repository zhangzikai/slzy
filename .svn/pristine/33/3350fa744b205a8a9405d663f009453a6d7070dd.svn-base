package com.sx.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * ThemeMap entity. @author MyEclipse Persistence Tools
 */

@Entity
@Table(name = "thememap")
public class ThemeMap implements java.io.Serializable {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 1L;

	// Fields
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", unique = true, nullable = false, precision = 64, scale = 0)
	private Integer id;
	//名称
	@Column(name = "themename")
	private String themeName;
	//地址
	@Column(name = "url")
	private String url;
	//图层
	@Column(name = "layers")
	private String layers;
	//地址
	@Column(name = "wms")
	private String wms;
	//图例地址
	@Column(name = "legend")
	private String legend;
	//分类(1=资源概况专题,2=业务专题)
	@Column(name = "type")
	private Integer type;
	//皮肤样式
	@Column(name = "theme")
	private String theme;
	// Constructors

	/** default constructor */
	public ThemeMap() {
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getThemeName() {
		return themeName;
	}

	public void setThemeName(String themeName) {
		this.themeName = themeName;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getLegend() {
		return legend;
	}

	public void setLegend(String legend) {
		this.legend = legend;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public String getLayers() {
		return layers;
	}

	public void setLayers(String layers) {
		this.layers = layers;
	}

	public String getWms() {
		return wms;
	}

	public void setWms(String wms) {
		this.wms = wms;
	}
	
	public String getTheme() {
		return theme;
	}

	public void setTheme(String theme) {
		this.theme = theme;
	}
}