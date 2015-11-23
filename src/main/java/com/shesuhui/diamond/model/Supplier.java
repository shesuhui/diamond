package com.shesuhui.diamond.model;

import java.io.Serializable;

public class Supplier implements Serializable {

	private static final long serialVersionUID = 4173378281276971245L;
	private String num;
	private String name;
	private String linkman;
	private String fax;
	private String phone;
	private String address;
	private String email;
	private String adding;
	private String skype;
	private String hkPhone;

	public String getHkPhone() {
		return this.hkPhone;
	}

	public void setHkPhone(String hkPhone) {
		this.hkPhone = hkPhone;
	}

	public String getSkype() {
		return this.skype;
	}

	public void setSkype(String skype) {
		this.skype = skype;
	}

	public String getLinkman() {
		return this.linkman;
	}

	public void setLinkman(String linkman) {
		this.linkman = linkman;
	}

	public String getAdding() {
		return this.adding;
	}

	public void setAdding(String adding) {
		this.adding = adding;
	}

	public String getNum() {
		return this.num;
	}

	public void setNum(String num) {
		this.num = num;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getFax() {
		return this.fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	public String getPhone() {
		return this.phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
}
