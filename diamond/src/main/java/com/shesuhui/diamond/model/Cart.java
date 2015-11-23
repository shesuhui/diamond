package com.shesuhui.diamond.model;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

public class Cart implements Serializable {
	private static final long serialVersionUID = -3063152398088974693L;
	private Map<String, Diamond> itemMap = new HashMap();

	public int getAmount() {
		int amount = 0;
		if ((this.itemMap != null) && (!this.itemMap.isEmpty())) {
			for (Diamond diamond : this.itemMap.values()) {
				amount += diamond.getAmount();
			}
		}
		return amount;
	}

	public Map<String, Diamond> getItemMap() {
		return this.itemMap;
	}

	public void setItemMap(Map<String, Diamond> itemMap) {
		this.itemMap = itemMap;
	}

	public int getGoodsCount() {
		return this.itemMap == null ? 0 : this.itemMap.size();
	}

	public boolean isEmpty() {
		return (this.itemMap == null) || (this.itemMap.isEmpty());
	}
}
