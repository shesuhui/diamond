package com.shesuhui.diamond.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.shesuhui.diamond.model.ShoppingCartItem;

@Repository
public interface ShoppingCartItemMapper {
	public void addShoppingCartItem(ShoppingCartItem shoppingCartItem);

	public void updateShoppingCartItem(ShoppingCartItem shoppingCartItem);

	public void deleteShoppingCartItem(String id);

	public ShoppingCartItem getShoppingCartItem(String id);

	public List<ShoppingCartItem> getShoppingCartItems(String cartId);
}
