package com.shesuhui.diamond.model;

import java.io.Serializable;

public class Permit implements Serializable {

    private static final long serialVersionUID = -8441606643817934630L;

    private String id;

    private String permitName;

    public String getPermitName() {
        return permitName;
    }

    public void setPermitName(String permitName) {
        this.permitName = permitName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

}
