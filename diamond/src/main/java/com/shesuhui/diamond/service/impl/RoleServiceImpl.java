package com.shesuhui.diamond.service.impl;

import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.shesuhui.diamond.dao.RoleMapper;
import com.shesuhui.diamond.model.Role;
import com.shesuhui.diamond.model.UserRole;
import com.shesuhui.diamond.service.RoleService;
import com.shesuhui.diamond.service.UserService;


@Service(value = "roleService")
@Transactional
public class RoleServiceImpl implements RoleService {

    @Resource
    private RoleMapper roleMapper;
    
    @Resource(name = "userService")
    private UserService userService;
    
    @Override
    public Role addRole(Role role) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Role updateRole(Role role) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public void deleteRole(String roleId) {
        // TODO Auto-generated method stub
    }

    @Override
    public void addUserToRole(String userId, String roleName) {
        Role role = roleMapper.getRoleByName(roleName);
        
        UserRole userRole = new UserRole();
        userRole.setId(UUID.randomUUID().toString());
        userRole.setRoleId(role.getId());
        userRole.setUserId(userId);;
        roleMapper.addUserToRole(userRole);
    }

    @Override
    public void removeUserFromRole(String userId, String roleName) {
        // TODO Auto-generated method stub
    }

    @Override
    public void removeAllUserRoleAssociation(String userId) {
        roleMapper.removeAllUserRoleAssociation(userId);
    }

    @Override
    public List<Role> getRoles() {
        return roleMapper.getRoles();
    }


}
