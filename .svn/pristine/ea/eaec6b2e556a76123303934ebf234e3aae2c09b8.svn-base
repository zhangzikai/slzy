package com.sx.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * Scene entity. @author miaoshuangfei
 */

@Entity
@Table(name = "scene")
public class Scene implements java.io.Serializable {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 1L;

	// Fields
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", unique = true, nullable = false)
	private Integer id;
	//场景名称
	@Column(name = "name")
	private String name;
	//经度
	@Column(name = "lon")
	private String lon;
	//纬度
	@Column(name = "lat")
	private String lat;
	//高点
	@Column(name = "height")
	private String height;
	//高点
	@Column(name = "pitch")
	private String pitch;
	//头向
	@Column(name = "heading")
	private String heading;
	//变焦
	@Column(name = "zoom")
	private String zoom;
	//创建用户
	@ManyToOne
	@JoinColumn(name="createuser")
	private SysUser createUser;
	//操作时间
	@Column(name = "createtime")
	private String createTime;
	
	// Constructors
	/** default constructor */
	public Scene() {
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLon() {
		return lon;
	}

	public void setLon(String lon) {
		this.lon = lon;
	}

	public String getLat() {
		return lat;
	}

	public void setLat(String lat) {
		this.lat = lat;
	}

	public String getPitch() {
		return pitch;
	}

	public void setPitch(String pitch) {
		this.pitch = pitch;
	}

	public String getHeading() {
		return heading;
	}

	public void setHeading(String heading) {
		this.heading = heading;
	}

	public String getZoom() {
		return zoom;
	}

	public void setZoom(String zoom) {
		this.zoom = zoom;
	}

	public String getHeight() {
		return height;
	}

	public void setHeight(String height) {
		this.height = height;
	}

	public SysUser getCreateUser() {
		return createUser;
	}

	public void setCreateUser(SysUser createUser) {
		this.createUser = createUser;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

}