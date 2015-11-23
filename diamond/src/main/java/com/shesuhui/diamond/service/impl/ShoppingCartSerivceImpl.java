package com.shesuhui.diamond.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.shesuhui.diamond.dao.ShoppingCartMapper;
import com.shesuhui.diamond.exception.DiamondException;
import com.shesuhui.diamond.model.ShoppingCart;
import com.shesuhui.diamond.service.ShoppingCartService;
@Service(value = "shoppingCartItemService")
@Transactional
public class ShoppingCartSerivceImpl implements ShoppingCartService {
	
	@Resource
	private ShoppingCartMapper sciMapper=null;

	@Override
	public boolean addShoppingCart(ShoppingCart shoppingCart)
			throws DiamondException {
		boolean result = false;
		try {
			this.sciMapper.addShoppingCart(shoppingCart);
			result = true;
		} catch (Exception e) {
			throw new DiamondException("添加购物车信息失败！", e);
		}
		return result;
	}

	@Override
	public boolean updateShoppingCart(ShoppingCart shoppingCart)
			throws DiamondException {
		boolean result = false;
		try {
			this.sciMapper.updateShoppingCart(shoppingCart);
			result = true;
		} catch (Exception e) {
			throw new DiamondException("修改购物车信息失败！", e);
		}
		return result;
	}

	@Override
	public boolean deleteShoppingCart(String id) throws DiamondException {
		boolean result = false;
		try {
			this.sciMapper.deleteShoppingCart(id);
			result = true;
		} catch (Exception e) {
			throw new DiamondException("删除购物车信息失败！", e);
		}
		return result;
	}

	@Override
	public ShoppingCart getShoppingCart(String id) throws DiamondException {
		// TODO Auto-generated method stub
		return this.sciMapper.getShoppingCart(id);
	}

}
