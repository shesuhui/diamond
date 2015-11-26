package com.shesuhui.diamond.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shesuhui.diamond.enums.UserStatusEnum;
import com.shesuhui.diamond.enums.UserTypeEnum;

public class User extends AbstractBaseEntity
{
  private static final long serialVersionUID = 1L;
  private String name;
  private String loginId;
  private String password;
  private UserTypeEnum userType;
  private UserStatusEnum userStatus;
  private String lastLoginTime;
  private String currentLoginTime;
  private int loginTimes;
  private String mobile;
  private String fax;
  private String address;
  private String businessLicense;
  private String email;
  private String defaultMenuUrl;

  public void setDefaultMenuUrl()
  {
    if ((getUserType() == UserTypeEnum.BUYER.getValue()) && 
      (getUserStatus() == UserStatusEnum.NORMAL.getValue()))
    {
      this.defaultMenuUrl = "/buyer/index.do";
    }
    else if (getUserType() == UserTypeEnum.CUSTOMER_SERVICE.getValue())
    {
      this.defaultMenuUrl = "/order/index.do";
    } else if (getUserType() == UserTypeEnum.ADMIN.getValue())
    {
      this.defaultMenuUrl = "/user/index.do";
    }
  }

  public String getDefaultMenuUrl() {
    return this.defaultMenuUrl;
  }

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getLoginId() {
    return this.loginId;
  }

  public void setLoginId(String loginId) {
    this.loginId = loginId;
  }

  public String getPassword() {
    return this.password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public int getUserType() {
    return this.userType == null ? -1 : this.userType.getValue();
  }

  public String getUserTypeName() {
    return this.userType == null ? null : this.userType.getName();
  }
  @JsonIgnore
  public UserTypeEnum getUserTypeEnum() {
    return this.userType;
  }

  public void setUserType(int userType) {
    this.userType = UserTypeEnum.valueOf(userType);
  }

  public String getLastLoginTime() {
    return this.lastLoginTime;
  }

  public void setLastLoginTime(String lastLoginTime) {
    this.lastLoginTime = lastLoginTime;
  }

  public String getCurrentLoginTime() {
    return this.currentLoginTime;
  }

  public void setCurrentLoginTime(String currentLoginTime) {
    this.currentLoginTime = currentLoginTime;
  }

  public String getMobile() {
    return this.mobile;
  }

  public void setMobile(String mobile) {
    this.mobile = mobile;
  }

  public String getFax() {
    return this.fax;
  }

  public void setFax(String fax) {
    this.fax = fax;
  }

  public String getAddress() {
    return this.address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getBusinessLicense() {
    return this.businessLicense;
  }

  public void setBusinessLicense(String businessLicense) {
    this.businessLicense = businessLicense;
  }

  public int getLoginTimes() {
    return this.loginTimes;
  }

  public void setLoginTimes(int loginTimes) {
    this.loginTimes = loginTimes;
  }

  public String getEmail() {
    return this.email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getUserStatusName() {
    return this.userStatus == null ? null : this.userStatus.getName();
  }
  @JsonIgnore
  public UserStatusEnum getUserStatusEnum() {
    return this.userStatus;
  }

  public void setUserStatus(int userStatus) {
    this.userStatus = UserStatusEnum.valueOf(userStatus);
  }

  public int getUserStatus() {
    return this.userStatus == null ? -1 : this.userStatus.getValue();
  }
}