package com.shesuhui.diamond.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.shesuhui.diamond.model.User;

@Repository
public interface UserDao {

	String getPassword(@Param(value = "id") String id);

	String updatePassword(@Param(value = "id") String id, @Param(value = "password") String password);

	void addUser(User user);

	void updateUser(User User);

	void updatePersonal(User User);

	void deleteUserById(@Param("id") int paramInt1, @Param("modifierId") int paramInt2);

	User getUserById(@Param(value = "userId") Integer userId);

	User getUserByName(@Param(value = "userName") String userName);

	User getUserByRoom(@Param(value = "roomId") String roomId);

	List<User> findUsers(int start, int limit);

	User getUserWihtRoomRole(@Param(value = "userId") String userId);

	User getUserByLoginName(@Param(value = "loginName") String loginName);

	User getUserByPassword(@Param(value = "loginName") String loginName, @Param(value = "password") String password);

	int getTotalCount();
}
