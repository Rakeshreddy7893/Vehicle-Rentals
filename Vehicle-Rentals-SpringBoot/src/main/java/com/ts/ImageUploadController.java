package com.ts;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ts.dao.ImageRepository;
import com.ts.model.ImageModel;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "image")
public class ImageUploadController {

    @Autowired
    ImageRepository imageRepository;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(@RequestParam("imageFile") MultipartFile file,
                                        @RequestParam("category") String category) throws IOException {

        System.out.println("Original Image Byte Size - " + file.getBytes().length);
        ImageModel img = new ImageModel();
        img.setName(file.getOriginalFilename());
        img.setType(file.getContentType());
        img.setPicByte(compressBytes(file.getBytes()));
        img.setCategory(category);
        imageRepository.save(img);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping(path = { "/get/{imageName}" })
    public ResponseEntity<ImageModel> getImage(@PathVariable("imageName") String imageName) throws IOException {

        final Optional<ImageModel> retrievedImage = imageRepository.findByName(imageName);
        if (retrievedImage.isPresent()) {
            ImageModel img = new ImageModel(retrievedImage.get().getId(), retrievedImage.get().getName(),
                    retrievedImage.get().getType(), decompressBytes(retrievedImage.get().getPicByte()),
                    retrievedImage.get().getCategory());
            return ResponseEntity.ok(img);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping(path = { "/getAllImages" })
    public ResponseEntity<List<ImageResponse>> getAllImages() {
        List<ImageModel> images = imageRepository.findAll();
        List<ImageResponse> imageResponses = new ArrayList<>();

        for (ImageModel retrievedImage : images) {
            ImageResponse img = new ImageResponse(retrievedImage.getId(), retrievedImage.getName(),
                    retrievedImage.getType(), decompressBytes(retrievedImage.getPicByte()),
                    retrievedImage.getCategory());
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
                    retrievedImage.getType(), decompressBytes(retrievedImage.getPicByte()),
                    retrievedImage.getCategory());
            imageResponses.add(img);
        }

        return ResponseEntity.ok(imageResponses);
    }

    // Other utility methods remain unchanged

    // ImageResponse class definition
    public class ImageResponse {
    	
    	
		private Long id;
        private String name;
        private String type;
        private byte[] picByte;
        private String category;

        // Constructors, getters, and setters

        public ImageResponse(Long id, String name, String type, byte[] picByte, String category) {
            this.id = id;
            this.name = name;
            this.type = type;
            this.picByte = picByte;
            this.category = category;
        }
    	
        public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getType() {
			return type;
		}

		public void setType(String type) {
			this.type = type;
		}

		public byte[] getPicByte() {
			return picByte;
		}

		public void setPicByte(byte[] picByte) {
			this.picByte = picByte;
		}

		public String getCategory() {
			return category;
		}

		public void setCategory(String category) {
			this.category = category;
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
