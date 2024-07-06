const clearBtn = document.querySelector("#clear");
const display = document.querySelector("#display");

console.log(clearBtn);

clearBtn.addEventListener("click", () => {
    display.textContent = "";
})