//
//package com.ts.model;
//
//import javax.persistence.Column;
//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.Id;
//import javax.persistence.Lob;
//import javax.persistence.Table;
//
//@Entity
//@Table(name = "image_table")
//public class ImageModel {
//
//    @Id
//    @Column(name = "id")
//    @GeneratedValue
//    private Long id;
//
//    @Column(name = "name")
//    private String name;
//
//    @Column(name = "type")
//    private String type;
//
//    @Column(name = "category")
//    private String category;
//
//    @Lob
//    @Column(name = "pic_byte", columnDefinition = "LONGBLOB")
//    private byte[] picByte;
//
//    public ImageModel() {
//    }
//
//    public ImageModel(String name, String type, byte[] picByte, String category) {
//        this.name = name;
//        this.type = type;
//        this.picByte = picByte;
//        this.category = category;
//    }
//
//    public ImageModel(Long id, String name, String type, byte[] picByte, String category) {
//        this.id = id;
//        this.name = name;
//        this.type = type;
//        this.picByte = picByte;
//        this.category = category;
//    }
//
//    // Getters and setters for all fields
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public String getType() {
//        return type;
//    }
//
//    public void setType(String type) {
//        this.type = type;
//    }
//
//    public byte[] getPicByte() {
//        return picByte;
//    }
//
//    public void setPicByte(byte[] picByte) {
//        this.picByte = picByte;
//    }
//
//    public String getCategory() {
//        return category;
//    }
//
//    public void setCategory(String category) {
//        this.category = category;
//    }
//}

package com.ts.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "vehicle_images")
public class ImageModel {

    @Id
    @Column(name = "vehicle_id")
    private String id;

    @Column(name = "vehicle_name")
    private String name;

    @Column(name = "category")
    private String category;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

    @Column(name = "price_per_hour")
    private double pricePerHour;

    @ManyToOne
    @JoinColumn(name = "owner_id") 
    private User owner;

    @Column(name = "status")
    private String status;

    @Lob
    @Column(name = "pic_byte", columnDefinition = "LONGBLOB")
    private byte[] picByte;

    public ImageModel() {
        this.status = "not approved"; // Default status
    }

    public ImageModel(String name, byte[] picByte, String category, Date startDate, Date endDate, double pricePerHour, User owner, String status) {
        this.name = name;
        this.picByte = picByte;
        this.category = category;
        this.startDate = startDate;
        this.endDate = endDate;
        this.pricePerHour = pricePerHour;
        this.owner = owner;
        this.status = status;
    }

    public ImageModel(String id, String name, byte[] picByte, String category, Date startDate, Date endDate, double pricePerHour, User owner, String status) {
        this.id = id;
        this.name = name;
        this.picByte = picByte;
        this.category = category;
        this.startDate = startDate;
        this.endDate = endDate;
        this.pricePerHour = pricePerHour;
        this.owner = owner;
        this.status = status;
    }

    // Getters and setters for all fields

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
