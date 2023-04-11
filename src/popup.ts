let number = 0;
let numberAsText = "";
let total = 0;

type multiplierList = { title: string, inputValue: string }[];

chrome.tabs?.query({ active: true, currentWindow: true }, async function (tabs) {
    await selectNumber(tabs);
});

document.addEventListener("DOMContentLoaded", async () => {
    await retrieveData();
    await addListeners();
    loadMultiplierContainer();
});

async function addListeners() {
    document.getElementById("add-multiplikator")?.addEventListener("click", () => { addMultiplier() });
    document.getElementById("calculate-total")?.addEventListener("click", () => { calculate() });
}

async function calculate() {
    const multiplierInputs = document.querySelectorAll(".multiplier");

    total = parseFloat(localStorage.getItem('numberAsText'));
    for (let i = 0; i < multiplierInputs.length; i++) {
        const input = multiplierInputs[i] as HTMLInputElement;
        total *= parseFloat(input.value);
    }
    document.getElementById('total').innerHTML = total.toFixed(2).toString();;
}

function addMultiplier(titleSaved?: string, inputSaved?: string) {
    const multiplierFields = document.getElementById("multiplier-fields");

    const title = document.createElement("p")
    title.setAttribute("class", "title")
    title.appendChild(document.createElement("br"))
    const titleElement = document.getElementById("title") as HTMLInputElement;
    title.innerHTML = titleSaved || titleElement.value;
    titleElement.value = "";

    const newMultiplier = document.createElement("input");
    newMultiplier.setAttribute("type", "number");
    newMultiplier.setAttribute("class", "multiplier");
    newMultiplier.value = inputSaved;
    newMultiplier?.addEventListener("input", async () => {
        await calculate();
        saveMultiplierContainer();
    });

    const newRemoveButton = document.createElement("button");
    newRemoveButton.setAttribute("class", "removeButton");
    newRemoveButton?.addEventListener("click", () => { removeMultiplier(newRemoveButton) });
    newRemoveButton.innerHTML = "X";

    const divInputButton = document.createElement("div");
    divInputButton.setAttribute("class", "form-multiplicators")
    divInputButton.appendChild(newMultiplier);
    divInputButton.appendChild(newRemoveButton);

    const div = document.createElement("div");
    div.setAttribute("class", "container")
    div.appendChild(title);
    div.appendChild(divInputButton);
    multiplierFields.appendChild(div);
    multiplierFields.setAttribute("id", "multiplier-fields");
    saveMultiplierContainer();
}

async function removeMultiplier(button: HTMLElement) {
    button.parentElement.parentElement.remove();
    saveMultiplierContainer();
    await calculate();
}

async function selectNumber(tabs: chrome.tabs.Tab[]) {
    chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => window.getSelection()?.toString(),
    }, async function (res) {
        number = await useNumber(res?.[0].result);
        await calculate();
    });
}

async function useNumber(numberAsText: string): Promise<number> {
    numberAsText = numberAsText?.replace(/[^\d,.]/g, "");
    number = parseFloat(numberAsText);
    if (!isNaN(number)) {
        document.getElementById('selected-number').innerHTML = number.toFixed(2).toString();
        window.localStorage.setItem('numberAsText', numberAsText);
    }
    return number;
}

async function retrieveData() {
    if (localStorage.getItem('numberAsText')) {
        number = parseFloat(localStorage.getItem('numberAsText'));
        document.getElementById('selected-number').innerHTML = number.toFixed(2).toString();
        await calculate();
    }
}

function saveMultiplierContainer() {
    const multiplierContainers = document.querySelectorAll(".container");

    const multipliers: multiplierList = [];
    multiplierContainers.forEach((container) => {
        const titleElement: HTMLParagraphElement = container.querySelector(".title")
        const title: string = titleElement.innerText;
        const inputValueElement: HTMLInputElement = container.querySelector(".multiplier")
        const inputValue: string = inputValueElement.value;
        multipliers.push({ title, inputValue });
    });

    chrome.storage.sync.set({ multipliers: multipliers }).then();
}

function loadMultiplierContainer() {
    chrome.storage.sync.get(['multipliers'], async function (result) {
        const list: multiplierList = result.multipliers as multiplierList;
        if (list) {
            for (const multi of list) {
                addMultiplier(multi.title, multi.inputValue);
                await calculate();
            }
        }
    });
}


