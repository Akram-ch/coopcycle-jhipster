package org.coopcycle.com.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.coopcycle.com.domain.Conseil;
import org.coopcycle.com.repository.ConseilRepository;
import org.coopcycle.com.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link org.coopcycle.com.domain.Conseil}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ConseilResource {

    private final Logger log = LoggerFactory.getLogger(ConseilResource.class);

    private static final String ENTITY_NAME = "conseil";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ConseilRepository conseilRepository;

    public ConseilResource(ConseilRepository conseilRepository) {
        this.conseilRepository = conseilRepository;
    }

    /**
     * {@code POST  /conseils} : Create a new conseil.
     *
     * @param conseil the conseil to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new conseil, or with status {@code 400 (Bad Request)} if the conseil has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/conseils")
    public ResponseEntity<Conseil> createConseil(@Valid @RequestBody Conseil conseil) throws URISyntaxException {
        log.debug("REST request to save Conseil : {}", conseil);
        if (conseil.getId() != null) {
            throw new BadRequestAlertException("A new conseil cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Conseil result = conseilRepository.save(conseil);
        return ResponseEntity
            .created(new URI("/api/conseils/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /conseils/:id} : Updates an existing conseil.
     *
     * @param id the id of the conseil to save.
     * @param conseil the conseil to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated conseil,
     * or with status {@code 400 (Bad Request)} if the conseil is not valid,
     * or with status {@code 500 (Internal Server Error)} if the conseil couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/conseils/{id}")
    public ResponseEntity<Conseil> updateConseil(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Conseil conseil
    ) throws URISyntaxException {
        log.debug("REST request to update Conseil : {}, {}", id, conseil);
        if (conseil.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, conseil.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!conseilRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Conseil result = conseilRepository.save(conseil);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, conseil.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /conseils/:id} : Partial updates given fields of an existing conseil, field will ignore if it is null
     *
     * @param id the id of the conseil to save.
     * @param conseil the conseil to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated conseil,
     * or with status {@code 400 (Bad Request)} if the conseil is not valid,
     * or with status {@code 404 (Not Found)} if the conseil is not found,
     * or with status {@code 500 (Internal Server Error)} if the conseil couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/conseils/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Conseil> partialUpdateConseil(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Conseil conseil
    ) throws URISyntaxException {
        log.debug("REST request to partial update Conseil partially : {}, {}", id, conseil);
        if (conseil.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, conseil.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!conseilRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Conseil> result = conseilRepository
            .findById(conseil.getId())
            .map(existingConseil -> {
                if (conseil.getDirecteur() != null) {
                    existingConseil.setDirecteur(conseil.getDirecteur());
                }

                return existingConseil;
            })
            .map(conseilRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, conseil.getId().toString())
        );
    }

    /**
     * {@code GET  /conseils} : get all the conseils.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of conseils in body.
     */
    @GetMapping("/conseils")
    public List<Conseil> getAllConseils(@RequestParam(required = false) String filter) {
        if ("cooperative-is-null".equals(filter)) {
            log.debug("REST request to get all Conseils where cooperative is null");
            return StreamSupport
                .stream(conseilRepository.findAll().spliterator(), false)
                .filter(conseil -> conseil.getCooperative() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Conseils");
        return conseilRepository.findAll();
    }

    /**
     * {@code GET  /conseils/:id} : get the "id" conseil.
     *
     * @param id the id of the conseil to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the conseil, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/conseils/{id}")
    public ResponseEntity<Conseil> getConseil(@PathVariable Long id) {
        log.debug("REST request to get Conseil : {}", id);
        Optional<Conseil> conseil = conseilRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(conseil);
    }

    /**
     * {@code DELETE  /conseils/:id} : delete the "id" conseil.
     *
     * @param id the id of the conseil to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/conseils/{id}")
    public ResponseEntity<Void> deleteConseil(@PathVariable Long id) {
        log.debug("REST request to delete Conseil : {}", id);
        conseilRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
