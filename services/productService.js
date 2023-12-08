export async function fetchProducts(baseUrl, searchTerm = "") {
  let url = baseUrl;
  if (searchTerm) {
    url += `/search?SearchTerm=${searchTerm}`;
  }
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error("Fetch error:", response.statusText);
      return [];
    }
    return await response.json();
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
}
