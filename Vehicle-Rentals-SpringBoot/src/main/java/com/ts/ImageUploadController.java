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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ts.dao.ImageRepository;
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
    UserRepository userRepository;
    
    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file,
    		                             @RequestParam("id") String id,
                                         @RequestParam("name") String name,
                                         @RequestParam("category") String category,
                                         @RequestParam("startDate") @DateTimeFormat(pattern="yyyy-MM-dd") Date startDate,
                                         @RequestParam("endDate") @DateTimeFormat(pattern="yyyy-MM-dd") Date endDate,
                                         @RequestParam("pricePerHour") double pricePerHour,
                                         @RequestParam("ownerId") Integer ownerId) throws IOException {

        ImageModel img = new ImageModel();
        img.setId(id);
        img.setName(name);
        img.setCategory(category);
        img.setStartDate(startDate);
        img.setEndDate(endDate);
        img.setPricePerHour(pricePerHour);
        img.setStatus("not approved"); // Default status

        // Get owner from database using ownerId
        Optional<User> ownerOptional = userRepository.findById(ownerId);
        if (ownerOptional.isPresent()) {
            User owner = ownerOptional.get();
            img.setOwner(owner);
            img.setPicByte(compressBytes(file.getBytes()));

            imageRepository.save(img);

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
        List<ImageModel> images = imageRepository.findAllVehicles("approved");
        List<ImageResponse> imageResponses = new ArrayList<>();

        for (ImageModel retrievedImage : images) {
            ImageResponse img = new ImageResponse(retrievedImage.getId(), retrievedImage.getName(),
                    retrievedImage.getCategory(), retrievedImage.getStartDate(),
                    retrievedImage.getEndDate(), retrievedImage.getPricePerHour(),
                    retrievedImage.getOwner(), retrievedImage.getStatus(),
                    decompressBytes(retrievedImage.getPicByte()));
            imageResponses.add(img);
        }

        return ResponseEntity.ok(imageResponses);
    }
    
    @GetMapping(path = { "/getImagesByCategory/{category}" })
    public ResponseEntity<List<ImageResponse>> getImagesByCategory(@PathVariable("category") String category) {
        List<ImageModel> images = imageRepository.findByCategory(category);
        List<ImageResponse> imageResponses = new ArrayList<>();

        for (ImageModel retrievedImage : images) {
            ImageResponse img = new ImageResponse(retrievedImage.getId(), retrievedImage.getName(),
                    retrievedImage.getCategory(), retrievedImage.getStartDate(),
                    retrievedImage.getEndDate(), retrievedImage.getPricePerHour(),
                    retrievedImage.getOwner(), retrievedImage.getStatus(),
                    decompressBytes(retrievedImage.getPicByte()));
            imageResponses.add(img);
        }

        return ResponseEntity.ok(imageResponses);
    } 
    
 // ImageResponse class definition
public class ImageResponse {
    private String id;
    private String name;
    private String category;
    private Date startDate;
    private Date endDate;
    private double pricePerHour;
    private User owner;
    private String status;
    private byte[] picByte;

    // Constructors, getters, and setters

    public ImageResponse(String id, String name, String category, Date startDate, Date endDate, double pricePerHour, User owner, String status, byte[] picByte) {
        this.id = id;
        this.name = name;
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



    // compress and decompress methods remain unchanged
    // compress the image bytes before storing it in the database
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

    // uncompress the image bytes before returning it to the angular application
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
}
