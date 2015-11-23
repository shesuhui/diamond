package com.shesuhui.diamond.controller;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.shesuhui.diamond.service.DiamondService;

@Controller
@RequestMapping("/diamond")
public class DiamondController {
	private static Logger logger = LoggerFactory.getLogger(DiamondController.class);
	@Resource(name = "diamondService")
	private DiamondService diamondService = null;

	@RequestMapping("/diamond")
	public String index() {
		return null;

	}
}
