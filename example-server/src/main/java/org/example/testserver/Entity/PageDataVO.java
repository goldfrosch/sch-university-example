package org.example.testserver.Entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class PageDataVO<T> {
    private List<T> list;

    private Long lastOffset;

    private boolean hasNext;
}
