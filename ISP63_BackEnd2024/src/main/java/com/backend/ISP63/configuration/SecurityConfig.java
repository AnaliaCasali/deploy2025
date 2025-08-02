package com.backend.ISP63.configuration;

import com.backend.ISP63.authsecurity.jwt.JwtAuthenticationFilter;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authProvider;

    private static final String[] WHITE_LIST_URL = {
            "/auth/**",
            "/upload/**",
            "/v1/api-docs/**",
            "/v2/api-docs/**",
            "/v3/api-docs",
            "/v3/api-docs/**",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui/**",
            "/swagger/**",
            "/webjars/**",
            "/swagger-ui.html"
    };

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())  // Deshabilitar CSRF
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))  // Habilitar CORS
                .authorizeHttpRequests(authRequest ->
                        authRequest/*
                                .requestMatchers("/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs/**").permitAll()  // Swagger público
                                .requestMatchers(HttpMethod.OPTIONS).permitAll()  // Permitir OPTIONS
                                .requestMatchers("/upload/**").permitAll()
                                .requestMatchers("/auth/imagenes/archivo/**").permitAll()
                                .requestMatchers("/auth/**").permitAll()  // Autenticación pública
                                .requestMatchers("/api/**").authenticated()  // Proteger todas las rutas /api/**
                                .anyRequest().authenticated()) */
                                .requestMatchers(WHITE_LIST_URL)
                                .permitAll()
                                .anyRequest()
                                .authenticated())// Proteger cualquier otra solicitud
                .sessionManagement(sessionManager -> sessionManager
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))  // Sesiones sin estado
                .authenticationProvider(authProvider)  // Proveedor de autenticación
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)  // Filtro JWT
                .build();
        /* hay que Deshabilitar la protección
        csrf que habilita por defecto sprintboot
        csrf  significa cross side request forget es una medida de seguridad que se
        utiliza para agregar a las solicitudes post autenticación basada en un token  csrf válido.
         */    }

    // Configurar CORS
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://ies63lastoscas.edu.ar"));  // Origen permitido (Angular)
        configuration.setAllowedOrigins(Arrays.asList("http://ies63lastoscas.edu.ar:8080"));  // Origen permitido (Angular)
        configuration.setAllowedOrigins(Arrays.asList("https://ies63lastoscas.edu.ar"));  // Origen permitido (Angular)
        configuration.setAllowedOrigins(Arrays.asList("http://149.50.145.229:4200"));  // Origen permitido (Angular)
        configuration.setAllowedOrigins(Arrays.asList("http://149.50.145.229:8080"));  // Origen permitido (Angular)
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));  // Origen permitido (Angular)
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        configuration.setExposedHeaders(Arrays.asList("Authorization"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);  // Aplicar CORS para todas las rutas
        return source;
    }
}

// user es usuario por defecto




