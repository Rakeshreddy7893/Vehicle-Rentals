//package com.ts.model;
//
//public class ImageModel {
//
//}

package com.ts.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

@Entity
@Table(name = "image_table")
public class ImageModel {

    @Id
    @Column(name = "id")
    @GeneratedValue
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    @Column(name = "category")
    private String category;

    @Lob
    @Column(name = "pic_byte", columnDefinition = "LONGBLOB")
    private byte[] picByte;

    public ImageModel() {
    }

    public ImageModel(String name, String type, byte[] picByte, String category) {
        this.name = name;
        this.type = type;
        this.picByte = picByte;
        this.category = category;
    }

    public ImageModel(Long id, String name, String type, byte[] picByte, String category) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.picByte = picByte;
        this.category = category;
    }

    // Getters and setters for all fields

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
