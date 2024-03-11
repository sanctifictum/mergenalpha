const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const mapContainer = document.getElementById('map');
const poiDetails = document.getElementById('poi-details');

// Replace with your actual Leaflet map initialization code
const map = L.map(mapContainer).setView([51.505, -0.09], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Placeholder function to simulate selecting a POI
function showPOIDetails(poi) {
  // You can update this to display details based on your data structure
  poiDetails.style.display = 'block';
  poiDetails.innerHTML = `<h2>${poi.name}</h2><p>${poi.description}</p>`;
}

function searchPOI(searchTerm) {
  // Replace with the actual Nominatim API URL and parameters
  const url = new URL('https://nominatim.openstreetmap.org/search');
  url.searchParams.set('q', searchTerm);
  url.searchParams.set('format', 'json'); // Request JSON format

  fetch(url)
      .then(response => response.json())
      .then(data => {
          const firstResult = data[0]; // Assuming the first result is relevant
          if (firstResult) {
              const location = firstResult.lat; // Extract latitude
              const longitude = firstResult.lon; // Extract longitude
              map.setView([location, longitude], 15); // Center map on found location
          } else {
              alert("No location found for your search term.");
          }
      })
      .catch(error => {
          console.error("Error searching location:", error);
          alert("An error occurred during the search. Please try again later.");
      });
}

// Add event listener for Enter key press on search input
searchInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    const searchTerm = searchInput.value;
    searchPOI(searchTerm);
  }
});

// Keep the search button event listener for click functionality
searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value;
  searchPOI(searchTerm);
});
