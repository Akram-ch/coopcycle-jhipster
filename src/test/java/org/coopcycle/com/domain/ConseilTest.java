package org.coopcycle.com.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.coopcycle.com.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ConseilTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Conseil.class);
        Conseil conseil1 = new Conseil();
        conseil1.setId(1L);
        Conseil conseil2 = new Conseil();
        conseil2.setId(conseil1.getId());
        assertThat(conseil1).isEqualTo(conseil2);
        conseil2.setId(2L);
        assertThat(conseil1).isNotEqualTo(conseil2);
        conseil1.setId(null);
        assertThat(conseil1).isNotEqualTo(conseil2);
    }
}
