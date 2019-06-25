/**
 * @Copyright (C), 2013-2019 www.sino-essence.com Inc. All rights reserved.
 * @Title:    CharacterEncodingFilter.java
 * @Package:  com.zdxb.tcmcsm.pks
 * @Description:   TODO
 * @author:      xuBiao
 * @date:  2019年6月2日 下午7:49:21
 * @Version:   V1.0.0
*//*
package com.zdxb.tcmcsm.pks;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;

*//**
 * @ClassName: CharacterEncodingFilter
 * @Description: 过滤器，设置编码集
 * @author: xuBiao
 * @date: 2019年6月2日 下午7:49:21
 *//*

@Component
@WebFilter(urlPatterns = "/*", filterName = "CharacterEncodingFilter")
public class CharacterEncodingFilter implements Filter{

	*//**
	 * 
	 * @Title: init
	 * @Description: TODO
	 * @param filterConfig
	 * @throws ServletException
	 * @author: xuBiao
	 *//*
	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
	}

	*//**
	 * 
	 * @Title: doFilter
	 * @Description: TODO
	 * @param servletRequest
	 * @param servletResponse
	 * @param filterChain
	 * @throws IOException
	 * @throws ServletException
	 * @author: xuBiao
	 *//*
	@Override
	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
			throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) servletRequest;
		HttpServletResponse response = (HttpServletResponse) servletResponse;
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		filterChain.doFilter(request, response);
	}

	*//**
	 * 
	 * @Title: destroy
	 * @Description: TODO
	 * @author: xuBiao
	 *//*
	@Override
	public void destroy() {
	}

}
*/