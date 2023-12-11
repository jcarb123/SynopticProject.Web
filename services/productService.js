export async function fetchProducts(searchTerm = "") {
  let url =
    "https://thamco-product-catalogue-api-live.azurewebsites.net/api/v1.0/Products";
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
