package com.ts.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DocumentsUploadDao {

	@Autowired
	DocumentsRepository documentsRepository;
}
