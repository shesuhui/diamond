package com.shesuhui.diamond.enums;

public enum UserTypeEnum {
	ADMIN("管理员", 1), CUSTOMER_SERVICE("客服", 2),

	BUYER("买家", 5);

	private String name;
	private int value;

	private UserTypeEnum(String name, int value) {
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

	public static UserTypeEnum valueOf(int value) {
		for (UserTypeEnum type : values()) {
			if (value == type.getValue()) {
				return type;
			}
		}
		return null;
	}
}
