package com.shesuhui.diamond.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shesuhui.diamond.enums.BeanStatusEnum;

public abstract class AbstractBaseEntity
  implements IdGenertor
{
  private static final long serialVersionUID = 1L;
  private Integer id;
  private String createTime;
  private Integer creatorId;
  private String modifyTime;
  private Integer modifierId;
  private BeanStatusEnum status;

  public Integer getId()
  {
    return this.id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getCreateTime() {
    return this.createTime;
  }

  public void setCreateTime(String createTime) {
    this.createTime = createTime;
  }

  public Integer getCreatorId() {
    return this.creatorId;
  }

  public void setCreatorId(Integer creatorId) {
    this.creatorId = creatorId;
  }

  public String getModifyTime() {
    return this.modifyTime;
  }

  public void setModifyTime(String modifyTime) {
    this.modifyTime = modifyTime;
  }

  public Integer getModifierId() {
    return this.modifierId;
  }

  public void setModifierId(Integer modifierId) {
    this.modifierId = modifierId;
  }

  @JsonIgnore
  public BeanStatusEnum getStatusEnum() {
    return this.status;
  }

  public String getStatusName() {
    return this.status == null ? "" : this.status.getName();
  }

  public int getStatus() {
    return this.status == null ? -1 : this.status.getValue();
  }

  public void setStatus(int status) {
    this.status = BeanStatusEnum.valueOf(status);
  }
}