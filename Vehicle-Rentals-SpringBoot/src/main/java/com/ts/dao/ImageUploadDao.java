package com.ts.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ts.model.ImageModel;

@Service
public class ImageUploadDao {
	
	@Autowired
	ImageRepository imageRepository;

//	public List<ImageModel> getAllImages() {
//		return imageRepository.findAll();
//	}
	
}
