package org.coopcycle.com.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Restaurant.
 */
@Entity
@Table(name = "restaurant")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Restaurant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "rest_id", nullable = false)
    private Long restId;

    @NotNull
    @Size(min = 3)
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "adress", nullable = false)
    private String adress;

    @Column(name = "theme")
    private String theme;

    @Min(value = 1L)
    @Max(value = 5L)
    @Column(name = "review")
    private Long review;

    @OneToMany(mappedBy = "restaurant")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "client", "restaurant", "livreur" }, allowSetters = true)
    private Set<Panier> paniers = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "conseil", "restaurants", "livreurs", "clients" }, allowSetters = true)
    private Cooperative cooperative;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Restaurant id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRestId() {
        return this.restId;
    }

    public Restaurant restId(Long restId) {
        this.setRestId(restId);
        return this;
    }

    public void setRestId(Long restId) {
        this.restId = restId;
    }

    public String getName() {
        return this.name;
    }

    public Restaurant name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAdress() {
        return this.adress;
    }

    public Restaurant adress(String adress) {
        this.setAdress(adress);
        return this;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    public String getTheme() {
        return this.theme;
    }

    public Restaurant theme(String theme) {
        this.setTheme(theme);
        return this;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    public Long getReview() {
        return this.review;
    }

    public Restaurant review(Long review) {
        this.setReview(review);
        return this;
    }

    public void setReview(Long review) {
        this.review = review;
    }

    public Set<Panier> getPaniers() {
        return this.paniers;
    }

    public void setPaniers(Set<Panier> paniers) {
        if (this.paniers != null) {
            this.paniers.forEach(i -> i.setRestaurant(null));
        }
        if (paniers != null) {
            paniers.forEach(i -> i.setRestaurant(this));
        }
        this.paniers = paniers;
    }

    public Restaurant paniers(Set<Panier> paniers) {
        this.setPaniers(paniers);
        return this;
    }

    public Restaurant addPanier(Panier panier) {
        this.paniers.add(panier);
        panier.setRestaurant(this);
        return this;
    }

    public Restaurant removePanier(Panier panier) {
        this.paniers.remove(panier);
        panier.setRestaurant(null);
        return this;
    }

    public Cooperative getCooperative() {
        return this.cooperative;
    }

    public void setCooperative(Cooperative cooperative) {
        this.cooperative = cooperative;
    }

    public Restaurant cooperative(Cooperative cooperative) {
        this.setCooperative(cooperative);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Restaurant)) {
            return false;
        }
        return id != null && id.equals(((Restaurant) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Restaurant{" +
            "id=" + getId() +
            ", restId=" + getRestId() +
            ", name='" + getName() + "'" +
            ", adress='" + getAdress() + "'" +
            ", theme='" + getTheme() + "'" +
            ", review=" + getReview() +
            "}";
    }
}
