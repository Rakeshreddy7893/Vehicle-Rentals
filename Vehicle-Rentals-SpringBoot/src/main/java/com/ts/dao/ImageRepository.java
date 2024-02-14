package com.ts.dao;

import java.util.List;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


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

	@Query("from ImageModel where owner.userId = :ownerId")
	List<ImageModel> findByOwnerId(@Param("ownerId") int ownerId);
	
    @Transactional
    @Modifying
    @Query("update ImageModel set status = :status where id = :id")
    void updateImageStatus(@Param("status") String status, @Param("id") String id);
	
//	@Modifying
//	@Query("update ImageModel set status = :status where id = :id")
//	void updateImageStatus(@Param("status") String status, @Param("id") String id);
	
	@Query("from ImageModel where status = :status")
	List<ImageModel> findAllNotApprovedVehicles(@Param("status") String status);

}
