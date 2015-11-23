package com.shesuhui.diamond.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.shesuhui.diamond.enums.POStatusEnum;
import com.shesuhui.diamond.model.PurchaseOrder;

@Repository
public interface POMapper {

	public void addPO(PurchaseOrder po);

	public void updatePO(PurchaseOrder po);

	public void deletePO(String id);

	public PurchaseOrder getPO(String id);

	public List<PurchaseOrder> getPOs();

	public void changeStatus(POStatusEnum status);

}
