/**
 * @Copyright (C), 2013-2019 www.sino-essence.com Inc. All rights reserved.
 * @Title:    InitStrcutureApplication.java
 * @Package:  com.zdxb.tcmcsm.pks
 * @Description:   TODO
 * @author:      xuBiao
 * @date:  2019年6月2日 下午7:49:36
 * @Version:   V1.0.0
*/
package com.zdxb.tcmcsm.pks;

import java.io.PrintStream;
import java.nio.charset.Charset;
import java.util.List;

import org.springframework.boot.Banner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ImportResource;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.core.env.Environment;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zdxb.tcmcsm.pks.system.LoginInterceptor;

/**
 * @ClassName:  InitStrcutureApplication
 * @Description:   启动项
 * @author: xuBiao
 * @date:  2019年6月2日 下午7:49:36
*/
@EnableTransactionManagement
@ImportResource("classpath:spring*.xml")
@ComponentScan
@SpringBootApplication
@ServletComponentScan
public class InitStrcutureApplication extends WebMvcConfigurerAdapter implements Banner{
	


    /**
     * 
     * @Title: main
     * @Description: TODO
     * @param args
     * @author: xuBiao
     */
    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(InitStrcutureApplication.class);
        app.setBannerMode(Banner.Mode.CONSOLE);
        app.setWebEnvironment(true);
        app.run(args);
    }

    /**
     * 
     * Title: printBanner  
     * Description: TODO   
     * @param arg0
     * @param arg1
     * @param arg2 
     * @author:  xuBiao   
     * @see org.springframework.boot.Banner#printBanner(org.springframework.core.env.Environment, java.lang.Class, java.io.PrintStream)
     */
    @Override
    public void printBanner(Environment arg0, Class<?> arg1, PrintStream arg2) {
    }

    /**
     * 
     * Title: addInterceptors  
     * Description: TODO   
     * @param registry 
     * @author:  xuBiao   
     * @see org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter#addInterceptors(org.springframework.web.servlet.config.annotation.InterceptorRegistry)
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoginInterceptor()).addPathPatterns("/**");
    }

    /**
     * 
     * @Title: characterEncodingFilter
     * @Description: TODO
     * @return
     * @author: xuBiao
     */
    @Bean
    @Order(Ordered.HIGHEST_PRECEDENCE)
    CharacterEncodingFilter characterEncodingFilter() {
        CharacterEncodingFilter filter = new CharacterEncodingFilter();
        filter.setEncoding("UTF-8");
        filter.setForceEncoding(true);
        return filter;
    }

    /**
     * 
     * @Title: responseBodyConverter
     * @Description: TODO
     * @return
     * @author: xuBiao
     */
    @Bean
    public HttpMessageConverter<String> responseBodyConverter() {
        StringHttpMessageConverter converter = new StringHttpMessageConverter(
                Charset.forName("UTF-8"));
        return converter;
    }

    /**
     * 
     * Title: configureMessageConverters  
     * Description: TODO   
     * @param converters 
     * @author:  xuBiao   
     * @see org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter#configureMessageConverters(java.util.List)
     */
    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        super.configureMessageConverters(converters);
        converters.add(responseBodyConverter());
    }

    /**
     * 
     * Title: configureContentNegotiation  
     * Description: TODO   
     * @param configurer 
     * @author:  xuBiao   
     * @see org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter#configureContentNegotiation(org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer)
     */
    @Override
    public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
        configurer.favorPathExtension(false);
    }

   /**
    * 
    * @Title: messageConverter
    * @Description: TODO
    * @return
    * @author: xuBiao
    */
    @Bean
    public MappingJackson2HttpMessageConverter messageConverter() {
        MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
        converter.setObjectMapper(getObjectMapper());
        return converter;
    }

    /**
     * 
     * @Title: getObjectMapper
     * @Description: TODO
     * @return
     * @author: xuBiao
     */
    @Bean
    public ObjectMapper getObjectMapper() {
        return new ObjectMapper();
    }



}
