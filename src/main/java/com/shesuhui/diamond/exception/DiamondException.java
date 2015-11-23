package com.shesuhui.diamond.exception;

public class DiamondException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public DiamondException() {
		super();
	}

	public DiamondException(String message) {
		super(message);
	}

	public DiamondException(String message, Throwable cause) {
		super(message, cause);
	}

	public DiamondException(Throwable cause) {
		super(cause);
	}

}
