package com.shesuhui.diamond.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.shesuhui.diamond.dao.DiamondMapper;
import com.shesuhui.diamond.exception.DiamondException;
import com.shesuhui.diamond.model.Diamond;
import com.shesuhui.diamond.service.DiamondService;

@Service(value = "diamondService")
@Transactional
public class DiamondServiceImpl implements DiamondService {
	
	private static Logger logger=LoggerFactory.getLogger(DiamondServiceImpl.class);

	@Resource(name = "diamondMapper")
	private DiamondMapper diamondMapper = null;

	@Override
	public boolean addDiamond(Diamond diamond) throws DiamondException {
		boolean result = false;
		try {
			this.diamondMapper.addDiamond(diamond);
			result = true;
		} catch (Exception e) {
			throw new DiamondException("添加钻石信息失败！", e);
		}
		return result;
	}

	@Override
	public boolean updateDiamond(Diamond diamond) throws DiamondException {
		boolean result = false;
		try {
			this.diamondMapper.updateDiamond(diamond);
			result = true;
		} catch (Exception e) {
			throw new DiamondException("修改钻石信息失败！", e);
		}
		return result;
	}

	@Override
	public boolean deleteDiamond(String id) throws DiamondException {
		boolean result = false;
		try {
			this.diamondMapper.deleteDiamond(id);
			result = true;
		} catch (Exception e) {
			throw new DiamondException("删除钻石信息失败！", e);
		}
		return result;
	}

	@Override
	public Diamond getDiamond(String id) throws DiamondException {
		return this.diamondMapper.getDiamond(id);
	}

	@Override
	public List<Diamond> getDiamonds() throws DiamondException {
		return this.diamondMapper.getDiamonds();
	}

}
