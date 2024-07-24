function deepClone(obj:any) {
    return JSON.parse(JSON.stringify(obj));
}

export default function createGeoJSON(featuresArray:any) {
    const features = featuresArray.map((feature:any) => {
        // Deep clone the feature object to avoid mutating the original data
        const properties = deepClone(feature);

        // Extract latitude and longitude
        const { id, latitude, longitude} = feature;

        // Create GeoJSON Feature object
        return {
            id: id,
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [longitude, latitude ]
            },
            properties: properties
            };
    });

    // Create a GeoJSON FeatureCollection
    const geojson = {
        type: "FeatureCollection",
        features: features
    };

    return features;
}