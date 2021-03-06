package com.ssafy.alpaca.api.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.time.OffsetDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScheduleReq {

    @ApiModelProperty( name = "studyId", example = "1" )
    private Long studyId;

    @ApiModelProperty( name = "startedAt", example = "2022-04-12T10:32:44Z")
    private OffsetDateTime startedAt;

    @ApiModelProperty( name = "finishedAt", example = "2022-04-15T11:32:44Z")
    private OffsetDateTime finishedAt;

    @ApiModelProperty( name = "toSolveProblems", example = "[1000, 1001]")
    private List<Long> toSolveProblems;

}
