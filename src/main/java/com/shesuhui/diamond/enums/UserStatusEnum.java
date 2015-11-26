package com.shesuhui.diamond.enums;

public enum UserStatusEnum {
	NEWER("新注册", 1), NORMAL("正常", 2), CANCELED("注销", 3);

	private String name;
	private int value;

	private UserStatusEnum(String name, int value) {
		setName(name);
		setValue(value);
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getValue() {
		return this.value;
	}

	public void setValue(int value) {
		this.value = value;
	}

	public static UserStatusEnum valueOf(int value) {
		for (UserStatusEnum type : values()) {
			if (value == type.getValue()) {
				return type;
			}
		}
		return null;
	}
}
