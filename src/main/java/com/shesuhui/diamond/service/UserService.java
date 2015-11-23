package com.shesuhui.diamond.service;

import java.io.File;
import java.util.List;

import com.shesuhui.diamond.exception.DiamondException;
import com.shesuhui.diamond.model.User;

public interface UserService {

	public List<User> getUserList(int start, int limit);

	public void addUser(User user, List<String> roleNames, List<String> roomIds)
			throws DiamondException;

	/**
	 * 根据用户ID获得用户信息
	 * 
	 * @param uid
	 *            不能为空
	 * @return
	 */
	public User getUserById(String uid);

	/**
	 * 根据用户登录名获得用户信息
	 * 
	 * @param loginName
	 *            不能为空
	 * @return
	 */
	public User getUserByName(String loginName);

	/**
	 * 用于管理员更新用户信息
	 * 
	 * @param user
	 * @param roleNames
	 * @param roomIds
	 */
	public void updateUser(User user, List<String> roleNames,
			List<String> roomIds);

	/**
	 * 用户不允许修改自己的所属房屋和角色
	 * 
	 * @param user
	 * @return
	 */
	public void updatePersonal(User user);

	public void deleteUser(String id);

	/**
	 * 供用户修改密码
	 * 
	 * @param userName
	 * @param oldPassword
	 * @param password
	 * @throws FDCException
	 */
	public void updatePassword(String userName, String oldPassword,
			String password) throws DiamondException;

	/**
	 * 供管理员修改密码
	 * 
	 * @param userName
	 * @param password
	 */
	public void updatePassword(String userName, String password);

//	public String uploadUser(File file);

	public int getTotalCount();

	User getUserByRoom(String roomId);
}
