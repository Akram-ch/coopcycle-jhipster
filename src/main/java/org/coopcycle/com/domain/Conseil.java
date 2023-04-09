package org.coopcycle.com.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Conseil.
 */
@Entity
@Table(name = "conseil")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Conseil implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "directeur", nullable = false)
    private String directeur;

    @JsonIgnoreProperties(value = { "conseil", "restaurants", "livreurs", "clients" }, allowSetters = true)
    @OneToOne(mappedBy = "conseil")
    private Cooperative cooperative;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Conseil id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDirecteur() {
        return this.directeur;
    }

    public Conseil directeur(String directeur) {
        this.setDirecteur(directeur);
        return this;
    }

    public void setDirecteur(String directeur) {
        this.directeur = directeur;
    }

    public Cooperative getCooperative() {
        return this.cooperative;
    }

    public void setCooperative(Cooperative cooperative) {
        if (this.cooperative != null) {
            this.cooperative.setConseil(null);
        }
        if (cooperative != null) {
            cooperative.setConseil(this);
        }
        this.cooperative = cooperative;
    }

    public Conseil cooperative(Cooperative cooperative) {
        this.setCooperative(cooperative);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Conseil)) {
            return false;
        }
        return id != null && id.equals(((Conseil) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Conseil{" +
            "id=" + getId() +
            ", directeur='" + getDirecteur() + "'" +
            "}";
    }
}
