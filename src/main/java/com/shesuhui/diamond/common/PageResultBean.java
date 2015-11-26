package com.shesuhui.diamond.common;

import java.io.Serializable;
import java.util.List;

public class PageResultBean<T, O>
  implements Serializable
{
  private static final long serialVersionUID = 1L;
  private PageQueryBean<O> pageBean;
  private List<T> dataList;

  public PageQueryBean<O> getPageBean()
  {
    return this.pageBean;
  }

  public void setPageBean(PageQueryBean<O> pageBean) {
    this.pageBean = pageBean;
  }

  public List<T> getDataList() {
    return this.dataList;
  }

  public void setDataList(List<T> dataList) {
    this.dataList = dataList;
  }
}