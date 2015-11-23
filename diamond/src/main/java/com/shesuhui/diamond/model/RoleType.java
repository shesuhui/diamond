package com.shesuhui.diamond.model;

public enum RoleType {
    admin(1), user(2);
    
    private int code;
    private RoleType(int code) {
        this.code = code;
    }
    
    public int getCode() {
        return code;
    }
}
