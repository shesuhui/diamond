package com.shesuhui.diamond.model;

public class DiamondQueryParam
{
  private String[] shape;
  private int containOtherShape;
  private String[] color;
  private int containOtherColor;
  private int multicolour;
  private String[] clarity;
  private String[] cut;
  private int containNullCut;
  private String[] polish;
  private String[] symm;
  private String[] fluor;
  private String[] authenticator;
  private String name;
  private String minQueryWeight;
  private String maxQueryWeight;
  private String sortByWeight;
  private String sortByAmount = "1";
  private String sortByDiscount = "1";
  private String sortFirst = "amount";

  public int getMulticolour()
  {
    return this.multicolour;
  }

  public void setMulticolour(int multicolour) {
    this.multicolour = multicolour;
  }

  public String getSortFirst()
  {
    return this.sortFirst;
  }

  public void setSortFirst(String sortFirst) {
    this.sortFirst = sortFirst;
  }

  public String getSortByAmount() {
    return this.sortByAmount;
  }

  public void setSortByAmount(String sortByAmount) {
    this.sortByAmount = sortByAmount;
  }

  public String getSortByDiscount() {
    return this.sortByDiscount;
  }

  public void setSortByDiscount(String sortByDiscount) {
    this.sortByDiscount = sortByDiscount;
  }

  public int getContainNullCut() {
    return this.containNullCut;
  }

  public void setContainNullCut(int containNullCut) {
    this.containNullCut = containNullCut;
  }

  public String[] getShape() {
    return this.shape;
  }

  public void setShape(String[] shape) {
    this.shape = shape;
  }

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getMinQueryWeight() {
    return this.minQueryWeight;
  }

  public void setMinQueryWeight(String minQueryWeight) {
    this.minQueryWeight = minQueryWeight;
  }

  public String getMaxQueryWeight() {
    return this.maxQueryWeight;
  }

  public void setMaxQueryWeight(String maxQueryWeight) {
    this.maxQueryWeight = maxQueryWeight;
  }

  public String getSortByWeight() {
    return this.sortByWeight;
  }

  public void setSortByWeight(String sortByWeight) {
    this.sortByWeight = sortByWeight;
  }

  public String[] getColor() {
    return this.color;
  }

  public void setColor(String[] color) {
    this.color = color;
  }

  public String[] getClarity() {
    return this.clarity;
  }

  public void setClarity(String[] clarity) {
    this.clarity = clarity;
  }

  public String[] getCut() {
    return this.cut;
  }

  public void setCut(String[] cut) {
    this.cut = cut;
  }

  public String[] getPolish() {
    return this.polish;
  }

  public void setPolish(String[] polish) {
    this.polish = polish;
  }

  public String[] getSymm() {
    return this.symm;
  }

  public void setSymm(String[] symm) {
    this.symm = symm;
  }

  public String[] getFluor() {
    return this.fluor;
  }

  public void setFluor(String[] fluor) {
    this.fluor = fluor;
  }

  public String[] getAuthenticator() {
    return this.authenticator;
  }

  public void setAuthenticator(String[] authenticator) {
    this.authenticator = authenticator;
  }

  public int getContainOtherShape() {
    return this.containOtherShape;
  }

  public void setContainOtherShape(int containOtherShape) {
    this.containOtherShape = containOtherShape;
  }

  public int getContainOtherColor() {
    return this.containOtherColor;
  }

  public void setContainOtherColor(int containOtherColor) {
    this.containOtherColor = containOtherColor;
  }
}