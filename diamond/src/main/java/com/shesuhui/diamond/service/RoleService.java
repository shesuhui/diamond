package com.shesuhui.diamond.service;

import java.util.List;

import com.shesuhui.diamond.model.Role;

public interface RoleService {

	public Role addRole(Role role);

	public Role updateRole(Role role);

	public void deleteRole(String roleId);

	/**
	 * 
	 * @param userId
	 * @param roleName
	 */
	public void addUserToRole(String userId, String roleName);

	/**
	 * 
	 * @param userId
	 * @param roleName
	 */
	public void removeUserFromRole(String userId, String roleName);

	public void removeAllUserRoleAssociation(String userId);

	public List<Role> getRoles();
}
