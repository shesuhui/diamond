package com.shesuhui.diamond.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.xssf.usermodel.XSSFCell;

import net.sourceforge.pinyin4j.PinyinHelper;

public class StringUtil
{
  public static final String NUMBER_REGEXP = "\\d+";
  static Pattern NUMBER_PATTERN = Pattern.compile("\\d+");
  public static final String TRIM_SYMBOL = "\\s*|\t|\r|\n";
  static Pattern TRIM_SYMBOL_PATTERN = Pattern.compile("\\s*|\t|\r|\n");

  public static boolean isEmptyTrim(String str) {
    return (str == null) || (str.trim().length() == 0);
  }

  public static boolean isNotEmptyTrim(String str) {
    return (str != null) && (str.trim().length() != 0);
  }

  public static String trimEmptyNull(String str) {
    if ((str == null) || ("".equals(str.trim()))) {
      return null;
    }
    return str.trim();
  }

  public static String trimSymbol(String str) {
    if ((str == null) || ("".equals(str))) {
      return null;
    }
    Matcher matcher = TRIM_SYMBOL_PATTERN.matcher(str.trim());
    return matcher.replaceAll(str);
  }

  public static String trimAll(String str) {
    if ((str == null) || ("".equals(str))) {
      return "";
    }
    return str.replaceAll(" ", "").replaceAll("　", "");
  }

  public static String trimToEmpty(String str) {
    if (str == null) {
      return "";
    }
    return str == null ? "" : str.trim();
  }

  public static boolean isNumber(String str) {
    if ((str == null) || ("".equals(str.trim()))) {
      return false;
    }
    Matcher matcher = NUMBER_PATTERN.matcher(str.trim());

    return matcher.matches();
  }

  public static int toNumber(String str)
    throws Exception
  {
    if ((str == null) || ("".equals(str.trim()))) {
      return 0;
    }
    Matcher matcher = NUMBER_PATTERN.matcher(str.trim());
    if (matcher.matches()) {
      return Integer.parseInt(str.trim());
    }
    throw new IllegalArgumentException("字符串转换成整形时出错");
  }

  public static Integer toInteger(String str)
    throws Exception
  {
    if ((str == null) || ("".equals(str.trim()))) {
      return null;
    }
    Matcher matcher = NUMBER_PATTERN.matcher(str.trim());
    if (matcher.matches()) {
      return Integer.valueOf(Integer.parseInt(str.trim()));
    }
    throw new IllegalArgumentException("字符串转换成整形时出错");
  }

  public static String trimOfStr(String str)
  {
    return str == null ? null : str.trim();
  }

  public static String getSpell(String str) {
    if (str == null) {
      throw new RuntimeException("the str is null");
    }
    char[] chars = str.toCharArray();
    StringBuilder sb = new StringBuilder();

    for (char single : chars) {
      if (single == ' ') {
        continue;
      }
      if (isChinese(single)) {
        String spell =  PinyinHelper.toTongyongPinyinStringArray(single)[0];
        sb.append(spell.substring(0, 1).toUpperCase());
      } else {
        sb.append(single);
      }
    }

    return sb.toString();
  }

  public static String getCellValue(Cell cell) {
    if (cell == null) {
      return "";
    }
    if ((cell instanceof HSSFCell)) {
      return getHSSFCellValue((HSSFCell)cell);
    }
    return getXSSFCellValue((XSSFCell)cell);
  }

  public static String getXSSFCellValue(XSSFCell xssfCell)
  {
    if (xssfCell.getCellType() == 4)
    {
      return String.valueOf(xssfCell.getBooleanCellValue());
    }if (xssfCell.getCellType() == 0)
    {
      return String.valueOf(xssfCell.getNumericCellValue());
    }

    return String.valueOf(xssfCell.getStringCellValue());
  }

  public static String getHSSFCellValue(HSSFCell hssfCell)
  {
    if (hssfCell.getCellType() == 4)
    {
      return String.valueOf(hssfCell.getBooleanCellValue());
    }if (hssfCell.getCellType() == 0)
    {
      return String.valueOf(hssfCell.getNumericCellValue());
    }

    return String.valueOf(hssfCell.getStringCellValue());
  }

  public static boolean isNumeric(String str)
  {
    Pattern pattern = Pattern.compile("[0-9]+.?[0-9]+");
    Matcher isNum = pattern.matcher(str);

    return isNum.matches();
  }

  private static boolean isChinese(char c)
  {
    return ((c >= '一') && (c <= 40869)) || (
      (c >= 63744) && (c <= 64045));
  }
}