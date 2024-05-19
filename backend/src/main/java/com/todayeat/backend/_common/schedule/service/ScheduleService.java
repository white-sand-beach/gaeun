package com.todayeat.backend._common.schedule.service;

import com.todayeat.backend.searchKeyword.service.SearchKeywordService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ScheduleService {

    private final SearchKeywordService searchKeywordService;

    @Scheduled(cron = "0 0 * * * *")
    public void updatePopularKeywords() {

        searchKeywordService.updatePopularSearchListInRedis();
    }
}
