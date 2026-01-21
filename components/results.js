// Рендира резултатите от търсенето
function renderResults(container, results) {
  const resultsTitle = document.getElementById("results-title");
  const arrowRes = document.getElementById("arrow-res");
  const uniqueResults = removeDuplicateAddresses(results);

  container.innerHTML = "";

  if (uniqueResults.length === 0) {
    resultsTitle.classList.add("hidden");
    arrowRes.classList.add("hidden");
    container.textContent = "Няма намерени резултати";
    return;
  }

  resultsTitle.classList.remove("hidden");
  arrowRes.classList.remove("hidden");

  uniqueResults.forEach((res) => {
    const div = document.createElement("div");
    div.textContent = `${res.address} (Score: ${res.score})`;
    div.classList.add("result-item");
    container.appendChild(div);
  });
}

function removeDuplicateAddresses(results) {
  const seen = new Set();

  return results.filter((item) => {
    if (seen.has(item.address)) {
      return false;
    }
    seen.add(item.address);
    return true;
  });
}
