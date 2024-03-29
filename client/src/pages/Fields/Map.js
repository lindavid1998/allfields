import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
	width: '100%',
	height: '400px',
	borderRadius: '20px',
};

const center = {
	lat: 25.42112306116134,
	lng: 51.49081941534451,
};

const API_KEY = process.env.REACT_APP_API_KEY;

const Markers = ({ markers }) => {
	return markers.map((marker, index) => (
		<Marker
			key={index}
			position={{
				lat: parseFloat(marker.latitude),
				lng: parseFloat(marker.longitude),
			}}
			clickable={true}
			label={{ text: String(index + 1), color: '#ffffff', fontSize: '18px' }}
		/>
	));
};

const Map = ({ markers }) => {
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: API_KEY,
	});

	const [map, setMap] = useState(null);

	const onLoad = useCallback(function callback(map) {
		const bounds = new window.google.maps.LatLngBounds(center);
		map.fitBounds(bounds);

		setMap(map);
	}, []);

	const onUnmount = useCallback(function callback(map) {
		setMap(null);
	}, []);

	useEffect(() => {
		if (map) {
			if (markers.length === 0) {
				map.setOptions({ center: center, zoom: 15 })
				return
			}

			const bounds = new window.google.maps.LatLngBounds();

			markers.forEach((marker) => {
				bounds.extend({
					lat: parseFloat(marker.latitude),
					lng: parseFloat(marker.longitude),
				});
			});

			map.fitBounds(bounds);

			if (markers.length === 1) {
				map.setOptions({ maxZoom: 13 });
			}
		}
	}, [map, markers]);

	return isLoaded ? (
		<GoogleMap
			mapContainerStyle={containerStyle}
			center={center}
			zoom={10}
			onLoad={onLoad}
			onUnmount={onUnmount}
			maxZoom={10}
			id='google-map'
		>
			<Markers markers={markers}></Markers>
		</GoogleMap>
	) : (
		<></>
	);
};

export default Map;
