package com.ssafy.alpaca.api.controller;

import com.ssafy.alpaca.api.request.CodeUpdateReq;
import com.ssafy.alpaca.api.service.CodeService;
import com.ssafy.alpaca.api.service.UserService;
import com.ssafy.alpaca.common.etc.BaseResponseBody;
import com.ssafy.alpaca.db.document.Code;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/code")
@RequiredArgsConstructor
public class CodeController {

    private final UserService userService;
    private final CodeService codeService;

    @ApiOperation(
            value = "코드 등록",
            notes = "컴파일한 코드를 저장한다."
    )
    @PostMapping()
    public ResponseEntity<BaseResponseBody> createCode(
            @RequestBody CodeUpdateReq codeUpdateReq) throws IllegalAccessException{
        codeService.createCode(codeUpdateReq);
        return ResponseEntity.ok(BaseResponseBody.of(200,"OK"));
    }

    @ApiOperation(
            value = "코드 조회",
            notes = "유저가 푼 특정 문제의 모든 코드를 조회한다."
    )
    @GetMapping("/{userId/studyId/}")
    public ResponseEntity<List<Code>> getCode(
            @PathVariable Long userId, @RequestParam String problemId) {
        String username = userService.getCurrentUsername();
        return ResponseEntity.ok(codeService.getCode(username, userId, problemId));
    }

}
