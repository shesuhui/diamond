package com.shesuhui.diamond.model;

import java.io.Serializable;
import java.util.List;

public class Role implements Serializable {

    private static final long serialVersionUID = -7524087802790592944L;

    private String id;

    private String roleName;

    private String chinaeseName;
    private List<User> users;

    private List<Permit> permits;

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public List<Permit> getPermits() {
        return permits;
    }

    public void setPermits(List<Permit> permits) {
        this.permits = permits;
    }

    public String getChinaeseName() {
        return chinaeseName;
    }

    public void setChinaeseName(String chinaeseName) {
        this.chinaeseName = chinaeseName;
    }
    
}
