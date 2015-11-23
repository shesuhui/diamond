package com.shesuhui.diamond.enums;

public enum BeanStatusEnum {
	NORMAL(0, "正常"), DISABLED(1, "禁用"), DELETED(2, "已删除");

	  private String name;
	  private int value;

	  private BeanStatusEnum(int value, String name) { setValue(value);
	    setName(name); }

	  public String getName()
	  {
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

	  public static BeanStatusEnum valueOf(int value)
	  {
	    for (BeanStatusEnum type : values()) {
	      if (value == type.getValue()) {
	        return type;
	      }
	    }
	    return null;
	  }
}
