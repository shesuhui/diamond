package com.shesuhui.diamond.service;

import com.shesuhui.diamond.exception.DiamondException;
import com.shesuhui.diamond.model.ShoppingCart;

public interface ShoppingCartService {
	
	public boolean addShoppingCart(ShoppingCart shoppingCart) throws DiamondException;

	public boolean updateShoppingCart(ShoppingCart shoppingCart) throws DiamondException;

	public boolean deleteShoppingCart(String id) throws DiamondException;

	public ShoppingCart getShoppingCart(String id) throws DiamondException;

	

}
