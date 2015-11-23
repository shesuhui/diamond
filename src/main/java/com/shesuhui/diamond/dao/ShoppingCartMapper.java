package com.shesuhui.diamond.dao;

import org.springframework.stereotype.Repository;

import com.shesuhui.diamond.model.Diamond;
import com.shesuhui.diamond.model.ShoppingCart;

@Repository
public interface ShoppingCartMapper {
	
	public void addShoppingCart(ShoppingCart shoppingCart);

	public void updateShoppingCart(ShoppingCart shoppingCart);

	public void deleteShoppingCart(String id);

	public ShoppingCart getShoppingCart(String id);


}
