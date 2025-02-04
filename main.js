import "./styles.css";

const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const response = await fetch("http://localhost:3000/dream", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            prompt: data.get("prompt"),
        }),
    });

    if (response.ok) {
        showSpinner();
        const { image } = await response.json();
        const result = document.querySelector("#result");
        hideSpinner();
        result.innerHTML = `<img src="${image}" width=512 />`;
    } else {
        const err = await response.text();
        alert(err);
        console.log(err);
    }
});

function showSpinner() {
    const button = document.querySelector("button");
    button.disabled = true;
    button.innerHTML = 'Dreaming... <span class="spinner">🧠</span>';
}

function hideSpinner() {
    const button = document.querySelector("button");
    button.disabled = false;
    button.innerHTML = "Dream";
}
