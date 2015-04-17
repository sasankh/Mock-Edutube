package com.springMvcMongodb.SpringMVCmongoDBTest.home;

import java.security.Principal;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
	/*@RequestMapping(value = "/Id/{id}", method = RequestMethod.GET)
	public String vidById(Model model, @PathVariable String id) {
		model.addAttribute("vidId", id);
		
		return "home/homeNotSignedIn";
	}
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String index(Model model) {
		
		return "home/homeNotSignedIn";
	}*/
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String index(Principal principal) {
		
		return principal != null ? "home/homeSignedIn" : "home/homeNotSignedIn";
	}
	
	@RequestMapping(value = "/about", method = RequestMethod.GET)
	public String aboutPage(Principal principal) {
		
		return "home/about";
	}
	
	@RequestMapping(value = "/contact", method = RequestMethod.GET)
	public String contactPage(Principal principal) {
		
		return "home/contact";
	}
}
