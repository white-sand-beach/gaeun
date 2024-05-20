package com.todayeat.backend._common.schedule.service;

import com.todayeat.backend.searchKeyword.service.SearchKeywordService;
import com.todayeat.backend.store.service.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ScheduleService {

    private final SearchKeywordService searchKeywordService;
    private final StoreService storeService;

    @Scheduled(cron = "0 0 * * * *")
    public void updatePopularKeywords() {

        searchKeywordService.updatePopularSearchListInRedis();
    }

    @Scheduled(cron = "0 0 0 1 * *")
    public void updateIsExample() {

        storeService.updateAllIsExample();
    }
}
