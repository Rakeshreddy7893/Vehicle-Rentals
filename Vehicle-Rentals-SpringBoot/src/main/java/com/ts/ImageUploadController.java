package com.ts;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ts.dao.ImageRepository;
import com.ts.dao.ImageUploadDao;
import com.ts.dao.UserRepository;
import com.ts.model.ImageModel;
import com.ts.model.User;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "image")
public class ImageUploadController {

	@Autowired
	ImageRepository imageRepository;

	@Autowired
	private JavaMailSender mailSender;

	@Autowired
	ImageUploadDao imageUploadDao;

	@Autowired
	UserRepository userRepository;

	@PostMapping("/upload")
	public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file, @RequestParam("id") String id,
			@RequestParam("name") String name, @RequestParam("colour") String colour,
			@RequestParam("seats") String seats, @RequestParam("model") String model,
			@RequestParam("category") String category,
			@RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
			@RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate,
			@RequestParam("pricePerHour") double pricePerHour, @RequestParam("ownerId") Integer ownerId)
			throws IOException {

		ImageModel img = new ImageModel();
		img.setId(id);
		img.setName(name);
		img.setColour(colour);
		img.setSeats(seats);
		img.setModel(model);
		img.setCategory(category);
		img.setStartDate(startDate);
		img.setEndDate(endDate);
		img.setPricePerHour(pricePerHour);
		img.setStatus("Not Approved");

		String ownerEmail;
		String vehicleMessage = "";

		Optional<User> ownerOptional = userRepository.findById(ownerId);
		if (ownerOptional.isPresent()) {
			User owner = ownerOptional.get();
			ownerEmail = owner.getEmail();
			img.setOwner(owner);
			img.setPicByte(compressBytes(file.getBytes()));
			
			imageRepository.save(img);
			
			vehicleMessage = vehicleMessage + "VehicleId : " + img.getId() + "\n" + "VehicleName : " + img.getName()
					+ "\n" + "Colour : " + img.getColour() + "\n" + "Seats : " + img.getSeats() + "\n" + "Model : "
					+ img.getModel() + "\n" + "Category : " + img.getCategory() + "\n" + "StartDate : "
					+ img.getStartDate() + "\n" + "EndDate : " + img.getEndDate() + "\n" + "PricePerDay : "
					+ img.getPricePerHour() + "\n" + "Status : " + img.getStatus() + "\n" + "OwnerId : "
					+ owner.getUserId() + "\n\n\n"
					+ "Sir/Madam we received your vehicle upload request onto our website. We will inform you shortly regarding approval status";
			sendUploadEmail(ownerEmail, vehicleMessage);

			return ResponseEntity.status(HttpStatus.OK).build();
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Owner with ID " + ownerId + " not found.");
		}
	}

	@GetMapping(path = { "/get/{imageName}" })
	public ResponseEntity<ImageResponse> getImage(@PathVariable("imageName") String imageName) throws IOException {

		final Optional<ImageModel> retrievedImage = imageRepository.findByName(imageName);
		if (retrievedImage.isPresent()) {
			ImageResponse img = new ImageResponse(retrievedImage.get().getId(), retrievedImage.get().getName(),
					retrievedImage.get().getColour(), retrievedImage.get().getSeats(), retrievedImage.get().getModel(),
					retrievedImage.get().getCategory(), retrievedImage.get().getStartDate(),
					retrievedImage.get().getEndDate(), retrievedImage.get().getPricePerHour(),
					retrievedImage.get().getOwner(), retrievedImage.get().getStatus(),
					decompressBytes(retrievedImage.get().getPicByte()));
			return ResponseEntity.ok(img);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping(path = { "/getAllImages" })
	public ResponseEntity<List<ImageResponse>> getAllImages() {
		List<ImageModel> images = imageRepository.findAllVehicles("Approved");
		List<ImageResponse> imageResponses = new ArrayList<>();

		for (ImageModel retrievedImage : images) {
			ImageResponse img = new ImageResponse(retrievedImage.getId(), retrievedImage.getName(),
					retrievedImage.getColour(), retrievedImage.getSeats(), retrievedImage.getModel(),
					retrievedImage.getCategory(), retrievedImage.getStartDate(), retrievedImage.getEndDate(),
					retrievedImage.getPricePerHour(), retrievedImage.getOwner(), retrievedImage.getStatus(),
					decompressBytes(retrievedImage.getPicByte()));
			imageResponses.add(img);
		}

		return ResponseEntity.ok(imageResponses);
	}

	@GetMapping(path = { "/getAllNotApprovedImages" })
	public ResponseEntity<List<ImageResponse>> getAllNotApprovedImages() {
		List<ImageModel> images = imageRepository.findAllNotApprovedVehicles("Not Approved");
		List<ImageResponse> imageResponses = new ArrayList<>();

		for (ImageModel retrievedImage : images) {
			ImageResponse img = new ImageResponse(retrievedImage.getId(), retrievedImage.getName(),
					retrievedImage.getColour(), retrievedImage.getSeats(), retrievedImage.getModel(),
					retrievedImage.getCategory(), retrievedImage.getStartDate(), retrievedImage.getEndDate(),
					retrievedImage.getPricePerHour(), retrievedImage.getOwner(), retrievedImage.getStatus(),
					decompressBytes(retrievedImage.getPicByte()));
			imageResponses.add(img);
		}

		return ResponseEntity.ok(imageResponses);
	}

	@GetMapping(path = { "/getAllImagesToAdmin" })
	public ResponseEntity<List<ImageResponse>> getAllImagesToAdmin() {
		List<ImageModel> images = imageUploadDao.getAllImagesToAdmin();
		List<ImageResponse> imageResponses = new ArrayList<>();

		for (ImageModel retrievedImage : images) {
			ImageResponse img = new ImageResponse(retrievedImage.getId(), retrievedImage.getName(),
					retrievedImage.getColour(), retrievedImage.getSeats(), retrievedImage.getModel(),
					retrievedImage.getCategory(), retrievedImage.getStartDate(), retrievedImage.getEndDate(),
					retrievedImage.getPricePerHour(), retrievedImage.getOwner(), retrievedImage.getStatus(),
					decompressBytes(retrievedImage.getPicByte()));
			imageResponses.add(img);
		}

		return ResponseEntity.ok(imageResponses);
	}

	@PutMapping("/updateSingleImage")
	public void updateSingleImage(@RequestParam("id") String id, @RequestParam("name") String name,
			@RequestParam("colour") String colour, @RequestParam("seats") String seats,
			@RequestParam("model") String model, @RequestParam("category") String category,
			@RequestParam("pricePerHour") double pricePerHour) {
		imageRepository.updateSingleImage(id, name, colour, seats, model, category, pricePerHour);
	}

	@GetMapping(path = { "/updateImage/{status}/{id}/{ownerId}" })
	public void updateImage(@PathVariable("status") String status, @PathVariable("id") String id,
			@PathVariable("ownerId") int ownerId) throws IOException {
		
		imageRepository.updateImageStatus(status, id);

		User ownerOptional = userRepository.findById(ownerId);
		String email = ownerOptional.getEmail();

		if(status.equalsIgnoreCase("Approved"))sendApprovalEmail(email, "Your vehicle with Id : "+id+" is Successfully Approved....!");
		else sendApprovalEmail(email, "Your vehicle with Id : "+id+" is  Removed from the website....!");
	}
	
	@GetMapping(path = { "/sendPaymentMail/{email}/{id}" })
	public void sendPaymentMail(@PathVariable("email") String email, @PathVariable("id") String id) throws IOException {
		
		System.out.println("Email : "+email+" id : "+id);
		sendApprovalEmail(email, "Vehicle with Id : "+id+" is booked successfully....!");

	}

	@DeleteMapping(path = { "/deleteImage/{id}" })
	public boolean deleteImageById(@PathVariable String id) {
		imageUploadDao.deleteImageById(id);
		return true;
	}

	@GetMapping(path = { "/getImagesByCategory/{category}" })
	public ResponseEntity<List<ImageResponse>> getImagesByCategory(@PathVariable("category") String category) {
		List<ImageModel> images = imageRepository.findByCategory(category);
		List<ImageResponse> imageResponses = new ArrayList<>();

		for (ImageModel retrievedImage : images) {
			ImageResponse img = new ImageResponse(retrievedImage.getId(), retrievedImage.getName(),
					retrievedImage.getColour(), retrievedImage.getSeats(), retrievedImage.getModel(),
					retrievedImage.getCategory(), retrievedImage.getStartDate(), retrievedImage.getEndDate(),
					retrievedImage.getPricePerHour(), retrievedImage.getOwner(), retrievedImage.getStatus(),
					decompressBytes(retrievedImage.getPicByte()));
			imageResponses.add(img);
		}

		return ResponseEntity.ok(imageResponses);
	}

	@GetMapping(path = { "/getAllImagesByOwnerId/{ownerId}" })
	public ResponseEntity<List<ImageResponse>> getAllImagesByOwnerId(@PathVariable("ownerId") int ownerId) {
		List<ImageModel> images = imageRepository.findByOwnerId(ownerId);
		List<ImageResponse> imageResponses = new ArrayList<>();

		for (ImageModel retrievedImage : images) {
			ImageResponse img = new ImageResponse(retrievedImage.getId(), retrievedImage.getName(),
					retrievedImage.getColour(), retrievedImage.getSeats(), retrievedImage.getModel(),
					retrievedImage.getCategory(), retrievedImage.getStartDate(), retrievedImage.getEndDate(),
					retrievedImage.getPricePerHour(), retrievedImage.getOwner(), retrievedImage.getStatus(),
					decompressBytes(retrievedImage.getPicByte()));
			imageResponses.add(img);
		}

		return ResponseEntity.ok(imageResponses);
	}

	public class ImageResponse {
		private String id;
		private String name;
		private String colour;
		private String seats;
		private String model;
		private String category;
		private Date startDate;
		private Date endDate;
		private double pricePerHour;
		private User owner;
		private String status;
		private byte[] picByte;

		public ImageResponse(String id, String name, String colour, String seats, String model, String category,
				Date startDate, Date endDate, double pricePerHour, User owner, String status, byte[] picByte) {
			this.id = id;
			this.name = name;
			this.colour = colour;
			this.seats = seats;
			this.model = model;
			this.category = category;
			this.startDate = startDate;
			this.endDate = endDate;
			this.pricePerHour = pricePerHour;
			this.owner = owner;
			this.status = status;
			this.picByte = picByte;
		}

		public String getId() {
			return id;
		}

		public void setId(String id) {
			this.id = id;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getColour() {
			return colour;
		}

		public void setColour(String colour) {
			this.colour = colour;
		}

		public String getSeats() {
			return seats;
		}

		public void setSeats(String seats) {
			this.seats = seats;
		}

		public String getModel() {
			return model;
		}

		public void setModel(String model) {
			this.model = model;
		}

		public String getCategory() {
			return category;
		}

		public void setCategory(String category) {
			this.category = category;
		}

		public Date getStartDate() {
			return startDate;
		}

		public void setStartDate(Date startDate) {
			this.startDate = startDate;
		}

		public Date getEndDate() {
			return endDate;
		}

		public void setEndDate(Date endDate) {
			this.endDate = endDate;
		}

		public double getPricePerHour() {
			return pricePerHour;
		}

		public void setPricePerHour(double pricePerHour) {
			this.pricePerHour = pricePerHour;
		}

		public User getOwner() {
			return owner;
		}

		public void setOwner(User owner) {
			this.owner = owner;
		}

		public String getStatus() {
			return status;
		}

		public void setStatus(String status) {
			this.status = status;
		}

		public byte[] getPicByte() {
			return picByte;
		}

		public void setPicByte(byte[] picByte) {
			this.picByte = picByte;
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
	
	private void sendApprovalEmail(String email, String text) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(email);
		message.setSubject("Welcome to VEHICLE-HOST-HUB");
		message.setText(text);

		mailSender.send(message);
	}

	private void sendUploadEmail(String email, String text) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(email);
		message.setSubject("Welcome to VEHICLE-HOST-HUB");
		message.setText(text);

		mailSender.send(message);
	}

}
