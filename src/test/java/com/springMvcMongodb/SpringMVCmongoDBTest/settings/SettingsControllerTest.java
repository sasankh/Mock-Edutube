package com.springMvcMongodb.SpringMVCmongoDBTest.settings;

import org.junit.Test;

import static org.hamcrest.Matchers.allOf;
import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.equalTo;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.springMvcMongodb.SpringMVCmongoDBTest.config.WebAppConfigurationAware;

public class SettingsControllerTest extends WebAppConfigurationAware {
    @Test
    public void displaysCreateForm() throws Exception {
        mockMvc.perform(get("/settings"))
                .andExpect(view().name("settings/adminSettings"))
                .andExpect(content().string(
                        allOf(
                                containsString("<form id=\"userCreate\">"),
                                containsString("<input type=\"text\" name=\"firstName\" id=\"firstName\""),
                                containsString("<input type=\"text\" name=\"lastName\" id=\"lastName\""),
                                containsString("<input type=\"text\" name=\"email\" id=\"email\""),
                                containsString("<input type=\"password\" name=\"password\" id=\"password\""),
                                containsString("<input type=\"text\" name=\"classMod\" id=\"classMod\""),
                                containsString("<input type=\"text\" name=\"classes\" id=\"classes\"")
                        ))
                );
    }
    
    @Test
    public void displaysRedirect() throws Exception {
    	mockMvc.perform(get("/signup"))
		        .andExpect(model().attributeExists("signupForm"))
		        .andExpect(view().name("signup/signup"))
		        .andExpect(content().string(
		                allOf(
		                        containsString("<title>Signup</title>"),
		                        containsString("<legend>Please Sign Up</legend>")
                        ))
                );
    }
}