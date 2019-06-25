/**
 * @Copyright (C), 2013-2019 www.sino-essence.com Inc. All rights reserved.
 * @Title:    JSONStringObject.java
 * @Package:  com.zdxb.tcmcsm.pks.common.json
 * @Description:   TODO
 * @author:      xuBiao
 * @date:  2019年6月6日 下午5:42:45
 * @Version:   V1.0.0
*/
package com.zdxb.tcmcsm.pks.common.json;

import org.json.JSONString;

/**
 * @ClassName:  JSONStringObject
 * @Description:   TODO
 * @author: xuBiao
 * @date:  2019年6月6日 下午5:42:45
*/
public class JSONStringObject implements JSONString{

    private String jsonString = null;
    
    public JSONStringObject(String jsonString){
        this.jsonString = jsonString;
    }

    @Override
    public String toString(){
        return jsonString;
    }

    public String toJSONString(){
        return jsonString;
    }


}
