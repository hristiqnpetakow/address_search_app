// Конфигурация за ArcGIS World Geocoding Service
const API_KEY =
  "AAPTxy8BH1VEsoebNVZXo8HurFJZbDcnN2iezJXdM0gNQ3809T8LkjwTG0Nk9CxdX0t47QsAJhvo5JkVUN4N5I9-0OvYv6x8Xwshci2vOtshDBLWU4VaXK-D9DGksZrfzsam_yv0iG-lsrwqkOxrtc6044v2IVNBOg7UAgjZI5LiBo1VFdP49OpKrI4m_1GdJHOh7S8lgsUYT-8uXRH1JEts-30BO1tqnuDHa-4JoNs5uKY.AT1_n47ISZGI";
const BASE_URL =
  "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer";

export async function fetchSuggest(text) {
  const url = `${BASE_URL}/suggest?f=json&text=${encodeURIComponent(
    text,
  )}&countryCode=BGR&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.suggestions || [];
  } catch (error) {
    console.log("Грешка при suggets API: ", error);
    return [];
  }
}

export async function fetchAddressCandidates(text, magicKey = "") {
  const url = `${BASE_URL}/findAddressCandidates?f=json&SingleLine=${encodeURIComponent(
    text,
  )}&magicKey=${encodeURIComponent(
    magicKey,
  )}&countryCode=BGR&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.candidates || [];
  } catch (error) {
    console.error("Грешка при findAddressCandidates API:", error);
    return [];
  }
}
