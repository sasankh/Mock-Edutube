package com.springMvcMongodb.SpringMVCmongoDBTest.settings;

import java.security.Principal;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SettingsController {
	/*@RequestMapping(value = "/Id/{id}", method = RequestMethod.GET)
	public String vidById(Model model, @PathVariable String id) {
		model.addAttribute("vidId", id);
		
		return "home/homeNotSignedIn";
	}
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String index(Model model) {
		
		return "home/homeNotSignedIn";
	}*/
	
	@RequestMapping(value = "/settings", method = RequestMethod.GET)
	public String index(Principal principal) {
		
		return principal != null ? "settings/adminSettings" : "signin/signin";
	}
}