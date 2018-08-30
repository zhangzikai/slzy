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
 * FlyRoute entity. @author miaoshuangfei
 */

@Entity
@Table(name = "flyroute")
public class FlyRoute implements java.io.Serializable {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 1L;

	// Fields
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", unique = true, nullable = false)
	private Integer id;
	//名称
	@Column(name = "name")
	private String name;
	//飞行线路点
	@Column(name = "points")
	private String points;
	//高度
	@Column(name = "elevation")
	private double elevation;
	
	@Column(name="length")
	private Double length;
	public Double getLength() {
		return length;
	}

	public void setLength(Double length) {
		this.length = length;
	}

	//飞行速度
	@Column(name = "speed")
	private double speed;
	//视角
	@Column(name = "pitch")
	private double pitch;
	//创建用户
	@ManyToOne
	@JoinColumn(name="createuser")
	private SysUser createUser;
	//操作时间
	@Column(name = "createtime")
	private String createTime;
	// Constructors

	/** default constructor */
	public FlyRoute() {
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

	public String getPoints() {
		return points;
	}

	public void setPoints(String points) {
		this.points = points;
	}

	public double getElevation() {
		return elevation;
	}

	public void setElevation(double elevation) {
		this.elevation = elevation;
	}

	public double getSpeed() {
		return speed;
	}

	public void setSpeed(double speed) {
		this.speed = speed;
	}

	public double getPitch() {
		return pitch;
	}

	public void setPitch(double pitch) {
		this.pitch = pitch;
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