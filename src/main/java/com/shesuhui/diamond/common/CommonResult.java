package com.shesuhui.diamond.common;

import java.io.Serializable;

public class CommonResult implements Serializable {
	private static final long serialVersionUID = 1L;
	private int code;
	private String msg;
	private Object result;

	public CommonResult() {
	}

	public CommonResult(int code, String msg) {
		setCode(code);
		setMsg(msg);
	}

	public void setQueryError(String msg) {
		setCode(-1);
		setMsg(msg == null ? "查询出错" : msg);
	}

	public int getCode() {
		return this.code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public String getMsg() {
		return this.msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public Object getResult() {
		return this.result;
	}

	public void setResult(Object result) {
		this.result = result;
	}
}
