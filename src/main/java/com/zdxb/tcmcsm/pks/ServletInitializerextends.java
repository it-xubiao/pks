/**
 * @Copyright (C), 2013-2019 www.sino-essence.com Inc. All rights reserved.
 * @Title:    ServletInitializer.java
 * @Package:  com.zdxb.tcmcsm.pks
 * @Description:   TODO
 * @author:      xuBiao
 * @date:  2019年6月2日 下午7:49:52
 * @Version:   V1.0.0
*/
package com.zdxb.tcmcsm.pks;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;


/**
 * @ClassName:  ServletInitializer
 * @Description:   TODO
 * @author: xuBiao
 * @date:  2019年6月2日 下午7:49:52
*/
public class ServletInitializerextends extends SpringBootServletInitializer{
    
   /**
    * 
    * Title: configure  
    * Description: TODO   
    * @param application
    * @return 
    * @author:  xuBiao   
    * @see org.springframework.boot.web.support.SpringBootServletInitializer#configure(org.springframework.boot.builder.SpringApplicationBuilder)
    */
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(InitStrcutureApplication.class);
    }

}

