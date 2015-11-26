package com.shesuhui.diamond.common;


import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shesuhui.diamond.util.StringUtil;

public class PageQueryBean<T>
  implements Serializable
{
  private static final long serialVersionUID = 6760865607420418908L;
  public static final int DEFAULT_PAGE_SIZE = 20;
  private T queryParam;
  int pageSize = 20;

  int currentPage = 1;
  int totalCount;

  public void setPageSize(int pageSize)
  {
    this.pageSize = pageSize;
  }

  public PageQueryBean() {
    this.pageSize = 20;
    this.currentPage = 1;
  }

  public PageQueryBean(String pageSize, String currentPage) {
    if (StringUtil.isEmptyTrim(pageSize))
      this.pageSize = 20;
    else {
      this.pageSize = Integer.parseInt(pageSize);
    }

    if (this.pageSize <= 0) {
      this.pageSize = 20;
    }

    if (StringUtil.isNotEmptyTrim(currentPage)) {
      this.currentPage = Integer.parseInt(currentPage);
    }

    if (this.currentPage <= 0)
      this.currentPage = 1;
  }

  public PageQueryBean(int pageSize, int currentPage)
  {
    if ((pageSize <= 0) || (currentPage <= 0)) {
      throw new IllegalArgumentException(
        "the pageSize or currentPage can't less than 0!");
    }
    this.pageSize = pageSize;
    this.currentPage = currentPage;
  }

  public int getStartIndex()
  {
    if (this.currentPage > getPageTotal())
    {
      return 0;
    }
    return (this.currentPage - 1) * this.pageSize;
  }

  public int getPageTotal() {
    int size = this.totalCount / this.pageSize;
    int mod = this.totalCount % this.pageSize;
    if (mod != 0)
      size++;
    return this.totalCount == 0 ? 1 : size;
  }

  public int getEndIndex() {
    return this.currentPage * this.pageSize - 1;
  }

  public int getPageSize() {
    return this.pageSize;
  }

  public int getCurrentPage() {
    return this.currentPage;
  }

  public int getTotalCount() {
    return this.totalCount;
  }

  public void setTotalCount(int totalCount) {
    this.totalCount = totalCount;
  }
  @JsonIgnore
  public T getQueryParam() {
    return this.queryParam;
  }

  public void setQueryParam(T queryParam) {
    this.queryParam = queryParam;
  }
}