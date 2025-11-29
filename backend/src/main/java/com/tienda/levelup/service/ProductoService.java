package com.tienda.levelup.service;


import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tienda.levelup.model.Producto;
import com.tienda.levelup.repository.ProductoRepository;

import java.util.List;

@Service
@Transactional

public class ProductoService {
    @Autowired
    private ProductoRepository productoRepository;

    public List<Producto> findAll() {
        return productoRepository.findAll();
    }

    public Producto findById(Integer id) {
        return productoRepository.findById(id).get();
    }

    public Producto save(Producto producto) {
        return productoRepository.save(producto);
    }

    public void delete(Integer id) {
        productoRepository.deleteById(id);
    }

    //public Paciente findById(Integer id) {
    //    return pacienteRepository.findById(id).get();
    //}
}