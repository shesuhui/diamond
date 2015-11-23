package com.shesuhui.diamond.controller;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.shesuhui.diamond.util.Constants;

@Controller
@RequestMapping(value = "welcome")
public class WelcomeController {
	@RequestMapping("/index")
	public String index() {
		String url = "/index";
		Subject subject = SecurityUtils.getSubject();
		if (subject.hasRole(Constants.ROLE_ADMIN)) {
			url = "property-index";
		} else if (subject.hasRole(Constants.ROLE_BUYER)) {
			url = "owner-notice-list";
		}
		return url;
	}
}
