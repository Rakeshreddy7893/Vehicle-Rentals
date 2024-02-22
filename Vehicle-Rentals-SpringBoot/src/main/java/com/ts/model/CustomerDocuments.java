package com.ts.model;

import javax.persistence.*;

@Entity
@Table(name = "customer_documents")
public class CustomerDocuments {

	@Id
	@Column(name = "document_id")
	private String documentId;

	@Column(name = "pic_byte", columnDefinition = "LONGBLOB")
	private byte[] picByte;

	@Column(name = "pan_id")
	private String panId;

	@Column(name = "status")
	private String status;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "customerId")
	private User customer;

	public CustomerDocuments() {

	}

	public String getDocumentId() {
		return documentId;
	}

	public void setDocumentId(String documentId) {
		this.documentId = documentId;
	}

	public byte[] getPicByte() {
		return picByte;
	}

	public void setPicByte(byte[] picByte) {
		this.picByte = picByte;
	}

	public String getPanId() {
		return panId;
	}

	public void setPanId(String panId) {
		this.panId = panId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public User getUser() {
		return customer;
	}

	public void setUser(User customer) {
		this.customer = customer;
	}

}
