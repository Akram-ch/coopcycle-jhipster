package org.coopcycle.com.repository;

import org.coopcycle.com.domain.Conseil;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Conseil entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConseilRepository extends JpaRepository<Conseil, Long> {}
