package com.shesuhui.diamond.service.impl;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.shesuhui.diamond.dao.RoleMapper;
import com.shesuhui.diamond.dao.UserMapper;
import com.shesuhui.diamond.exception.DiamondException;
import com.shesuhui.diamond.model.User;
import com.shesuhui.diamond.service.RoleService;
import com.shesuhui.diamond.service.UserService;
import com.shesuhui.diamond.vo.RoleVo;
import com.shesuhui.diamond.vo.UserVo;

@Service(value = "userService")
@Transactional
public class UserServiceImpl implements UserService {

	@Resource(name = "roleService")
	private RoleService roleService;

	@Resource
	private UserMapper userMapper;


	/**
	 * 添加用户时, 关联角色和房间
	 * 
	 * @throws FDCException
	 */
	@Override
	public void addUser(User user, List<String> roleNames, List<String> roomIds)
			throws DiamondException {
		if (StringUtils.isBlank(user.getPassword())) {
			throw new DiamondException("密码不能为空");
		}
		if (getUserById(user.getId()) != null
				|| getUserByName(user.getLoginName()) != null) {
			throw new DiamondException("用户已存在");
		}

		addOrUpdateUser(user, roleNames, roomIds, true);
	}

	/**
	 * 更新用户时, 更新角色和房间
	 */
	@Override
	public void updateUser(User user, List<String> roleNames,
			List<String> roomIds) {
		addOrUpdateUser(user, roleNames, roomIds, false);
	}

	private void addOrUpdateUser(User user, List<String> roleNames,
			List<String> roomIds, boolean isAdd) {
		if (isAdd) {
			this.userMapper.addUser(user);
		} else {
			this.userMapper.updateUser(user);
			roleService.removeAllUserRoleAssociation(user.getId());
		}

		if (null != roleNames) {
			for (String roleName : roleNames) {
				roleService.addUserToRole(user.getId(), roleName);
			}
		}

	}

	@Override
	public List<User> getUserList(int start, int limit) {
		return this.userMapper.findUsers(start, limit);
	}

	@Override
	public User getUserById(String uid) {
		return userMapper.getUserById(uid);
	}

	@Override
	public User getUserByName(String userName) {
		return userMapper.getUserByName(userName);
	}

	@Override
	public User getUserByRoom(String roomId) {
		return userMapper.getUserByRoom(roomId);
	}

	/**
	 * 用户更新个人信息不允许更新角色和房间
	 */
	@Override
	public void updatePersonal(User user) {
		this.userMapper.updatePersonal(user);
	}

	@Override
	public void deleteUser(String id) {
		if (StringUtils.isNotBlank(id)) {
			this.userMapper.deleteUser(id);
			roleService.removeAllUserRoleAssociation(id);
		}
	}

	@Override
	public void updatePassword(String id, String password) {
		this.userMapper.updatePassword(id, password);
	}

	@Override
	public void updatePassword(String id, String oldPassword, String password)
			throws DiamondException {
		if (!oldPassword.equals(userMapper.getPassword(id))) {
			throw new DiamondException("旧密码不正确");
		}
		if (oldPassword.equals(password)) {
			throw new DiamondException("新密码不能和旧密码相同");
		}
		this.userMapper.updatePassword(id, password);
	}

	/*@SuppressWarnings("unchecked")
	@Override
	public String uploadUser(File file) {
		int version = 2003;
		String msg = null;
		if (FilenameUtils.getExtension(file.getName()).equalsIgnoreCase("xlsx")) {
			version = 2007;
		}
		try {
			Map<String, Object> map = UploadFileUtil.uploadFile(file, version);
			List<UserVo> list = (List<UserVo>) map.get("message");
			String password = DesEncrypter.MD5("123456");
			for (UserVo vo : list) {
				User user = new User(vo);
				user.setPassword(password);

				List<String> roomIdList = new ArrayList<String>();
				List<DisplayRoom> rooms = vo.getRooms();
				if (null != rooms) {
					for (DisplayRoom displayRoom : rooms) {
						// roomIdList.add(displayRoom.getId());
						String roomInfo[] = displayRoom.getFullName()
								.split(":");
						if (null != roomInfo && roomInfo.length == 2) {
							String rid = this.roomMapper.getRoomId(roomInfo[0],
									roomInfo[1]);
							if (StringUtils.isNotBlank(rid)) {
								roomIdList.add(rid);
							}

						}

					}
				}
				List<RoleVo> roleVos = vo.getRoleNames();
				List<String> roleNames = new ArrayList<String>();
				for (RoleVo roleVo : roleVos) {
					roleNames.add(roleVo.getRoleName());
				}
				this.addUser(user, roleNames, roomIdList);
			}
			msg = "成功导入" + list.size() + "条数据";
		} catch (Exception e) {
			e.printStackTrace();
		}
		return msg;
	}*/

	@Override
	public int getTotalCount() {
		return userMapper.getTotalCount();
	}

}
