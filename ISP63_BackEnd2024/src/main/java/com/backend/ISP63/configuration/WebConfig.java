package com.backend.ISP63.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${upload.path}")
    private String uploadPath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:" + uploadPath + "/");

    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/api/**")
                    .allowedOrigins("http://ies63lastoscas.edu.ar") // Ajusta esto al origen del frontend
                    .allowedOrigins("http://ies63lastoscas.edu.ar:8080") // Ajusta esto al origen del frontend
                    .allowedOrigins("https://ies63lastoscas.edu.ar") // Ajusta esto al origen del frontend
                    .allowedOrigins("http://149.50.145.229:4200") // Ajusta esto al origen del frontend
                    .allowedOrigins("http://149.50.145.229:8080") // Ajusta esto al origen del frontend
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH")
                    .allowedHeaders("*")
                    .allowCredentials(true);
        }


}


