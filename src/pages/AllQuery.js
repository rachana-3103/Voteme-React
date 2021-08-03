import React from 'react';

const AllQuery = () => {
    return (
        <div>
            <div class="my-queries">
                <div class="query-tabing">
                    <div class="tab-listing">
                        <ul class="tabbing-nav">
                            <li class="active-tab"><a href="/abc">Recent Queries</a></li>
                            <li><a href="/abc">Top 10 Queries</a></li>
                            <li><a href="/abc">Popular Queries</a></li>
                            <li><a href="/abc">All Queries</a></li>
                        </ul>
                    </div>
                    <div class="tabs-content-cover">
                        <div id="recent-queries" class="tab-content">
                            <div class="tab-content-list">
                                <div class="query-info-box">
                                    <div class="query-head flex-box">
                                        <span class="profile-img"><img src="assets/images/user-placeholder-img.jpg" alt="" /></span>
                                        <div class="about-query-info">
                                            <div class="small-title">John Doe</div>
                                            <div class="query-shared-by">Visiting & Travel, World History, Travel Tips</div>
                                        </div>
                                    </div>
                                    <div class="query-desc">
                                        <h2 class="small-title">Which is place better than Taj Mahal you felt worth to visit in India?</h2>
                                        <ul class="query-options">
                                            <li>A. Ram Setu <span class="opt-a"><span class="graph-line"></span>70%</span></li>
                                            <li>B. Red Fort Delhi <span class="opt-b"><span class="graph-line"></span>15%</span></li>
                                            <li>C. Ganga River <span class="opt-c"><span class="graph-line"></span>10%</span></li>
                                            <li>D. Dwarka <span class="opt-d"><span class="graph-line"></span>05%</span></li>
                                        </ul>
                                    </div>
                                    <div class="query-footer flex-box">
                                        <div class="vote-count">20 Votes</div>
                                        <div class="bottom-right-options">
                                            <span class="like"><img class="outline-icon" src="assets/images/up-arrow-outline.svg" alt="" />
                                                <img class="fill-icon" src="assets/images/up-arrow-fill.svg" alt="" /> 50</span>
                                            <span class="dislike"><img class="outline-icon" src="assets/images/down-arrow-outline.svg" alt="" />
                                                <img class="fill-icon" src="assets/images/down-arrow-fill.svg" alt="" /> 50</span>
                                            <span class="comments"><img src="assets/images/speech-bubble-outline.svg" alt="" /> 50</span>
                                            <span class="viewers"><img src="assets/images/view-outline.svg" alt="" /> 50</span>
                                            <span class="share"><img src="assets/images/share-outline.svg" alt="" /> 50</span>
                                        </div>
                                    </div>
                                    <div class="poll-end-time">Pole End Time 30/09/2020 00:00AM</div>
                                </div>
                                <div class="poll-end-time poll-ended">Poll Ended</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            );
}

            export default AllQuery;
