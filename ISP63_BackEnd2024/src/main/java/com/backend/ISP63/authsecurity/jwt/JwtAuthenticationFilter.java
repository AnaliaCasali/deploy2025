package com.backend.ISP63.authsecurity.jwt;

import com.backend.ISP63.authsecurity.service.JwtService;
import com.backend.ISP63.model.User;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
// para crear filtros personalizados

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;     //OncePerRequestFilter asegura que filtro
    private final UserDetailsService userDetailsService;// se ejecute solo una vez por solicitud http

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                            FilterChain filterChain) throws ServletException, IOException {
        // Excluir las rutas de Swagger del filtro JWT
        String path = request.getServletPath();
        if (path.startsWith("/swagger-ui") || path.startsWith("/v3/api-docs")) {
            filterChain.doFilter(request, response);
            return;}
        // obtengo el token
        final String token = getTokenFromRequest(request);
        final String username;
        if (token==null)
        {   filterChain.doFilter(request, response);
            return;}

/*

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            User user = (User) authentication.getPrincipal();
            if (user.isPasswordChangeRequired() && !request.getRequestURI().equals("/change-password")) {
                response.setStatus(HttpServletResponse.SC_PRECONDITION_FAILED); // 412 Precondition Required
                response.getWriter().write("Cambio de contraseña es requerida.");
                return;
            }
        }
*/
        username=jwtService.getUsernameFromToken(token);// obtengo el username a partir del token
            // si el nombre de usuario no es nulo y está autenticado
        if (username!=null && SecurityContextHolder.getContext().getAuthentication()==null)
        {   UserDetails userDetails=userDetailsService.loadUserByUsername(username);
            if (jwtService.isTokenValid(token, userDetails)) // si token es valido para el user
            {  UsernamePasswordAuthenticationToken authToken= new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities());
                // creo token y devuelvo
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);}
        }
        filterChain.doFilter(request, response);
    }
    private String getTokenFromRequest(HttpServletRequest request) {
        final String authHeader=request.getHeader(HttpHeaders.AUTHORIZATION);
        // Hay que sacar la palabra bearer de la autenticacion
        if(StringUtils.hasText(authHeader) && authHeader.startsWith("Bearer "))
        {return authHeader.substring(7);   }
        return null;
    }
}
