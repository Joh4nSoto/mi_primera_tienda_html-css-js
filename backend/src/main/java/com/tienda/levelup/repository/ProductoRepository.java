package com.tienda.levelup.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.tienda.levelup.model.Producto;

@Repository

public interface ProductoRepository extends JpaRepository<Producto, Integer> {

    //List<Paciente> findById(Integer );
}
