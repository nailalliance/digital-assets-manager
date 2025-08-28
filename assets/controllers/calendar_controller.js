import { Controller } from '@hotwired/stimulus';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

export default class extends Controller {
    static targets = ["calendar", "downloadForm", "assetIdsInput", "brandFilter"];

    connect() {
        this.calendar = new Calendar(this.calendarTarget, {
            plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
            initialView: 'dayGridMonth',
            headerToolbar: {
                left: 'prev,next today addAllToBag',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            // Use a function for events to dynamically build the URL
            events: (fetchInfo, successCallback, failureCallback) => {
                const brandId = this.brandFilterTarget.value;
                let url = `/admin/social-calendar/feed?start=${fetchInfo.startStr}&end=${fetchInfo.endStr}`;
                if (brandId) {
                    url += `&brand_id=${brandId}`;
                }

                fetch(url)
                    .then(response => response.json())
                    .then(data => successCallback(data))
                    .catch(error => failureCallback(error));
            },
            // Add this eventClick handler
            eventClick: (info) => {
                // Get the post ID from the event object
                const postId = info.event.id;
                if (postId) {
                    // Redirect the user to the edit page for that post
                    window.location.href = `/admin/social-media/posts/${postId}/edit`;
                }
            },
            customButtons: {
                addAllToBag: {
                    text: 'Add All to Bag',
                    click: () => {
                        const events = this.calendar.getEvents();
                        let allAssetIds = [];

                        events.forEach(event => {
                            if (event.extendedProps.assetIds) {
                                allAssetIds.push(...event.extendedProps.assetIds);
                            }
                        });

                        if (allAssetIds.length > 0) {
                            this.assetIdsInputTarget.value = [...new Set(allAssetIds)].join(',');
                            this.downloadFormTarget.submit();
                        } else {
                            alert('There are no assets to add in the current view.');
                        }
                    }
                }
            }
        });

        this.calendar.render();
    }

    // This action is called when the brand filter changes
    filter() {
        this.calendar.refetchEvents();
    }
}
