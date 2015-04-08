package com.springMvcMongodb.SpringMVCmongoDBTest.viewer;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewerController {
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public String vidById(Model model, @PathVariable String id) {
		model.addAttribute("vidId", id);
		
		return "video/viewer";
	}
	
	/*@RequestMapping(value = "/viewer/Id/", method = RequestMethod.GET)
	public String vidById(Model model, @PathVariable String id) {
		//model.addAttribute("vidId", id);
		
		return "video/viewer/Id/";
	}*/
	
	@RequestMapping(value = "/viewer", method = RequestMethod.GET)
	public String index(Model model) {
		
		return "video/viewer";
	}
}
