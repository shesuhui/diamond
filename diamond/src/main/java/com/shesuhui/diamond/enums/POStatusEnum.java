/**
 * 
 */
package com.shesuhui.diamond.enums;

/**
 * @author ssh
 *
 */
public enum POStatusEnum {
	
	SUBMIT(0, "提交"), SEND(1, "发货"), DELETED(2, "已删除");

	  private String name;
	  private int value;

	  private POStatusEnum(int value, String name) { setValue(value);
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

	  public static POStatusEnum valueOf(int value)
	  {
	    for (POStatusEnum type : values()) {
	      if (value == type.getValue()) {
	        return type;
	      }
	    }
	    return null;
	  }
	
	

}
