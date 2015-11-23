/**
 * @author yepeng
 *
 */
package com.shesuhui.diamond.model;

import java.util.List;


public class JQGridPage<T> {
    /**
     * 当前页
     */
    private int page;
    /**
     * 总页数
     */
    private int total;
    /**
     * 总记录数
     */
    private int records;
    /**
     * 真实数据
     */
    private List<T> rows;
    
    public JQGridPage(int page, int singleRows, int records, List<T> rows) {
        this.page = page;
        this.total = records % singleRows == 0 ? records / singleRows : records / singleRows + 1;
        this.records = records;
        this.rows = rows;
    }
    
    /**
     * @return the page
     */
    public int getPage() {
        return page;
    }
    /**
     * @param page the page to set
     */
    public void setPage(int page) {
        this.page = page;
    }
    /**
     * @return the total
     */
    public int getTotal() {
        return total;
    }
    /**
     * @param total the total to set
     */
    public void setTotal(int total) {
        this.total = total;
    }
    /**
     * @return the records
     */
    public int getRecords() {
        return records;
    }
    /**
     * @param records the records to set
     */
    public void setRecords(int records) {
        this.records = records;
    }
    /**
     * @return the rows
     */
    public List<T> getRows() {
        return rows;
    }
    /**
     * @param rows the rows to set
     */
    public void setRows(List<T> rows) {
        this.rows = rows;
    }
}

