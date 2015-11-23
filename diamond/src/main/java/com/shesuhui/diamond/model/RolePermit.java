package com.shesuhui.diamond.model;

import java.io.Serializable;

public class RolePermit implements Serializable {

    private static final long serialVersionUID = -2457082806852368701L;

    private String id;

    private Role role;

    private Permit permit;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Permit getPermit() {
        return permit;
    }

    public void setPermit(Permit permit) {
        this.permit = permit;
    }

}
