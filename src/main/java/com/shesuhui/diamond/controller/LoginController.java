package com.shesuhui.diamond.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.shesuhui.diamond.common.CommonResult;
import com.shesuhui.diamond.model.User;
import com.shesuhui.diamond.service.LoginService;
import com.shesuhui.diamond.util.Constants;

/**
 * 
 * <pre>
 * <li>功能简述:web方式登录controller
 * <li>详细描述: 对通过web方式登录的用户进行认证及授权
 * &#64;author  ssh
 * &#64;version  [1.0 2015-11-20]
 * &#64;see  [相关类/方法]
 * &#64;since  1.0
 * </pre>
 */
@Controller
@RequestMapping("login")
public class LoginController {
	private Logger logger = LoggerFactory.getLogger(LoginController.class);
	@Autowired
	private LoginService loginService;

	/**
	 * 异常页面控制
	 */
	@ExceptionHandler(Exception.class)
	public String ExceptionHandler(Exception e) {
		logger.error("系统异常", e);
		return "exception";
	}

	@RequestMapping("index")
	public String index() {
		return "login-index";
	}

	@ResponseBody
	@RequestMapping(value = "login", method = RequestMethod.POST)
	public CommonResult login(HttpServletRequest request, HttpServletResponse response) {
		String msg = null;
		HttpSession session = request.getSession();
		Subject subject = SecurityUtils.getSubject();
		CommonResult result = new CommonResult();
		boolean loginSuccessed = false;
		if (session == null || session.getAttribute(Constants.LOGIN_USER_SESSINON_KEY) == null) {
			String username = request.getParameter("loginId");
			String password = request.getParameter("password");
			if (StringUtils.isBlank(username) || StringUtils.isBlank(password)) {
				msg = "登录名或密码不能为空";
			} else {
				try {
					UsernamePasswordToken token = new UsernamePasswordToken(username, password);
					subject.login(token);
					User user = this.loginService.getUserByLoginName((String) subject.getPrincipal());
					request.getSession().setAttribute(Constants.LOGIN_USER_SESSINON_KEY, user);
					token.clear();
					loginSuccessed = true;

				} catch (UnknownAccountException e) {
					logger.error(e.getMessage(), e);
					msg = "登录名或密码不正确";
					if (result == null) {
						result = new CommonResult();
					}
					result.setCode(-1);
					result.setMsg(msg);
				} catch (Exception e) {
					logger.error(e.getMessage(), e);
					msg = "登录失败，请联系管理员";
					if (result == null) {
						result = new CommonResult();
					}
					result.setCode(-1);
					result.setMsg(msg);
				}

			}

		} else {
			loginSuccessed = true;
		}

		if (loginSuccessed) {
			Map resMap = new HashMap();
			resMap.put("goUrl", "/diamond/index.html");
			result.setResult(resMap);
			result.setCode(0);
		}

		/*
		 * if (subject.hasRole(Constants.ROLE_ADMIN)) { // 管理员角色 url =
		 * "admin-index"; } else if (subject.hasRole(Constants.ROLE_BUYER)) { //
		 * 买家角色 url = "custom-index"; } else if
		 * (subject.hasRole(Constants.ROLE_CUSTOMERSERVICE)) { // 客服角色 url =
		 * "service-index"; } else { logger.error("非法用户,禁止进系统"); if (session !=
		 * null && session.getAttribute(Constants.LOGIN_USER_SESSINON_KEY) !=
		 * null) { session.invalidate(); } }
		 */
		return result;
	}

	@RequestMapping("logout")
	public String logout(HttpServletRequest request, HttpServletResponse response) {
		Subject subject = SecurityUtils.getSubject();
		if (subject != null) {
			subject.logout();
		}
		HttpSession session = request.getSession(false);
		if (session != null && session.getAttribute(Constants.LOGIN_USER_SESSINON_KEY) != null) {
			session.invalidate();
		}
		return "/index";

	}

	public LoginService getLoginService() {
		return loginService;
	}

	public void setLoginService(LoginService loginService) {
		this.loginService = loginService;
	}

}
