package com.shesuhui.diamond.controller;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.shesuhui.diamond.exception.DiamondException;
import com.shesuhui.diamond.model.JQGridPage;
import com.shesuhui.diamond.model.Role;
import com.shesuhui.diamond.model.User;
import com.shesuhui.diamond.service.LoginService;
import com.shesuhui.diamond.service.RoleService;
import com.shesuhui.diamond.service.UserService;
import com.shesuhui.diamond.util.Constants;
import com.shesuhui.diamond.vo.RoleVo;
import com.shesuhui.diamond.vo.UserVo;


@Controller
@RequestMapping("user/")
public class UserController {
    private static Logger log = LoggerFactory.getLogger(UserController.class);

    @Resource
    private UserService userService;
    @Resource
    private RoleService roleService;
    @Resource
    private LoginService loginService;

    /**
     * 异常页面控制
     */
    @ExceptionHandler(Exception.class)
    public String ExceptionHandler(Exception e) {
        log.error("系统异常", e);
        return "exception";
    }

    @RequestMapping("index")
    public String index() {
        return "user-index";
    }

    /**
     * 返回添加用户的页面
     * 
     * @param mode add
     * @param map
     * @return
     */
    @RequestMapping("user-add-page")
    public String userAddPage(@RequestParam(value = "mode")
    String mode, Map<String, Object> map) {
        List<Role> roles = roleService.getRoles();
        List<RoleVo> roleNames = new ArrayList<RoleVo>(roles.size());
        for (Role role : roles) {
            RoleVo vo = new RoleVo();
            BeanUtils.copyProperties(role, vo);
            vo.setRoleLabel(role.getChinaeseName());
            roleNames.add(vo);
        }

        map.put("allRoleNames", roleNames);
        map.put("mode", mode);
        map.put("random", RandomStringUtils.randomAlphanumeric(32) + "_");
        return "content/user-add";
    }

    /**
     * 返回修改, 查看用户的页面
     * 
     * @param mode update or view
     * @param userName
     * @param map
     * @return
     */
    @RequestMapping("user-info-page")
    public String userInfoPage(@RequestParam(value = "mode")
    String mode, @RequestParam(value = "userName")
    String userName, Map<String, Object> map) {
        User user = userService.getUserByName(userName);
        List<Role> roles = roleService.getRoles();
        List<RoleVo> roleNames = new ArrayList<RoleVo>(roles.size());
        for (Role role : roles) {
            RoleVo vo = new RoleVo();
            BeanUtils.copyProperties(role, vo);
            vo.setRoleLabel(role.getChinaeseName());
            roleNames.add(vo);
        }

        UserVo vo = new UserVo(user);
        map.put("user", vo);
        map.put("allRoleNames", roleNames);
        map.put("mode", mode);
        map.put("random", RandomStringUtils.randomAlphanumeric(32) + "_");
        return "content/user-info";
    }

    @RequestMapping("user-import-page")
    public String userImportPage() {
        return "content/user-import";
    }

    @RequestMapping("uesr-list")
    @ResponseBody
    public String uesrList(@RequestParam(value = "rows")
    int rows, @RequestParam(value = "page")
    int page) {
        List<UserVo> userVoList = new ArrayList<UserVo>();
        List<User> userList = userService.getUserList((page - 1) * rows, rows);

        for (User user : userList) {
            userVoList.add(new UserVo(user));
        }
        int records = userService.getTotalCount();
        JQGridPage<UserVo> pageRecords = new JQGridPage<UserVo>(page, rows, records, userVoList);
        return "";
    }

    @RequestMapping(value = "add", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> add(HttpServletRequest request, @RequestParam
    Map<String, String> userMap) {
        Map<String, Object> resultMap = new HashMap<String, Object>();

        String[] roleNamesArray = request.getParameterValues("roleNames");
        List<String> roleNamesList = (null == roleNamesArray ? null : Arrays.asList(roleNamesArray));
        userMap.remove("roleNames");

        List<String> roomIdList = null;
        String roomIds = userMap.get("roomIds");
        userMap.remove("roomIds");
        if (StringUtils.isNotBlank(roomIds)) {
            String[] roomIdsArray = roomIds.split(UserVo.SEPALATOR);
            roomIdList = Arrays.asList(roomIdsArray);
        }

        String password = userMap.get("password");
        String repassword = userMap.get("repassword");
        userMap.remove("repassword");

        if (StringUtils.isBlank(password) || StringUtils.isBlank(repassword)) {
            resultMap.put("msg", "新密码不能为空");
            resultMap.put("status", "failed");
            return resultMap;
        }
        if (!password.equals(repassword)) {
            resultMap.put("msg", "两次输入的新密码不一致");
            resultMap.put("status", "failed");
            return resultMap;
        }
        if (StringUtils.isBlank(userMap.get("loginName"))) {
            resultMap.put("msg", "登录名不能为空");
            resultMap.put("status", "failed");
            return resultMap;
        }
        try {
//            User user = JacksonUtils.convertValue(userMap, User.class);
        	User user=null;
            user.setPassword(password);
            userService.addUser(user, roleNamesList, roomIdList);

            User resultUser = userService.getUserById(user.getId());
            UserVo vo = new UserVo(resultUser);
            resultMap.put("user", vo);
            resultMap.put("status", "success");
        } catch (DiamondException e) {
            resultMap.put("status", "failed");
            resultMap.put("msg", e.getMessage());
            log.error("新增用户失败", e);
        }

        return resultMap;
    }

    @RequestMapping(value = "update", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> update(HttpServletRequest request, @RequestParam
    Map<String, String> userMap) {
        Map<String, Object> resultMap = new HashMap<String, Object>();

        String[] roleNamesArray = request.getParameterValues("roleNames");
        List<String> roleNamesList = (null == roleNamesArray ? null : Arrays.asList(roleNamesArray));
        userMap.remove("roleNames");

        List<String> roomIdList = null;
        String roomIds = userMap.get("roomIds");
        userMap.remove("roomIds");
        if (StringUtils.isNotBlank(roomIds)) {
            String[] roomIdsArray = roomIds.split(UserVo.SEPALATOR);
            roomIdList = Arrays.asList(roomIdsArray);
        }

        try {
//            User user = JacksonUtils.convertValue(userMap, User.class);
             User user=null;   	
            this.userService.updateUser(user, roleNamesList, roomIdList);
            // 更新session
            User newUser = this.loginService.getUserByLoginName(user.getLoginName());
            request.getSession(true).setAttribute(Constants.LOGIN_USER_SESSINON_KEY, newUser);
            
            User resultUser = userService.getUserById(user.getId());
            UserVo resultVo = new UserVo(resultUser);
            resultMap.put("user", resultVo);
            resultMap.put("status", "success");
        } catch (Exception e) {
            resultMap.put("status", "failed");
            resultMap.put("msg", "更新用户失败");
            log.error("更新用户失败", e);
        }

        return resultMap;
    }

    @RequestMapping(value = "updatepwd", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> updatePWD(HttpServletRequest request, @RequestParam(value = "id")
    String id, @RequestParam(value = "password")
    String password, @RequestParam(value = "repassword")
    String repassword) {
        Map<String, Object> resultMap = new HashMap<String, Object>();

        if (StringUtils.isBlank(password) || StringUtils.isBlank(repassword)) {
            resultMap.put("msg", "新密码不能为空");
            resultMap.put("status", "failed");
            return resultMap;
        }
        if (!password.equals(repassword)) {
            resultMap.put("msg", "两次输入的新密码不一致");
            resultMap.put("status", "failed");
            return resultMap;
        }

        try {
            this.userService.updatePassword(id, password);
            resultMap.put("status", "success");
        } catch (Exception e) {
            resultMap.put("msg", "修改用户密码失败");
            resultMap.put("status", "failed");
            log.debug("修改用户密码失败", e);
        }

        return resultMap;
    }

    @RequestMapping(value = "detele")
    @ResponseBody
    public Map<String, Object> delete(@RequestParam
    String id) {
        Map<String, Object> resultMap = new HashMap<String, Object>();

        try {
            User user = userService.getUserById(id);
            // 管理员不能被删除
            if (null != user && !Constants.USER_ADMIN.equals(user.getLoginName())) {
                this.userService.deleteUser(id);
                resultMap.put("status", "success");
            } else {
                resultMap.put("status", "failed");
                resultMap.put("msg", "系统管理员不能删除");
            }
        } catch (Exception e) {
            resultMap.put("status", "failed");
            resultMap.put("msg", "删除用户信息失败");
            log.error("删除用户信息失败", e);
        }

        return resultMap;
    }

    /**
     * 上传用户
     * 
     * @param file
     * @param request
     * @param response
     * @return
     */
    /*
    @RequestMapping("uploadUser")
    @ResponseBody
    public Map<String, Object> upload(@RequestParam("file")
    MultipartFile file, HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> resultMap = new HashMap<String, Object>();

        String path = File.separator + "upload" + File.separator + "user";
        String savePath = request.getServletContext().getRealPath(path);
        String fileName = file.getOriginalFilename();
        // 校验格式
        if (!validFileExt(fileName)) {
            resultMap.put(Constants.STATUS_KEY,Constants.STATUS_FAILELD);
            resultMap.put("msg", "请上传xls, xlsx后缀的文件！");
            return resultMap;
        }
        String newFileName = DateFormatUtils.format(new Date(), "yyyMMddHHmmssSSS");
        String extension = FilenameUtils.getExtension(fileName);
        fileName = newFileName + "." + extension;
        File uploadfile = new File(savePath + File.separator + fileName);

        try {
            if (!uploadfile.exists()) {
                uploadfile.createNewFile();
            }
            FileCopyUtils.copy(file.getBytes(), uploadfile);
            String msg = this.userService.uploadUser(uploadfile);
            if (StringUtils.isNotBlank(msg)) {
                resultMap.put(Constants.STATUS_KEY, Constants.STATUS_SUCCESS);
                resultMap.put("msg", msg);
            } else {
                resultMap.put(Constants.STATUS_KEY, Constants.STATUS_FAILELD);
                resultMap.put("msg", "导入用户失败");
            }

        } catch (IOException e) {
            resultMap.put(Constants.STATUS_KEY, Constants.STATUS_FAILELD);
            resultMap.put("msg", "导入用户失败");
            log.error("导入用户失败", e);
        }
        return resultMap;
    }
    
    */

    private boolean validFileExt(String fileName) {
        String[] imgExt = {".xls", ".xlsx"};
        for (String ext : imgExt) {
            if (StringUtils.endsWithIgnoreCase(fileName, ext)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Excel模版下载
     * 
     * @param response
     * @param request
     * @throws IOException
     */
    @RequestMapping("xls")
    @ResponseBody
    public void downloadXLSX(HttpServletResponse response, HttpServletRequest request, String type) throws IOException {
        String basePath = request.getSession().getServletContext().getRealPath("") + File.separator + "WEB-INF"
                          + File.separator + "pages" + File.separator + "content" + File.separator;
        String filePath = basePath + "User_2003_Template.xls";
        if (type.equals("2007")) {
            filePath = basePath + "User_2007_Template.xlsx";
        }

        File fileOfTXT = new File(filePath);

        InputStream input = FileUtils.openInputStream(fileOfTXT);

        byte[] data = IOUtils.toByteArray(input);

        String fileName = URLEncoder.encode(fileOfTXT.getName(), "UTF-8");

        response.reset();
        response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
        response.addHeader("Content-Length", "" + data.length);
        response.setContentType("application/octet-stream; charset=UTF-8");

        IOUtils.write(data, response.getOutputStream());
        IOUtils.closeQuietly(input);
    }

    public UserService getUserService() {
        return userService;
    }

    public void setUserService(UserService userService) {
        this.userService = userService;
    }
}
