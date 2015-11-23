package com.shesuhui.diamond.model;

import java.io.Serializable;

public interface IdGenertor extends Serializable
{
	  public abstract Integer getId();

	  public abstract void setId(Integer paramInteger);
	}
