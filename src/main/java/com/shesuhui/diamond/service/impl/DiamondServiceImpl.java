package com.shesuhui.diamond.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.shesuhui.diamond.common.CommonResult;
import com.shesuhui.diamond.common.PageQueryBean;
import com.shesuhui.diamond.common.PageResultBean;
import com.shesuhui.diamond.dao.DiamondDao;
import com.shesuhui.diamond.exception.DiamondException;
import com.shesuhui.diamond.model.Diamond;
import com.shesuhui.diamond.model.DiamondQueryParam;
import com.shesuhui.diamond.service.DiamondService;

@Service(value = "diamondService")
@Transactional
public class DiamondServiceImpl implements DiamondService {
	
	private static Logger logger=LoggerFactory.getLogger(DiamondServiceImpl.class);

	@Autowired
	private DiamondDao diamondDao = null;

	@Override
	public PageResultBean<Diamond, DiamondQueryParam> findDiamondPage(
			PageQueryBean<DiamondQueryParam> paramPageQueryBean) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public PageResultBean<Diamond, DiamondQueryParam> findBuyableDiamondPage(
			PageQueryBean<DiamondQueryParam> paramPageQueryBean) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Diamond findDiamondById(int paramInt) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Diamond findDiamondByName(String paramString1, String paramString2) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public CommonResult createDiamond(Diamond paramDiamond) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public CommonResult saveDiamond(Diamond paramDiamond) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public CommonResult deleteDiamond(String[] paramArrayOfString, Integer paramInteger) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public CommonResult setBuyable(String[] paramArrayOfString, Integer paramInteger) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public CommonResult impDiamond(MultipartFile paramMultipartFile, Integer paramInteger) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public CommonResult impDiamond(String paramString, int paramInt) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public CommonResult updateDiamond(String paramString) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}


}
