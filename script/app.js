import {
  fetchSuggest,
  fetchAddressCandidates,
} from "/services/arcgisGeocoder.js";
import { debounce } from "/components/debounce.js";
import { renderSuggestions } from "/components/suggestions.js";
import { renderResults } from "/components/results.js";

const input = document.getElementById("address");
const suggestionsContainer = document.getElementById("suggestions-container");
const resultsContainer = document.getElementById("results-container");
const loading = document.getElementById("loading");
let index = -1;

function showLoading() {
  loading.style.display = "block";
}

function hideLoading() {
  loading.style.display = "none";
}

async function onSuggestionSelect(selected) {
  input.value = selected.text;
  suggestionsContainer.innerHTML = "";

  showLoading();

  const results = await fetchAddressCandidates(
    selected.text,
    selected.magicKey,
  );

  hideLoading();

  renderResults(resultsContainer, results);
}

input.addEventListener("input", () => {
  if (input.value.trim()) {
    showLoading();
  } else {
    hideLoading();
    suggestionsContainer.innerHTML = "";
  }
});

input.addEventListener(
  "input",
  debounce(async () => {
    const query = input.value.trim();

    if (!query) {
      suggestionsContainer.innerHTML = "";
      return;
    }

    const suggestions = await fetchSuggest(query);

    hideLoading();

    renderSuggestions(suggestionsContainer, suggestions, async (selected) => {
      input.value = selected.text;
      suggestionsContainer.innerHTML = "";

      const results = await fetchAddressCandidates(
        selected.text,
        selected.magicKey,
      );

      renderResults(resultsContainer, results, onSuggestionSelect);
    });
  }, 500),
);

// Навигация в списъка чрез клавиатурата
input.addEventListener("keydown", async (e) => {
  const items = suggestionsContainer.querySelectorAll(".suggestion-item");

  if (e.key === "Enter" && index === -1) {
    e.preventDefault();

    const query = input.value.trim();
    if (!query) return;

    suggestionsContainer.innerHTML = "";
    showLoading();

    const results = await fetchAddressCandidates(query);

    hideLoading();
    renderResults(resultsContainer, results);
    return;
  }

  if (!items.length) return;

  if (e.key === "ArrowDown") {
    index = (index + 1) % items.length;
  }

  if (e.key === "ArrowUp") {
    index = (index - 1 + items.length) % items.length;
  }

  if (e.key === "Enter" && index >= 0) {
    e.preventDefault();
    items[index].click();
    return;
  }

  items.forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });
});
