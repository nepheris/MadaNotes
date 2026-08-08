(()=>{
const svg=(body,viewBox='0 0 24 24',cls='ui-svg')=>`<svg class="${cls}" viewBox="${viewBox}" aria-hidden="true" focusable="false">${body}</svg>`;
const I={
 anchor:svg('<path d="M12 2.8a2.4 2.4 0 1 1 0 4.8 2.4 2.4 0 0 1 0-4.8Zm0 4.8v12.8M7.4 10.1H4.7c.4 5.5 3.2 9 7.3 9.9 4.1-.9 6.9-4.4 7.3-9.9h-2.7M8.2 16.2 12 20.4l3.8-4.2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>'),
 help:svg('<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M9.8 9a2.35 2.35 0 0 1 4.55.82c0 1.65-1.15 2.2-2.03 2.82-.67.47-.82.91-.82 1.61" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="11.5" cy="17.2" r="1" fill="currentColor"/>'),
 top:svg('<path d="m6 14 6-6 6 6M12 8v10" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>'),
 more:svg('<circle cx="6" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="18" cy="12" r="1.6" fill="currentColor"/>'),
 reset:svg('<path d="M6.4 8.2H3.7V5.5M4.1 8.1A8 8 0 1 1 4.7 17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>'),
 external:svg('<path d="M13.5 5H19v5.5M19 5l-8 8M17 13.5V19H5V7h5.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>'),
 close:svg('<path d="m7 7 10 10M17 7 7 17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'),
 menu:svg('<path d="M5 7h14M5 12h14M5 17h14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>'),
 lockClosed:svg('<path d="M7 10V7a5 5 0 0 1 10 0v3h1.2A1.8 1.8 0 0 1 20 11.8v8.4a1.8 1.8 0 0 1-1.8 1.8H5.8A1.8 1.8 0 0 1 4 20.2v-8.4A1.8 1.8 0 0 1 5.8 10H7Zm2 0h6V7a3 3 0 0 0-6 0v3Z" fill="currentColor"/>'),
 lockOpen:svg('<path d="M17 10h1.2A1.8 1.8 0 0 1 20 11.8v8.4a1.8 1.8 0 0 1-1.8 1.8H5.8A1.8 1.8 0 0 1 4 20.2v-8.4A1.8 1.8 0 0 1 5.8 10H15V7a3 3 0 0 0-5.7-1.3L7.5 4.8A5 5 0 0 1 17 7v3Z" fill="currentColor"/>'),
 foldDefault:svg('<path d="M4 4h16L4 20Z" fill="currentColor" opacity=".9"/><path d="M20 4v16H4Z" fill="currentColor" opacity=".28"/><rect x="3.5" y="3.5" width="17" height="17" rx="3" fill="none" stroke="currentColor" stroke-width="1"/>'),
 foldOpen:svg('<path d="M12 4 5.5 11h4.2v9h4.6v-9h4.2L12 4Z" fill="currentColor"/>'),
 foldClosed:svg('<path d="m12 20 6.5-7h-4.2V4H9.7v9H5.5l6.5 7Z" fill="currentColor"/>')
};
window.MadaNotesIcons=Object.freeze(I);
})();