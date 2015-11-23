package com.shesuhui.diamond.model;

import java.math.BigDecimal;

import com.shesuhui.diamond.enums.ShapeEnum;

public class Diamond extends AbstractBaseEntity {
	
	 private static final long serialVersionUID = 1L;
	  private String name;
	  private String image;
	  private String locality;
	  private ShapeEnum shape;
	  private String color;
	  private String clarity;
	  private String cut;
	  private String polish;
	  private String symm;
	  private String fluor;
	  private String authenticator;
	  private String intensity;
	  private Float weight;
	  private Float discount;
	  private BigDecimal price;
	  private int amount;
	  private String cert;
	  private String remark;
	  private String size;
	  private String taple;
	  private String depth;
	  private int multicolour;
	  private Supplier supplier;
	  private Integer supplierId;
	  private String supplierAdding;
	  private Float supplierDiscount;
	  private BigDecimal supplierPrice;
	  private BigDecimal saleDollarPrice;
	  private int inCart;

	  public Supplier getSupplier()
	  {
	    return this.supplier;
	  }

	  public BigDecimal getSaleDollarPrice() {
	    return this.saleDollarPrice;
	  }

	  public void setSaleDollarPrice(BigDecimal saleDollarPrice) {
	    this.saleDollarPrice = saleDollarPrice;
	  }

	  public void setSupplier(Supplier supplier) {
	    this.supplier = supplier;
	  }

	  public int getMulticolour() {
	    return this.multicolour;
	  }

	  public void setMulticolour(int multicolour) {
	    this.multicolour = multicolour;
	  }

	  public Integer getSupplierId()
	  {
	    return this.supplierId;
	  }

	  public void setSupplierId(Integer supplierId) {
	    this.supplierId = supplierId;
	  }

	  public String getSize() {
	    return this.size;
	  }

	  public void setSize(String size) {
	    this.size = size;
	  }

	  public String getTaple() {
	    return this.taple;
	  }

	  public void setTaple(String taple) {
	    this.taple = taple;
	  }

	  public String getDepth() {
	    return this.depth;
	  }

	  public void setDepth(String depth) {
	    this.depth = depth;
	  }

	  public String getSupplierAdding() {
	    return this.supplierAdding;
	  }

	  public void setSupplierAdding(String supplierAdding) {
	    this.supplierAdding = supplierAdding;
	  }

	  public Float getSupplierDiscount() {
	    return this.supplierDiscount;
	  }

	  public void setSupplierDiscount(Float supplierDiscount) {
	    this.supplierDiscount = supplierDiscount;
	  }

	  public BigDecimal getSupplierPrice() {
	    return this.supplierPrice;
	  }

	  public void setSupplierPrice(BigDecimal supplierPrice) {
	    this.supplierPrice = supplierPrice;
	  }

	  public int getInCart()
	  {
	    return this.inCart;
	  }

	  public void setInCart(int inCart) {
	    this.inCart = inCart;
	  }

	  public String getName() {
	    return this.name;
	  }

	  public void setName(String name) {
	    this.name = name;
	  }

	  public String getImage() {
	    return this.image;
	  }

	  public void setImage(String image) {
	    this.image = image;
	  }

	  public Float getWeight() {
	    return this.weight;
	  }

	  public void setWeight(Float weight) {
	    this.weight = weight;
	  }

	  public String getLocality() {
	    return this.locality;
	  }

	  public void setLocality(String locality) {
	    this.locality = locality;
	  }

	  public ShapeEnum getShape() {
	    return this.shape;
	  }

	  public String getShapeCnName() {
	    return this.shape.getCNName();
	  }

	  public void setShape(ShapeEnum shape) {
	    this.shape = shape;
	  }

	  public String getColor() {
	    return this.color;
	  }

	  public void setColor(String color) {
	    this.color = color;
	  }

	  public String getClarity() {
	    return this.clarity;
	  }

	  public void setClarity(String clarity) {
	    this.clarity = clarity;
	  }

	  public String getCut() {
	    return this.cut;
	  }

	  public void setCut(String cut) {
	    this.cut = cut;
	  }

	  public String getPolish() {
	    return this.polish;
	  }

	  public void setPolish(String polish) {
	    this.polish = polish;
	  }

	  public String getSymm() {
	    return this.symm;
	  }

	  public void setSymm(String symm) {
	    this.symm = symm;
	  }

	  public String getFluor() {
	    return this.fluor;
	  }

	  public void setFluor(String fluor) {
	    this.fluor = fluor;
	  }

	  public String getAuthenticator() {
	    return this.authenticator;
	  }

	  public void setAuthenticator(String authenticator) {
	    this.authenticator = authenticator;
	  }

	  public String getIntensity() {
	    return this.intensity;
	  }

	  public void setIntensity(String intensity) {
	    this.intensity = intensity;
	  }

	  public Float getDiscount() {
	    return this.discount;
	  }

	  public void setDiscount(Float discount) {
	    this.discount = discount;
	  }

	  public BigDecimal getPrice() {
	    return this.price;
	  }

	  public void setPrice(BigDecimal price) {
	    this.price = price;
	  }

	  public String getCert() {
	    return this.cert;
	  }

	  public void setCert(String cert) {
	    this.cert = cert;
	  }

	  public String getRemark() {
	    return this.remark;
	  }

	  public void setRemark(String remark) {
	    this.remark = remark;
	  }

	  public int getAmount() {
	    return this.amount;
	  }

	  public void setAmount(int amount) {
	    this.amount = amount;
	  }
}
