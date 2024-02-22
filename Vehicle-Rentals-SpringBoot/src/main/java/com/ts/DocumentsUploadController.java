package com.ts;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ts.dao.DocumentsRepository;
import com.ts.dao.DocumentsUploadDao;
import com.ts.dao.UserRepository;
import com.ts.model.CustomerDocuments;
import com.ts.model.User;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "documents")
public class DocumentsUploadController {

	@Autowired
	DocumentsRepository documentsRepository;

	@Autowired
	DocumentsUploadDao documentsUploadDao;

	@Autowired
	UserRepository userRepository;

	@PostMapping("/upload")
	public boolean uploadCustomerDocuments(@RequestParam("file") MultipartFile file,
			@RequestParam("documentId") String documentId, @RequestParam("panId") String panId,
			@RequestParam("customerId") int customerId) {
		try {

			CustomerDocuments documents = new CustomerDocuments();
			documents.setDocumentId(documentId);
			documents.setPanId(panId);
			documents.setStatus("Not Approved");

			documents.setUser(userRepository.findById(customerId));

			documents.setPicByte(compressBytes(file.getBytes()));
			documentsRepository.save(documents);

			return true;

		} catch (IOException e) {
			return false;
		}
	}

	@GetMapping("/getAllApprovedDocImages")
	public ResponseEntity<List<DocumentResponse>> getAllApprovedImages() {
		List<CustomerDocuments> approvedDocuments = documentsRepository.findAllApprovedDocs("Approved");
		List<DocumentResponse> documentResponses = new ArrayList<>();

		for (CustomerDocuments document : approvedDocuments) {
			DocumentResponse doc = new DocumentResponse(document.getDocumentId(), document.getPanId(),
					document.getUser(), document.getStatus(), decompressBytes(document.getPicByte()));
			documentResponses.add(doc);
		}

		return ResponseEntity.ok(documentResponses);
	}

	@GetMapping("/getAllNotApprovedDocImages")
	public ResponseEntity<List<DocumentResponse>> getAllNotApprovedImages() {
		List<CustomerDocuments> notApprovedDocuments = documentsRepository.findAllNotApprovedDocs("Not Approved");
		List<DocumentResponse> documentResponses = new ArrayList<>();

		for (CustomerDocuments document : notApprovedDocuments) {
			DocumentResponse doc = new DocumentResponse(document.getDocumentId(), document.getPanId(),
					document.getUser(), document.getStatus(), decompressBytes(document.getPicByte()));
			documentResponses.add(doc);
		}

		return ResponseEntity.ok(documentResponses);
	}

	@GetMapping("/getAllDocsToAdmin")
	public ResponseEntity<List<DocumentResponse>> getAllDocumentsToAdmin() {
		List<CustomerDocuments> allDocuments = documentsRepository.findAll();
		List<DocumentResponse> documentResponses = new ArrayList<>();

		for (CustomerDocuments document : allDocuments) {
			DocumentResponse doc = new DocumentResponse(document.getDocumentId(), document.getPanId(),
					document.getUser(), document.getStatus(), decompressBytes(document.getPicByte()));
			documentResponses.add(doc);
		}

		return ResponseEntity.ok(documentResponses);
	}

	@GetMapping(path = { "/updateDocument/{status}/{documentId}" })
	public void updateDocument(@PathVariable("status") String status, @PathVariable("documentId") String documentId)
			throws IOException {
		documentsRepository.updateDocumentStatus(status, documentId);
	}

	@GetMapping(path = { "/customerstatus/{customerId}" })
	public ResponseEntity<DocumentResponse> getDrivingLicenseStatus(@PathVariable("customerId") int customerId) {
		try {
			CustomerDocuments doc = documentsRepository.getDrivingLicenseStatus(customerId);
			if (doc != null) {
				System.out.println("Status is " + doc.getStatus());
				byte[] documentContent = doc.getPicByte();
				if (documentContent != null) {
					DocumentResponse response = new DocumentResponse(doc.getDocumentId(), doc.getPanId(), doc.getUser(),
							doc.getStatus(), decompressBytes(documentContent));
					return ResponseEntity.ok(response);
				} else {
					return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new DocumentResponse());
				}
			} else {

				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new DocumentResponse());
			}
		} catch (Exception e) {

			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new DocumentResponse());
		}
	}

	public static byte[] compressBytes(byte[] data) {
		Deflater deflater = new Deflater();
		deflater.setInput(data);
		deflater.finish();

		ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
		byte[] buffer = new byte[1024];
		while (!deflater.finished()) {
			int count = deflater.deflate(buffer);
			outputStream.write(buffer, 0, count);
		}
		try {
			outputStream.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);

		return outputStream.toByteArray();
	}

	public static byte[] decompressBytes(byte[] data) {
		Inflater inflater = new Inflater();
		inflater.setInput(data);
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
		byte[] buffer = new byte[1024];
		try {
			while (!inflater.finished()) {
				int count = inflater.inflate(buffer);
				outputStream.write(buffer, 0, count);
			}
			outputStream.close();
		} catch (IOException | DataFormatException e) {
			e.printStackTrace();
		}
		return outputStream.toByteArray();
	}

	public class DocumentResponse {
		private String documentId;
		private String panId;
		private User user;
		private String status;
		private byte[] documentContent;

		public DocumentResponse() {
		}

		public DocumentResponse(String documentId, String panId, User user, String status, byte[] documentContent) {
			this.documentId = documentId;
			this.panId = panId;
			this.user = user;
			this.status = status;
			this.documentContent = documentContent;
		}

		public String getDocumentId() {
			return documentId;
		}

		public void setDocumentId(String documentId) {
			this.documentId = documentId;
		}

		public String getPanId() {
			return panId;
		}

		public void setPanId(String panId) {
			this.panId = panId;
		}

		public User getUser() {
			return user;
		}

		public void setUser(User user) {
			this.user = user;
		}

		public String getStatus() {
			return status;
		}

		public void setStatus(String status) {
			this.status = status;
		}

		public byte[] getDocumentContent() {
			return documentContent;
		}

		public void setDocumentContent(byte[] documentContent) {
			this.documentContent = documentContent;
		}
	}

}