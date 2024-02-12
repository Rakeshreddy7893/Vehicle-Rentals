package com.ts.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ts.model.ImageModel;

@Repository
public interface ImageRepository extends JpaRepository<ImageModel, String> {
	Optional<ImageModel> findByName(String name);
	
	@Query("from ImageModel where category = :category")
	List<ImageModel> findByCategory(@Param("category") String category);
	
	@Query("from ImageModel where colour = :colour")
	List<ImageModel> findByColour(@Param("colour") String colour);
	
	@Query("from ImageModel where seats = :seats")
	List<ImageModel> findBySeats(@Param("seats") String seats);
	
	@Query("from ImageModel where model = :model")
	List<ImageModel> findByModel(@Param("model") String model);
	
	@Query("from ImageModel where status = :status")
	List<ImageModel> findAllVehicles(@Param("status") String status);

}
