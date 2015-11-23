package com.shesuhui.diamond.service;

import java.util.List;

import com.shesuhui.diamond.exception.DiamondException;
import com.shesuhui.diamond.model.Diamond;

public interface DiamondService {

	public boolean addDiamond(Diamond diamond) throws DiamondException;

	public boolean updateDiamond(Diamond diamond) throws DiamondException;

	public boolean deleteDiamond(String id) throws DiamondException;

	public Diamond getDiamond(String id) throws DiamondException;

	public List<Diamond> getDiamonds() throws DiamondException;

}
