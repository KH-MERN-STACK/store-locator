mapboxgl.accessToken =
	"pk.eyJ1Ijoia2hhbGVkLXJhbWFkYW4iLCJhIjoiY2xwbWs5NTNiMGJoMDJqdDNnYW4wNDlxaCJ9.KGIwrXJg6TI1BMaz6SwD-g"

const map = new mapboxgl.Map({
	container: "map",
	style: "mapbox://style/mapbox/streets-v11",
	zoom: 9,
	center: [31.18244, 30.44852],
})

// Fetch stores from API
async function getStores() {
	const res = await fetch("/api/v1/stores")
	const data = await res.json()

	const stores = data.data.map((store) => {
		return {
			type: "Feature",
			geometry: {
				type: "Point",
				coordinates: store.location.coordinates,
			},
			properties: {
				storeId: store.storeId,
				icon: "shop",
			},
		}
	})

	loadMap(stores)
}

// Load map with stores
function loadMap(stores) {
	map.on("load", () => {
		// Add a data source containing one point feature.
		map.addSource("point", {
			type: "geojson",
			data: {
				type: "FeatureCollection",
				features: stores,
			},
		})

		// Add a layer to use the image to represent the data.
		map.addLayer({
			id: "points",
			type: "symbol",
			source: "point", // reference the data source
			layout: {
				"icon-image": "{icon}-15", // reference the image
				"icon-size": 1.5,
				"text-field": "{storeId}",
				"text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
				"text-offset": [0, 0.9],
				"text-anchor": "top",
			},
		})
	})
}

// loadMap()
getStores()
