package com.shesuhui.diamond.service;

import java.util.List;

import com.shesuhui.diamond.enums.POStatusEnum;
import com.shesuhui.diamond.exception.DiamondException;
import com.shesuhui.diamond.model.PurchaseOrder;

public interface POService {

	public boolean addPurchaseOrder(PurchaseOrder purchaseOrder) throws DiamondException;

	public boolean updatePurchaseOrder(PurchaseOrder purchaseOrder) throws DiamondException;

	public boolean deletePurchaseOrder(String id) throws DiamondException;

	public PurchaseOrder getPurchaseOrder(String id) throws DiamondException;

	public List<PurchaseOrder> getPurchaseOrders() throws DiamondException;
	
	/**
	 * 
	 * 切换订单状态
	 * @param status
	 * @return
	 */
	public boolean changeStatus(POStatusEnum status)throws DiamondException;
	
	

}
