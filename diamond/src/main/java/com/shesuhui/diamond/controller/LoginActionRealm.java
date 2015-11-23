package com.shesuhui.diamond.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.shiro.authc.AccountException;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationException;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.jdbc.JdbcRealm;
import org.apache.shiro.subject.PrincipalCollection;

import com.shesuhui.diamond.model.Permit;
import com.shesuhui.diamond.model.Role;
import com.shesuhui.diamond.model.User;
import com.shesuhui.diamond.service.LoginService;

public class LoginActionRealm extends JdbcRealm {

    private LoginService loginService;

    /**
     * 授权
     */
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        // null usernames are invalid
        if (principals == null) {
            throw new AuthorizationException("PrincipalCollection method argument cannot be null.");
        }
        String username = (String) getAvailablePrincipal(principals);
        Set<String> roleNames = new HashSet<String>();
        Set<String> permissions = new HashSet<String>();
        // Retrieve roles and permissions from database
        List<Role> roles = this.loginService.getRolesByUserName(username);
        for (Role r : roles) {
            roleNames.add(r.getRoleName());
            for (Permit p : r.getPermits()) {// 关联到Permit
                permissions.add(p.getPermitName());
            }

        }
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo(roleNames);
        info.setStringPermissions(permissions);
        return info;
    }

    /**
     * 认证
     */
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        UsernamePasswordToken upToken = (UsernamePasswordToken) token;
        String username = upToken.getUsername();
        String password = String.valueOf(upToken.getPassword());
        if (username == null || password == null) {
            throw new AccountException("Null usernames are not allowed by this realm.");
        }
        AuthenticationInfo info = null;
        // String reRassword = this.loginService.getUserPasssword(username, password);
        User user = this.loginService.getUser(username, password);

        if (user == null) {
            throw new UnknownAccountException("No account found for user [" + username + "]");
        }
        info = buildAuthenticationInfo(username, password.toCharArray());
        // 清空授权缓存
        clearCachedAuthorizationInfo(info.getPrincipals());
        return info;
    }

    @Resource
    public void setLoginService(LoginService loginService) {
        this.loginService = loginService;
    }

}
