/**
 * @author mohitraghuvanshi
 * Date 06/05/22
 **/
package com.stackroute.pickyourslotwebapp;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebAppController {


    public String webapp(){
        return "index.html";
    }

    @GetMapping("/pickyourslotwebapp")
    public String test(){
        return "Hello World";
    }

}
