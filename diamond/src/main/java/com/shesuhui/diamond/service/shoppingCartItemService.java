package com.shesuhui.diamond.service;

import java.util.List;

import com.shesuhui.diamond.exception.DiamondException;
import com.shesuhui.diamond.model.ShoppingCartItem;

public interface shoppingCartItemService {

	public boolean addShoppingCartItem(ShoppingCartItem shoppingCart)
			throws DiamondException;

	public boolean updateShoppingCartItem(ShoppingCartItem shoppingCart)
			throws DiamondException;

	public boolean deleteShoppingCartItem(String id) throws DiamondException;

	public ShoppingCartItem getShoppingCartItem(String id)
			throws DiamondException;

	public List<ShoppingCartItem> getShoppingCartItems(String id);

}
