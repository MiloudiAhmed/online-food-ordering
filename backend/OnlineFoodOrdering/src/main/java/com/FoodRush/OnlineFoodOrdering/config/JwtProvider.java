package com.FoodRush.OnlineFoodOrdering.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Service
public class JwtProvider {

    private SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());

    public String generateToken(Authentication auth){

        Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();
        String roles = populateAuthorities(authorities);

        // Créer le token JWT
        String jwt = Jwts.builder()
                .setIssuedAt(new Date()) // Date de création
                .setExpiration(new Date(new Date().getTime()+86400000)) // Date d'expiration
                .claim("email", auth.getName()) // Ajouter l'email comme claim
                .claim("authorities", roles) // Ajouter les rôles comme claim
                .signWith(key) // Signer le token avec la clé secrète
                .compact();
        return jwt;
    }

    public String getEmailFromJwtToken(String jwt){
        jwt = jwt.substring(7);
        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();

        String email = String.valueOf(claims.get("email"));
        return email;
    }

    private String populateAuthorities(Collection<? extends GrantedAuthority> authorities) {
        // Convertir les autorités en une chaîne de caractères séparée par des virgules
        Set<String> auths = new HashSet<>();
        for (GrantedAuthority authority : authorities) {
            auths.add(authority.getAuthority());
        }
        return String.join(",", auths);
    }


}
