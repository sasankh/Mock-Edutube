package com.springMvcMongodb.SpringMVCmongoDBTest.dashboard;

import java.security.Principal;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class DashboardController {
	@RequestMapping(value = "/dashboard", method = RequestMethod.GET)
	public String index(Principal principal) {
		
		return principal != null ? "dashboard/dashboard" : "signin/signin";
	}
}