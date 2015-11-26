package com.shesuhui.diamond.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.shesuhui.diamond.model.Diamond;
import com.shesuhui.diamond.model.DiamondQueryParam;
import com.shesuhui.diamond.model.DiamondSupplier;

public abstract interface DiamondDao
{
  public abstract List<Diamond> selectDiamondPageList(@Param("diamondQueryParam") DiamondQueryParam paramDiamondQueryParam, @Param("startIndex") Integer paramInteger1, @Param("pageSize") Integer paramInteger2);

  public abstract int selectDiamondCount(@Param("diamondQueryParam") DiamondQueryParam paramDiamondQueryParam);

  public abstract List<Diamond> selectBuyableDiamondPageList(@Param("diamondQueryParam") DiamondQueryParam paramDiamondQueryParam, @Param("startIndex") Integer paramInteger1, @Param("pageSize") Integer paramInteger2);

  public abstract int selectBuyableDiamondCount(@Param("diamondQueryParam") DiamondQueryParam paramDiamondQueryParam);

  public abstract Diamond findDiamondById(int paramInt);

  public abstract void insertDiamond(Diamond paramDiamond);

  public abstract int deleteById(@Param("id") int paramInt1, @Param("modifierId") int paramInt2);

  public abstract int updateStatus(@Param("id") int paramInt1, @Param("status") int paramInt2, @Param("modifierId") int paramInt3);

  public abstract int updateAllStatus(int paramInt);

  public abstract int updateDiamond(Diamond paramDiamond);

  public abstract Diamond findByName(@Param("name") String paramString, @Param("id") int paramInt);

  public abstract void insertDiamondSupplier(DiamondSupplier paramDiamondSupplier);

  public abstract int updateDiamondSupplier(DiamondSupplier paramDiamondSupplier);

  public abstract int deleteDiamondSupplier(int paramInt);

  public abstract Diamond findDiamondByCert(String paramString);

  public abstract int deleteUnsoldDiamond(int paramInt);

  public abstract int deleteUnsoldDiamondSupplier(int paramInt);

  public abstract List<Diamond> selectDiamondFromImp(@Param("supplierId") int paramInt, @Param("startIndex") Integer paramInteger1, @Param("pageSize") Integer paramInteger2);

  public abstract int copyFromImp(int paramInt);

  public abstract int updateFormImp(int paramInt);
}