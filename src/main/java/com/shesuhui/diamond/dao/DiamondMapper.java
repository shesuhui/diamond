package com.shesuhui.diamond.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.shesuhui.diamond.model.Diamond;

@Repository
public interface DiamondMapper {
	public void addDiamond(Diamond diamond);

	public void updateDiamond(Diamond diamond);

	public void deleteDiamond(String id);

	public Diamond getDiamond(String id);

	public List<Diamond> getDiamonds();
}
