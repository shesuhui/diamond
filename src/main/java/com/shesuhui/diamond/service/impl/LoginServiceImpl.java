package com.shesuhui.diamond.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.shesuhui.diamond.dao.PermitMapper;
import com.shesuhui.diamond.dao.RoleMapper;
import com.shesuhui.diamond.dao.UserMapper;
import com.shesuhui.diamond.model.Permit;
import com.shesuhui.diamond.model.Role;
import com.shesuhui.diamond.model.User;
import com.shesuhui.diamond.service.LoginService;
import com.shesuhui.diamond.util.MD5Util;


@Service
public class LoginServiceImpl implements LoginService {

    @Resource
    private UserMapper userMapper;

    @Resource
    private RoleMapper roleMapper;

    @Resource
    private PermitMapper permitMapper;

    @Override
    public List<Role> getRolesByUserName(String userName) {
        return this.roleMapper.getRolesByUserName(userName);
    }

    @Override
    public String getPermissionByRid(String rid) {
        StringBuilder sb = new StringBuilder();
        List<Permit> permits = this.permitMapper.getPermitByRid(rid);
        for (Permit p : permits) {
            sb.append(p.getPermitName()).append(",");
        }
        String peritName = sb.toString();
        peritName = peritName.substring(0, peritName.lastIndexOf(","));
        return peritName;
    }

    @Override
    public User getUserByLoginName(String loginName) {
        return this.userMapper.getUserByLoginName(loginName);
    }

    @Override
    public User getUser(String loginName, String password) {
        return this.userMapper.getUserByPassword(loginName, MD5Util.MD5(password));
    }
}
