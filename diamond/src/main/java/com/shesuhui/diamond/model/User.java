package com.shesuhui.diamond.model;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shesuhui.diamond.util.Constants;
import com.shesuhui.diamond.vo.UserVo;

public class User implements Serializable {

    private static final long serialVersionUID = -5422522094276010183L;

    private boolean isInitialized;
    private UserVo userVo;

    /**
     * 内部会自动生�?id
     */
    public User() {

    }

    /**
     * 如果 UserVo id 不为空则使用 UserVo �?id, 否则使用User内部生成�?id
     */
    public User(UserVo userVo) {
        this();
        this.userVo = userVo;
    }

    private void init() {
        if (!isInitialized) {
            if(null == userVo) {
                // 这里不能调用 getXxx, 会产生循环调�?
                if (StringUtils.isBlank(this.id)) {
                    setId(UUID.randomUUID().toString());
                }
            } else {
                setUserVo(userVo);
            }
            // 表示初始化完�?
            userVo = null;
            isInitialized = true;
        }
    }

    /**
     * 如果 UserVo id 不为空则使用 UserVo �?id, 否则使用User内部生成�?id
     */
    public void setUserVo(UserVo userVo) {
        BeanUtils.copyProperties(userVo, this);
        // 这里不能调用 getXxx, 会产生循环调�?
        if (StringUtils.isBlank(this.id)) {
            setId(UUID.randomUUID().toString());
        }

        if (Constants.SEX_NAME_MAN.equals(userVo.getSexName())) {
            setSex(Constants.SEX_MAN);
        } else if (Constants.SEX_NAME_WOMEN.equals(userVo.getSexName())) {
            setSex(Constants.SEX_WOMEN);
        }

  
    }

    // ID
    private String id;

    //用户名
    private String loginName;

    //昵称
    private String userName;

    // 密码
    private String password;

    // 手机
    private String mobile;

    // 邮箱
    private String email;

    // 姓别：[1：男�?：女] @See FDCConstants
    private int sex;

    // 年龄
    private int age;

   
    private List<Role> roles;

    @JsonIgnore
    public String getPassword() {
        init();
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public int getSex() {
        init();
        return sex;
    }

    public void setSex(int sex) {
        this.sex = sex;
    }

    public int getAge() {
        init();
        return age;
    }

    public void setAge(int age) {
        this.age = age;
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

    public List<Role> getRoles() {
        init();
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

   
    public String getId() {
        init();
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
