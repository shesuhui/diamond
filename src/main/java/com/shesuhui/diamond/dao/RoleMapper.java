package com.shesuhui.diamond.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.shesuhui.diamond.model.Role;
import com.shesuhui.diamond.model.UserRole;

@Repository
public interface RoleMapper {

    public int addRole(Role role);

    public Role getRoleByName(String roleName);

    public List<Role> getRolesByUserName(@Param(value = "userName") String userName);

    public List<Role> getRolesByUid(@Param(value = "id") String id);

    public int addUserToRole(@Param(value = "userRole") UserRole userRole);

    public List<Role> getRoles();

    public int removeAllUserRoleAssociation(@Param(value = "userId") String userId);

}
