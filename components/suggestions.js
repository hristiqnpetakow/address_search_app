// Рендиране на предложенията
export function renderSuggestions(container, suggestions, onSelect) {
  container.innerHTML = "";
  let index = -1;

  suggestions.forEach((suggestion) => {
    const div = document.createElement("div");
    div.textContent = suggestion.text;
    div.classList.add("suggestion-item");

    div.addEventListener("click", () => {
      onSelect(suggestion);
    });

    container.appendChild(div);
  });
}
