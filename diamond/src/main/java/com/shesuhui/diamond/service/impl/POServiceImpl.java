package com.shesuhui.diamond.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.shesuhui.diamond.dao.POMapper;
import com.shesuhui.diamond.enums.POStatusEnum;
import com.shesuhui.diamond.exception.DiamondException;
import com.shesuhui.diamond.model.PurchaseOrder;
import com.shesuhui.diamond.service.POService;

@Service(value = "poService")
@Transactional
public class POServiceImpl implements POService {
	
	
	@Resource
	private POMapper poMapper=null;

	@Override
	public boolean addPurchaseOrder(PurchaseOrder purchaseOrder)
			throws DiamondException {
		boolean result = false;
		try {
			this.poMapper.addPO(purchaseOrder);
			result = true;
		} catch (Exception e) {
			throw new DiamondException("新增订单信息失败！", e);
		}
		return result;
	}

	@Override
	public boolean updatePurchaseOrder(PurchaseOrder purchaseOrder)
			throws DiamondException {
		boolean result = false;
		try {
			this.poMapper.updatePO(purchaseOrder);
			result = true;
		} catch (Exception e) {
			throw new DiamondException("修改订单信息失败！", e);
		}
		return result;
	}

	@Override
	public boolean deletePurchaseOrder(String id) throws DiamondException {
		boolean result = false;
		try {
			this.poMapper.deletePO(id);
			result = true;
		} catch (Exception e) {
			throw new DiamondException("删除订单信息失败！", e);
		}
		return result;
	}

	@Override
	public PurchaseOrder getPurchaseOrder(String id) throws DiamondException {
		return poMapper.getPO(id);
	}

	@Override
	public List<PurchaseOrder> getPurchaseOrders() throws DiamondException {
		return poMapper.getPOs();
	}

	@Override
	public boolean changeStatus(POStatusEnum status) throws DiamondException  {
		boolean result = false;
		try {
			this.poMapper.changeStatus(status);
			result = true;
		} catch (Exception e) {
			throw new DiamondException("变更订单状态失败！", e);
		}
		return result;
	}

}
