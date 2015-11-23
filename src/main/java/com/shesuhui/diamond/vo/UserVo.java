package com.shesuhui.diamond.vo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;

import com.shesuhui.diamond.model.Role;
import com.shesuhui.diamond.model.User;

/**
 * User �?UserVo 的转换请调用 UserVo.setUser(User user)
 * 
 * @author yepeng
 * 
 */
public class UserVo implements Serializable {
    /**
     * roleNams, 的连接符
     */
    public static final String SEPALATOR = ",";

    private static final long serialVersionUID = -3152134026336394181L;

    private boolean isInitialized = false;

    private User user;

    public UserVo() {
    }

    public UserVo(User user) {
        this.user = user;
    }

    private void init() {
       
    }

    // ID
    private String id;
    // 登录
    private String loginName;
    // 用户
    private String userName;
    // 手机
    private String mobile;
    // 邮箱
    private String email;

    private String sexName;
    // 年龄
    private int age;
    // 角色
    private List<RoleVo> roleNames;

    public String getId() {
        init();
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLoginName() {
        init();
        return loginName;
    }

    public void setLoginName(String loginName) {
        this.loginName = loginName;
    }

    public String getUserName() {
        init();
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getMobile() {
        init();
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getEmail() {
        init();
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getAge() {
        init();
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public List<RoleVo> getRoleNames() {
        init();
        return roleNames;
    }

    public void setRoleNames(List<RoleVo> roleNames) {
        this.roleNames = roleNames;
    }

    public String getSexName() {
        init();
        return sexName;
    }

    public void setSexName(String sexName) {
        this.sexName = sexName;
    }

   

}
