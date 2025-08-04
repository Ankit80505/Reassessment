package com.example.tipboard.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
public class Tip {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String text;

    private int votes = 0;

    @Column(updatable = false)
    private Instant createdAt = Instant.now();

    // getters & setters
    public Long getId() { return id; }
    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
    public int getVotes() { return votes; }
    public void setVotes(int votes) { this.votes = votes; }
    public Instant getCreatedAt() { return createdAt; }
}


