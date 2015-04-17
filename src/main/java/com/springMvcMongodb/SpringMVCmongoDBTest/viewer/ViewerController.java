package com.springMvcMongodb.SpringMVCmongoDBTest.viewer;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewerController {
	private String videoTitle = "test";
	
	public String getvideoTitle() {
		return videoTitle;
	}
	
	public void setvideoTitle(String videoTitle) {
		this.videoTitle = videoTitle;
	}

	@RequestMapping(value = "/viewer/ID/{id}", method = RequestMethod.GET)
	public String vidById(Model model, @PathVariable String id) {
		//model.addAttribute("vidId", id);
		
		return "video/viewer";
	}
	
	@RequestMapping(value = "/viewer", method = RequestMethod.GET)
	public String index(Model model) {
		
		return "video/viewer";
	}
}
