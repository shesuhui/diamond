package com.shesuhui.diamond.service;

import org.springframework.web.multipart.MultipartFile;

import com.shesuhui.diamond.common.CommonResult;
import com.shesuhui.diamond.common.PageQueryBean;
import com.shesuhui.diamond.common.PageResultBean;
import com.shesuhui.diamond.model.Diamond;
import com.shesuhui.diamond.model.DiamondQueryParam;

public interface DiamondService {
	public abstract PageResultBean<Diamond, DiamondQueryParam> findDiamondPage(PageQueryBean<DiamondQueryParam> paramPageQueryBean)
		    throws Exception;

		  public abstract PageResultBean<Diamond, DiamondQueryParam> findBuyableDiamondPage(PageQueryBean<DiamondQueryParam> paramPageQueryBean)
		    throws Exception;

		  public abstract Diamond findDiamondById(int paramInt)
		    throws Exception;

		  public abstract Diamond findDiamondByName(String paramString1, String paramString2)
		    throws Exception;

		  public abstract CommonResult createDiamond(Diamond paramDiamond)
		    throws Exception;

		  public abstract CommonResult saveDiamond(Diamond paramDiamond)
		    throws Exception;

		  public abstract CommonResult deleteDiamond(String[] paramArrayOfString, Integer paramInteger)
		    throws Exception;

		  public abstract CommonResult setBuyable(String[] paramArrayOfString, Integer paramInteger)
		    throws Exception;

		  public abstract CommonResult impDiamond(MultipartFile paramMultipartFile, Integer paramInteger)
		    throws Exception;

		  public abstract CommonResult impDiamond(String paramString, int paramInt)
		    throws Exception;

		  public abstract CommonResult updateDiamond(String paramString)
		    throws Exception;

}
