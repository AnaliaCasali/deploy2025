package com.backend.ISP63.authsecurity.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String SECRET_KEY;

    @Value("${jwt.expiration}")
    private Long EXPIRATION;

    // JWT_TIME_VALIDITY  = 1000 * 60 * 60 * 2;// 2 hs
    public String getToken(UserDetails user) {// agrego datos al payload del jwt: rol y dni
        Map<String,Object> datosPayload = new HashMap<String,Object>();
        datosPayload.put("rol",user.getAuthorities().stream().map(GrantedAuthority::getAuthority)
                                        .findFirst().orElse(null));
        datosPayload.put("dni",user.getUsername().substring(5));
        return getToken( datosPayload, user); }

    private String getToken(Map<String,Object> datosPayload, UserDetails user) {
        return Jwts.builder() // construyo el jwt con tds los datos
                    .setClaims(datosPayload)   // el mapa de payload(rol y dni)
                    .setSubject(user.getUsername()) // nombre de usuario
                    .setIssuedAt(new Date(System.currentTimeMillis())) // fechas
                    .setExpiration(new Date(System.currentTimeMillis()+EXPIRATION)) //2hs
                    .signWith(getKey(), SignatureAlgorithm.HS256) // firma
                    .compact();}

    private Key getKey() {
       byte[] keyBytes= Decoders.BASE64.decode(SECRET_KEY);
       return Keys.hmacShaKeyFor(keyBytes);
    }
    public String getUsernameFromToken(String token) {
        return getClaim(token, Claims::getSubject);
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username=getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername())&& !isTokenExpired(token));
    }

    private Claims getAllClaims(String token)
    {
        return Jwts
            .parserBuilder()
            .setSigningKey(getKey())
            .build()
            .parseClaimsJws(token)
            .getBody();
    }

    public <T> T getClaim(String token, Function<Claims,T> claimsResolver)
    {
        final Claims claims=getAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Date getExpiration(String token)
    {
        return getClaim(token, Claims::getExpiration);
    }

    private boolean isTokenExpired(String token)
    {
        return getExpiration(token).before(new Date());
    }
    
}
