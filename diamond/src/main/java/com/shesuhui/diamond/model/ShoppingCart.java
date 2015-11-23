package com.shesuhui.diamond.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public class ShoppingCart implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3130284274344775049L;
	/**
	 * 
	 */
	private String  id;
	
	private User user;
	
	private BigDecimal amount;
	
	private Date createTime ;
	
	private int status;
	
	private List<ShoppingCartItem> items;
  
}
