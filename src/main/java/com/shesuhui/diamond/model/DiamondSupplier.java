package com.shesuhui.diamond.model;

import java.math.BigDecimal;

public class DiamondSupplier
implements IdGenertor
{
private static final long serialVersionUID = 546776669884281904L;
private Integer id;
private Integer diamondId;
private Integer supplierId;
private Supplier supplier;
private BigDecimal price;
private Float discount;

public Integer getId()
{
  return this.id;
}

public void setId(Integer id) {
  this.id = id;
}

public Integer getDiamondId() {
  return this.diamondId;
}

public void setDiamondId(Integer diamondId) {
  this.diamondId = diamondId;
}

public Integer getSupplierId() {
  return this.supplierId;
}

public void setSupplierId(Integer supplierId) {
  this.supplierId = supplierId;
}

public BigDecimal getPrice() {
  return this.price;
}

public void setPrice(BigDecimal price) {
  this.price = price;
}

public Float getDiscount() {
  return this.discount;
}

public void setDiscount(Float discount) {
  this.discount = discount;
}

public Supplier getSupplier() {
  return this.supplier;
}

public void setSupplier(Supplier supplier) {
  this.supplier = supplier;
}
}