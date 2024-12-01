const url = "http://52.66.251.143:8000"


function createTipCard(tip, color) {
    const card = document.createElement("div");
    card.classList.add("alert", "alert-"+color)

    const title = document.createElement("h5");
    const hline = document.createElement("hr");
    const content = document.createElement("h6");
    const example = document.createElement("p");

    title.textContent = tip.title;
    content.textContent = tip.content;
    example.textContent = "Eg - " + tip.example;

    card.append(title, hline, content, example);

    return card;
}

function createShortcutCard(shortcut, color) {
    const card = document.createElement("div");
    card.classList.add("alert", "alert-"+color, "p-3")

    const shortcutDiv = document.createElement("div");
    shortcutDiv.classList.add("mx-auto");

    shortcut.keys.forEach((key) => {
        console.log(shortcutDiv.textContent);
        if(shortcutDiv.textContent) {
            shortcutDiv.append("+");
        }
        const btn = document.createElement("button");
        btn.classList.add("btn", "btn-"+color, "p-2", "mx-1");
        btn.style.height = "40px";
        btn.style.minWidth = "40px";
        btn.textContent = key;
        shortcutDiv.append(btn);
    })

    const content = document.createElement("p");
    content.textContent = shortcut.content;
    content.classList.add("mb-0", "mt-2", "mx-2");

    card.append(shortcutDiv);
    card.append(content);
    return card;

}


function showContent(data) {

    const tipsContainer = document.querySelector(".shortcuts-container");
    const shortcutsContainer = document.querySelector(".tips-container");
    
    console.log(tipsContainer);
    console.log(shortcutsContainer);

    const tips = data.tips;
    const shortcuts = data.shortcuts;

    const tipsHeading = document.createElement("h2");
    const shortcutsHeading = document.createElement("h2");

    tipsHeading.textContent = "Tips";
    shortcutsHeading.textContent = "Shortcuts";

    tipsHeading.classList.add("text-center", "mb-4");
    shortcutsHeading.classList.add("text-center", "mb-4");

    tipsContainer.append(tipsHeading);
    shortcutsContainer.append(shortcutsHeading);

    const alertClasses = ["primary", "secondary", "success", "danger", "warning"];

    for(let i=0; i < tips.length; i++) {
        let tip = tips[i];
        let color = alertClasses[i%5];
        tipsContainer.append(createTipCard(tip, color));
    }    

    for(let i=0; i < tips.length; i++) {
        let shortcut = shortcuts[i];
        let color = alertClasses[i%5];
        shortcutsContainer.append(createShortcutCard(shortcut, color));
    }
}



chrome.runtime.sendMessage({action: "getCurrentTabHostname"}, async (response) => {
    if (response) {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json"
            }
        }
        const hostname = response.replace(/^www\./, '')
        const rawResponse = await fetch(`${url}/${hostname}`, options);
        const text = await rawResponse.text()
        if(!text) {
            document.write("No Data Available");
        } else {
            data = JSON.parse(text);
            showContent(data);
        }
    }
});