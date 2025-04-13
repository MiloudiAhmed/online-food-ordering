package com.FoodRush.OnlineFoodOrdering.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.util.List;

@Data
@Embeddable
//Cette annotation indique que la classe RestaurantDto
// est une classe embarquée. Cela signifie qu'elle ne
// représente pas une entité autonome, mais qu'elle peut
// être incluse dans une autre entité JPA
public class RestaurantDto {

    private String title;

    @Column(length = 1000)
    //Column utilise pour specifier les détails
    // de la colonne dans la base de données
    // (par exemple, la longueur maximale d'une chaîne de caractères).
    private List<String> images;

    private String description;

    private Long id;
}
