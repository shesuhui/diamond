package com.shesuhui.diamond.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.shesuhui.diamond.dao.ShoppingCartItemMapper;
import com.shesuhui.diamond.exception.DiamondException;
import com.shesuhui.diamond.model.ShoppingCartItem;
import com.shesuhui.diamond.service.shoppingCartItemService;

@Service(value = "shoppingCartService")
@Transactional
public class ShoppingCartItemServiceImpl implements shoppingCartItemService {

	private static Logger logger = LoggerFactory
			.getLogger(ShoppingCartItemServiceImpl.class);

	@Resource
	ShoppingCartItemMapper scMapper = null;

	@Override
	public boolean addShoppingCartItem(ShoppingCartItem shoppingCartItem)
			throws DiamondException {
		boolean result = false;
		try {
			this.scMapper.addShoppingCartItem(shoppingCartItem);
			result = true;
		} catch (Exception e) {
			throw new DiamondException("添加购物车明细信息失败！", e);
		}
		return result;
	}

	@Override
	public boolean updateShoppingCartItem(ShoppingCartItem shoppingCartItem)
			throws DiamondException {
		boolean result = false;
		try {
			this.scMapper.updateShoppingCartItem(shoppingCartItem);
			result = true;
		} catch (Exception e) {
			throw new DiamondException("修改购物车明细信息失败！", e);
		}
		return result;
	}

	@Override
	public boolean deleteShoppingCartItem(String id) throws DiamondException {
		boolean result = false;
		try {
			this.scMapper.deleteShoppingCartItem(id);
			result = true;
		} catch (Exception e) {
			throw new DiamondException("删除购物车明细信息失败！", e);
		}
		return result;
	}

	@Override
	public ShoppingCartItem getShoppingCartItem(String id)
			throws DiamondException {
		return this.scMapper.getShoppingCartItem(id);
	}

	@Override
	public List<ShoppingCartItem> getShoppingCartItems(String id) {
		return this.scMapper.getShoppingCartItems(id);
	}

}
