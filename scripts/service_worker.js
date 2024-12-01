// async function sendActiveTabURL() { try {
//         const [tab] = await chrome.tabs.query({active: true, currentWindow: true})
//         const url = new URL(tab.url);
//         const hostname = url.hostname;
//         const id = tab.id;
//         if(tab) {
//             chrome.tabs.sendMessage()
//         }
//     } catch (err) {
//         console.log(err);
//     }
// }

// chrome.tabs.onActivated.addListener(
//     sendActiveTabURL
// )

// chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
//     try {
//         if (request.action === "getCurrentTabUrl") {
//             const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
//             const url = new URL(tab.url);
//             const hostname = url.hostname;
//             const id = tab.id;
//             if(tab) {
//                 sendResponse(url);
//             } else {
//                 sendResponse({url: null});
//             }
//         }
//         return true;
//     } catch (err){
//         console.log(err);
//     }
// });

async function getActiveTabUrl() {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tab) {
            const url = new URL(tab.url);
            return url.hostname;
        }
        return null;
    } catch (err) {
        console.error(err);
        return null;
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getCurrentTabHostname") {
        getActiveTabUrl().then(hostName => {
            sendResponse(hostName);
        }).catch(err => {
            console.error(err);
            sendResponse(null);
        });
        return true;
    }
});
