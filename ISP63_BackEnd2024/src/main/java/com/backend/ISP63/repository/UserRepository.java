package com.backend.ISP63.repository;

import com.backend.ISP63.enums.Role;
import com.backend.ISP63.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,String> {
    Optional<User> findByUsername(String username);
    Optional<User> findById(String dni);  // Método para encontrar un usuario por DNI

    @Query("SELECT u.email FROM User u WHERE u.dni = :dni")
    Optional<String> findEmailById(@Param("dni") String dni);
    List<User> findByRol(Role rol);
    List<User> findByRolIn(List<String> rol);

}
