/**
 * @Copyright (C), 2013-2019 www.sino-essence.com Inc. All rights reserved.
 * @Title:    LoginInterceptor.java
 * @Package:  com.zdxb.tcmcsm.pks.system
 * @Description:   TODO
 * @author:      xuBiao
 * @date:  2019年6月2日 下午8:20:52
 * @Version:   V1.0.0
*/
package com.zdxb.tcmcsm.pks.system;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

/**
 * @ClassName:  LoginInterceptor
 * @Description:   l拦截器
 * @author: xuBiao
 * @date:  2019年6月2日 下午8:20:52
*/
public class LoginInterceptor implements HandlerInterceptor{
	

   /**
    * 
    * Title: preHandle  
    * Description: 拦截信息   
    * @param request
    * @param response
    * @param arg2
    * @return
    * @throws Exception 
    * @author:  xuBiao   
    * @see org.springframework.web.servlet.HandlerInterceptor#preHandle(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, java.lang.Object)
    */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object arg2)
            throws Exception {
        return true;
    
    }

    /**
     * 
     * Title: afterCompletion  
     * Description: TODO   
     * @param arg0
     * @param arg1
     * @param arg2
     * @param arg3
     * @throws Exception 
     * @author:  xuBiao   
     * @see org.springframework.web.servlet.HandlerInterceptor#afterCompletion(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, java.lang.Object, java.lang.Exception)
     */
    @Override
    public void afterCompletion(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2,
            Exception arg3) throws Exception {

    }

    /**
     * 
     * Title: postHandle  
     * Description: TODO   
     * @param arg0
     * @param arg1
     * @param arg2
     * @param arg3
     * @throws Exception 
     * @author:  xuBiao   
     * @see org.springframework.web.servlet.HandlerInterceptor#postHandle(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, java.lang.Object, org.springframework.web.servlet.ModelAndView)
     */
    @Override
    public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2,
            ModelAndView arg3) throws Exception {

    }


}
