package com.ts.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ts.model.ImageModel;

@Service
public class ImageUploadDao {

	@Autowired
	ImageRepository imageRepository;

	public List<ImageModel> getAllImagesToAdmin() {
		return imageRepository.findAll();
	}

	public void deleteImageById(String id) {
		imageRepository.deleteById(id);
	}

}
