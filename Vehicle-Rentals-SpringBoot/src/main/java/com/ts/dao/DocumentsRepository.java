package com.ts.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.ts.model.CustomerDocuments;

@Repository
public interface DocumentsRepository extends JpaRepository<CustomerDocuments, String>{
    @Transactional
    @Modifying
    @Query("update CustomerDocuments set status = :status where documentId = :documentId")
    void updateDocumentStatus(@Param("status") String status, @Param("documentId") String documentId);

    @Query("from CustomerDocuments where status = :status")
	List<CustomerDocuments> findAllApprovedDocs(@Param("status") String status);

	@Query("from CustomerDocuments where status = :status")
	List<CustomerDocuments> findAllNotApprovedDocs(@Param("status") String status);
	
//    @Query("SELECT cd FROM CustomerDocuments cd JOIN cd.customer c WHERE c.userId = :customerId")
//    CustomerDocuments isCustomerDocPresent(@Param("customerId") int customerId);
    
    @Query("SELECT cd FROM CustomerDocuments cd JOIN cd.customer c WHERE c.userId = :customerId")
    CustomerDocuments getDrivingLicenseStatus(@Param("customerId") int customerId);
    
//    @Query("SELECT cd.status FROM CustomerDocuments cd WHERE cd.customer.userId = :customerId")
//    String getDrivingLicenseStatus(@Param("customerId") int customerId);

    
//    @Query("SELECT cd.status FROM CustomerDocuments cd JOIN cd.user u WHERE u.userId = :customerId")
//    String getDrivingLicenseStatus(@Param("customerId") int customerId);


//    @Query("SELECT cd FROM CustomerDocuments cd JOIN cd.customer c WHERE c.userId = :customerId")
//    CustomerDocuments getDrivingLicenseStatus(@Param("customerId") int customerId);

//	@Query("from CustomerDocuments where user.userId = :customerId")
//	CustomerDocuments isCustomerDocPresent(@Param("customerId") int customerId);
//
//	@Query("from CustomerDocuments where user.userId = :customerId")
//	CustomerDocuments getDrivingLicenseStatus(@Param("customerId") int customerId);
}