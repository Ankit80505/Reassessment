package com.example.tipboard.controller;

import com.example.tipboard.model.Tip;
import com.example.tipboard.repo.TipRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tips")
public class TipController {
    private final TipRepository repo;

    public TipController(TipRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Tip> list() {
        return repo.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Tip add(@RequestBody Tip tip) {
        return repo.save(tip);
    }

    @PostMapping("/{id}/vote")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void vote(@PathVariable Long id) {
        repo.findById(id).ifPresent(t -> {
            t.setVotes(t.getVotes() + 1);
            repo.save(t);
        });
    }
}


