import React from 'react';
import { Navigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import Container from '../../components/common/Container';
import Button from '../../components/common/Button';
import Fields from '../../components/forms/Fields';
import Icon from '../../components/common/Icon';
import { Modal, DeleteModal } from '../../components/common/Modal';
import { showToast } from '../../components/common/Toast';
import CanvasToolbar from '../../components/layout/generic/CanvasToolbar';
import {
  INITIAL_TRACKING_DATA,
  getEffectiveCoordinates,
} from './trackingData';
import { useCurrentUser, canAccessPage, hasPermission, getFirstAllowedRoute } from '../../utils';

/* --- Single unified Location Card --- */
const LocationCard = React.memo(({ item, isSelected, onSelect, onDelete, isDrillable }) => (
  <div
    onClick={() => onSelect(item)}
    className={`p-10 rounded-5 mb-5 cursor-pointer transition-all ${isSelected ? 'bg-primary' : 'bg-white hover:bg-slate-50'
      }`}
    style={{
      border: `0.5px solid ${isSelected ? 'var(--forth)' : 'var(--white)'}`,
    }}
  >
    <div className="flex items-center gap-10 overflow-hidden">
      <div className="w-15 flex-shrink-0">
        <div
          className={`icon-lg rounded-5 flex items-center justify-center ${isSelected ? 'bg-white' : 'bg-forth'
            }`}
        >
          <p className="font-600 para-text text-primary">
            {item.displayIndex}
          </p>
        </div>
      </div>

      <div className="w-85 min-w-0 flex-1">
        <h6 className={`font-600 headmini-text line-clamp1 ${isSelected ? 'text-white' : 'text-dark'}`}>
          {item.name || item.title}
        </h6>
        <p className={`font-400 mini-text line-clamp1 mt-2 ${isSelected ? 'text-white opacity-90' : 'text-gray'}`}>
          {item.subtitle}
        </p>
      </div>

      {isDrillable ? (
        <div className="flex items-center gap-6 pr-4">
          {onDelete && item.isCustomPinned && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(item);
              }}
              className={`border-0 bg-transparent p-4 cursor-pointer rounded-4 opacity-60 hover:opacity-100 ${isSelected ? 'text-white' : 'text-gray hover:text-danger'
                }`}
              title="Remove Location"
            >
              <Icon name="Trash" width="13" height="13" stroke="currentColor" />
            </button>
          )}
          <Icon
            name="ChevronRight"
            width="14"
            height="14"
            stroke={isSelected ? '#ffffff' : '#94a3b8'}
          />
        </div>
      ) : onDelete ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(item);
          }}
          className={`border-0 bg-transparent p-4 cursor-pointer rounded-4 opacity-60 hover:opacity-100 ${isSelected ? 'text-white' : 'text-gray hover:text-danger'
            }`}
          title="Remove Stop"
        >
          <Icon name="Trash" width="13" height="13" stroke="currentColor" />
        </button>
      ) : null}
    </div>
  </div>
));
LocationCard.displayName = 'LocationCard';

/* --- Route Legend --- */
const RouteLegend = React.memo(({ level }) => {
  const legendLabel =
    level === 'city' ? 'Top Cities' : level === 'state' ? 'States' : level === 'country' ? 'Countries' : null;

  return (
    <div
      className="grid-cols-1 bg-white rounded-8 p-12 z-999 bottom-0 left-0 m-12 b-shadow rounded-5 absolute"
      style={{ minWidth: 150 }}
    >
      <h6 className="font-600 text-dark headmini-text">Route legend</h6>
      <div className="flex items-center gap-8 mt-4">
        <div className="w-10 flex justify-center">
          <span style={{ width: 16, height: 3, background: '#2563eb', borderRadius: 2 }} />
        </div>
        <p className="mini-text text-gray">Journey Path</p>
      </div>

      {level === 'detail' ? (
        <>
          <div className="flex items-center gap-8 mt-4">
            <div className="w-10 flex justify-center">
              <span style={{ width: 8, height: 8, background: '#2563eb', borderRadius: '50%' }} />
            </div>
            <p className="mini-text text-gray">Suppliers</p>
          </div>
          <div className="flex items-center gap-8 mt-4">
            <div className="w-10 flex justify-center">
              <span style={{ width: 8, height: 8, background: '#db5e1f', borderRadius: '50%' }} />
            </div>
            <p className="mini-text text-gray">Vendors</p>
          </div>
        </>
      ) : (
        <div className="flex items-center gap-8 mt-4">
          <div className="w-10 flex justify-center">
            <span
              style={{
                width: 8,
                height: 8,
                background: level === 'city' ? '#2563eb' : '#db5e1f',
                borderRadius: '50%',
              }}
            />
          </div>
          <p className="mini-text text-gray">{legendLabel}</p>
        </div>
      )}
    </div>
  );
});
RouteLegend.displayName = 'RouteLegend';

/* --- Helper for Custom Marker DivIcon --- */
const createMarkerIcon = (item, isSelected) =>
  L.divIcon({
    className: 'custom-journey-marker-container',
    html: `
            <div style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer; pointer-events: auto;">
                <div style="
                    background: #ffffff;
                    padding: 4px 12px;
                    border-radius: 6px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.12);
                    border: 1px solid ${isSelected ? '#3b82f6' : '#e2e8f0'};
                    text-align: center;
                    white-space: nowrap;
                    margin-bottom: 6px;
                    transition: all 0.2s ease;
                    transform: ${isSelected ? 'scale(1.05)' : 'scale(1)'};
                ">
                    <div style="font-weight: 600; font-size: 11px; color: #0f172a; line-height: 14px;">${item.name || item.title}</div>
                    <div style="font-size: 8.5px; color: #64748b; line-height: 11px;">${item.role || item.badge || ''}</div>
                </div>
                <div style="
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: ${item.color || '#2563eb'};
                    color: #ffffff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    font-size: 10.5px;
                    border: 2px solid #ffffff;
                    box-shadow: 0 0 0 ${isSelected ? '3px #2563eb' : '2px rgba(0,0,0,0.15)'};
                    transition: all 0.2s ease;
                ">
                    ${item.displayIndex}
                </div>
            </div>
        `,
    iconSize: [140, 64],
    iconAnchor: [70, 64],
  });

/* --- Main Location Component --- */
const Location = () => {
  const { user, role } = useCurrentUser();
  const isAuthorized = canAccessPage(user || role, "Location") || hasPermission(user || role, "view_location");

  const mapContainerRef = React.useRef(null);
  const mapInstanceRef = React.useRef(null);
  const markersRef = React.useRef([]);
  const polylinesRef = React.useRef([]);

  const [trackingData, setTrackingData] = React.useState(INITIAL_TRACKING_DATA);
  const [selectedCountry, setSelectedCountry] = React.useState(null);
  const [selectedState, setSelectedState] = React.useState(null);
  const [selectedCity, setSelectedCity] = React.useState(null);
  const [selectedStopId, setSelectedStopId] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState('all');
  const [search, setSearch] = React.useState('');
  const [isPinMode, setIsPinMode] = React.useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = React.useState(false);
  const [pendingPin, setPendingPin] = React.useState(null);
  const [stopToDelete, setStopToDelete] = React.useState(null);
  const [zoomLevel, setZoomLevel] = React.useState(6);

  // Active navigation level: country -> state -> city -> detail
  const level = React.useMemo(() => {
    if (selectedCity) return 'detail';
    if (selectedState) return 'city';
    if (selectedCountry) return 'state';
    return 'country';
  }, [selectedCountry, selectedState, selectedCity]);

  // Keep country, state & city synced with trackingData updates
  React.useEffect(() => {
    if (selectedCountry) {
      const freshCountry = trackingData.find(
        (c) => (c.country || c.state) === (selectedCountry.country || selectedCountry.state)
      );
      if (freshCountry) {
        setSelectedCountry(freshCountry);
        if (selectedState) {
          const freshState = (freshCountry.states || []).find((s) => s.state === selectedState.state);
          if (freshState) {
            setSelectedState(freshState);
            if (selectedCity) {
              const freshCity = freshState.cities.find((c) => c.city === selectedCity.city);
              if (freshCity) setSelectedCity(freshCity);
            }
          }
        }
      }
    }
  }, [trackingData]);

  // Compute current items based on active level (country -> state -> city -> detail)
  const currentItems = React.useMemo(() => {
    if (level === 'country') {
      return trackingData.map((c, idx) => ({
        id: c.id || c.country,
        name: c.country || c.name,
        title: c.country || c.name,
        subtitle: c.states?.length
          ? `Hub: ${c.hub?.city || 'Mumbai'} • ${c.states.length} Top Business States`
          : `Hub: ${c.hub?.city || 'Hub'} • ${c.cities?.length || 0} Cities`,
        role: c.isCustomPinned ? 'Pinned Location' : 'Country',
        badge: c.isCustomPinned ? 'Pinned' : (c.states?.length ? `${c.states.length} States` : c.hub?.city || 'Country Hub'),
        displayIndex: idx + 1,
        lat: c.latitude,
        lng: c.longitude,
        color: c.isCustomPinned ? '#2563eb' : '#db5e1f',
        isCustomPinned: c.isCustomPinned,
        raw: c,
      }));
    }

    if (level === 'state') {
      const list = selectedCountry?.states || (trackingData[0]?.states || []);
      return list.map((s, idx) => ({
        id: s.id || s.state,
        name: s.state || s.name,
        title: s.state || s.name,
        subtitle: `Hub: ${s.hub?.city || 'Hub'} • ${s.cities?.length || 0} Top Cities`,
        role: s.isCustomPinned ? 'Pinned State' : 'State',
        badge: s.isCustomPinned ? 'Pinned' : (s.hub?.city || `${s.cities?.length || 0} Cities`),
        displayIndex: idx + 1,
        lat: s.latitude,
        lng: s.longitude,
        color: s.isCustomPinned ? '#2563eb' : '#db5e1f',
        isCustomPinned: s.isCustomPinned,
        raw: s,
      }));
    }

    if (level === 'city') {
      if (!selectedState?.cities) return [];
      return selectedState.cities.map((c, idx) => ({
        id: c.id || c.city,
        name: c.city || c.name,
        title: c.city || c.name,
        subtitle: `${c.suppliers?.length || 0} Suppliers • ${c.vendors?.length || 0} Vendors`,
        role: c.isCustomPinned ? 'Pinned City' : (selectedState.hub?.city === c.city ? 'Primary Hub' : 'City Hub'),
        badge: c.isCustomPinned ? 'Pinned' : `${(c.suppliers?.length || 0) + (c.vendors?.length || 0)} Entities`,
        displayIndex: idx + 1,
        lat: c.latitude,
        lng: c.longitude,
        color: '#2563eb',
        isCustomPinned: c.isCustomPinned,
        raw: c,
      }));
    }

    // detail level
    if (!selectedCity) return [];
    const sups = (selectedCity.suppliers || []).map((s, idx) => {
      const coords = getEffectiveCoordinates(
        s,
        idx,
        selectedCity.suppliers.length,
        selectedCity.latitude,
        selectedCity.longitude
      );
      return {
        ...s,
        type: 'supplier',
        role: 'Supplier',
        badge: 'Supplier',
        color: '#2563eb',
        lat: coords.lat,
        lng: coords.lng,
        subtitle: s.location || `${selectedCity.city} • Supplier (${s.id})`,
      };
    });

    const vens = (selectedCity.vendors || []).map((v, idx) => {
      const coords = getEffectiveCoordinates(
        v,
        idx + sups.length,
        sups.length + selectedCity.vendors.length,
        selectedCity.latitude,
        selectedCity.longitude
      );
      return {
        ...v,
        type: 'vendor',
        role: 'Vendor',
        badge: 'Vendor',
        color: '#db5e1f',
        lat: coords.lat,
        lng: coords.lng,
        subtitle: v.location || `${selectedCity.city} • Vendor (${v.id})`,
      };
    });

    const list = activeTab === 'suppliers' ? sups : activeTab === 'vendors' ? vens : [...sups, ...vens];
    return list.map((item, idx) => ({ ...item, displayIndex: idx + 1 }));
  }, [level, trackingData, selectedCountry, selectedState, selectedCity, activeTab]);

  // Filter items by search input
  const filteredItems = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return currentItems;
    return currentItems.filter((i) =>
      (i.name || i.title || '').toLowerCase().includes(q) ||
      (i.subtitle || '').toLowerCase().includes(q) ||
      String(i.id || '').toLowerCase().includes(q) ||
      (i.role || '').toLowerCase().includes(q)
    );
  }, [currentItems, search]);

  // Navigation handlers
  const handleSelectCountry = React.useCallback((countryObj) => {
    setSelectedCountry(countryObj);
    setSelectedState(null);
    setSelectedCity(null);
    setSelectedStopId(null);
    setSearch('');
  }, []);

  const handleSelectState = React.useCallback((stateObj) => {
    setSelectedState(stateObj);
    setSelectedCity(null);
    setSelectedStopId(null);
    setSearch('');
  }, []);

  const handleSelectCity = React.useCallback((cityObj) => {
    setSelectedCity(cityObj);
    const firstStop = cityObj.suppliers?.[0] || cityObj.vendors?.[0];
    setSelectedStopId(firstStop ? firstStop.id : null);
    setSearch('');
    setActiveTab('all');
  }, []);

  const handleBackToCountries = React.useCallback(() => {
    setSelectedCountry(null);
    setSelectedState(null);
    setSelectedCity(null);
    setSelectedStopId(null);
    setSearch('');
  }, []);

  const handleBackToStates = React.useCallback(() => {
    setSelectedState(null);
    setSelectedCity(null);
    setSelectedStopId(null);
    setSearch('');
  }, []);

  const handleBackToCities = React.useCallback(() => {
    setSelectedCity(null);
    setSelectedStopId(null);
    setSearch('');
  }, []);

  const handleSelectCard = React.useCallback(
    (item) => {
      if (level === 'country') {
        handleSelectCountry(item.raw);
      } else if (level === 'state') {
        handleSelectState(item.raw);
      } else if (level === 'city') {
        handleSelectCity(item.raw);
      } else {
        setSelectedStopId(item.id);
        mapInstanceRef.current?.flyTo([item.lat, item.lng], 15, { duration: 1 });
      }
    },
    [level, handleSelectCountry, handleSelectState, handleSelectCity]
  );

  const handleFitBounds = React.useCallback(() => {
    if (!mapInstanceRef.current || currentItems.length === 0) return;
    const bounds = L.latLngBounds(currentItems.map((s) => [s.lat, s.lng]));
    mapInstanceRef.current.fitBounds(bounds, {
      padding: [50, 50],
      maxZoom: level === 'detail' ? 14 : level === 'city' ? 10 : level === 'state' ? 6 : 5,
    });
  }, [currentItems, level]);

  // Initialize Map
  React.useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [20.5937, 78.9629],
      zoom: 4,
      zoomControl: false,
    });

    // 1. Standard OpenStreetMap (Primary Default: Fast, reliable, worldwide)
    const standardOsm = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; OpenStreetMap contributors',
        subdomains: ['a', 'b', 'c'],
        maxZoom: 19,
      }
    );

    // 2. Esri World Street Map (Topographic / Street Map with English labels)
    const englishStreet = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: 'Tiles &copy; Esri',
        maxZoom: 19,
      }
    );

    // 3. Esri World Topo Map (Topographic map, no API key)
    const englishTopo = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: 'Tiles &copy; Esri',
        maxZoom: 19,
      }
    );

    // 4. Esri World Light Gray Canvas (Clean dashboard light style, no API key)
    const englishLight = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: 'Tiles &copy; Esri',
        maxZoom: 16,
      }
    );

    // Set OpenStreetMap as default active layer
    standardOsm.addTo(map);

    // Layer control to switch map styles if needed
    L.control
      .layers(
        {
          'OpenStreetMap (Default)': standardOsm,
          'Esri Street Map': englishStreet,
          'Esri Topographic': englishTopo,
          'Esri Light Canvas': englishLight,
        },
        null,
        { position: 'bottomright' }
      )
      .addTo(map);

    mapInstanceRef.current = map;

    map.on('zoomend', () => {
      setZoomLevel(map.getZoom());
    });

    const handleResize = () => {
      map.invalidateSize();
    };
    window.addEventListener('resize', handleResize);

    const t1 = setTimeout(() => map.invalidateSize(), 50);
    const t2 = setTimeout(() => map.invalidateSize(), 200);
    const t3 = setTimeout(() => map.invalidateSize(), 500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('resize', handleResize);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Map markers and polyline renderer
  React.useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    markersRef.current.forEach((m) => map.removeLayer(m));
    markersRef.current = [];

    polylinesRef.current.forEach((p) => map.removeLayer(p));
    polylinesRef.current = [];

    // Render route lines
    if (currentItems.length >= 2) {
      const latLngs = currentItems.map((s) => [s.lat, s.lng]);

      const outerLine = L.polyline(latLngs, {
        color: '#bfdbfe',
        weight: 6,
        opacity: 0.65,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(map);

      const coreLine = L.polyline(latLngs, {
        color: '#2563eb',
        weight: 2.5,
        dashArray: '6, 8',
        opacity: 0.95,
      }).addTo(map);

      polylinesRef.current = [outerLine, coreLine];
    }

    // Render custom markers
    currentItems.forEach((item) => {
      const isSelected = item.id === selectedStopId;
      const customIcon = createMarkerIcon(item, isSelected);
      const marker = L.marker([item.lat, item.lng], { icon: customIcon }).addTo(map);

      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        if (level === 'country') {
          handleSelectCountry(item.raw);
        } else if (level === 'state') {
          handleSelectState(item.raw);
        } else if (level === 'city') {
          handleSelectCity(item.raw);
        } else {
          setSelectedStopId(item.id);
        }
      });

      markersRef.current.push(marker);
    });

    // Auto fit bounds
    if (currentItems.length > 0) {
      const bounds = L.latLngBounds(currentItems.map((s) => [s.lat, s.lng]));
      map.fitBounds(bounds, {
        padding: [60, 60],
        maxZoom: level === 'detail' ? 14 : level === 'city' ? 10 : level === 'state' ? 6 : 5,
      });
    }
  }, [currentItems, selectedStopId, level, handleSelectCountry, handleSelectState, handleSelectCity]);

  // Helper to update selected city data in trackingData
  const updateCityData = React.useCallback(
    (updateFn) => {
      if (!selectedCity) return;
      setTrackingData((prev) =>
        prev.map((c) => ({
          ...c,
          states: c.states?.map((st) => ({
            ...st,
            cities: st.cities?.map((ct) => (ct.city === selectedCity.city ? updateFn(ct) : ct)),
          })),
          cities: c.cities?.map((ct) => (ct.city === selectedCity.city ? updateFn(ct) : ct)),
        }))
      );
    },
    [selectedCity]
  );

  // Set crosshair cursor on Leaflet map when in pin mode
  React.useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const container = map.getContainer();
    if (container) {
      container.style.cursor = isPinMode ? 'crosshair' : '';
    }
  }, [isPinMode]);

  // Map click drop pin listener
  React.useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const onMapClick = (e) => {
      if (!isPinMode) return;
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      setPendingPin({
        lat,
        lng,
        name: `Pinned Location #${Date.now().toString().slice(-4)}`,
        type: level === 'detail' ? 'supplier' : 'hub',
        address: `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`,
      });
      setIsPinModalOpen(true);
      setIsPinMode(false);
    };

    map.on('click', onMapClick);
    return () => {
      map.off('click', onMapClick);
    };
  }, [isPinMode, level]);

  // Confirm and save dropped pin
  const handleConfirmPin = React.useCallback(() => {
    if (!pendingPin) return;
    const { lat, lng, name, type, address } = pendingPin;
    const finalName = name?.trim() || `Pinned Location #${Date.now().toString().slice(-4)}`;
    const finalAddress = address?.trim() || `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
    const newId = `PIN-${Date.now().toString().slice(-4)}`;

    if (level === 'detail' && selectedCity) {
      const newStop = {
        id: newId,
        name: finalName,
        location: finalAddress,
        latitude: lat,
        longitude: lng,
        lat,
        lng,
        role: type === 'vendor' ? 'Vendor' : 'Supplier',
        type: type === 'vendor' ? 'vendor' : 'supplier',
        color: type === 'vendor' ? '#db5e1f' : '#2563eb',
        badge: 'Pinned',
        isCustomPinned: true,
      };

      updateCityData((ct) => ({
        ...ct,
        suppliers: type === 'vendor' ? ct.suppliers : [newStop, ...(ct.suppliers || [])],
        vendors: type === 'vendor' ? [newStop, ...(ct.vendors || [])] : ct.vendors,
      }));

      setSelectedCity((prev) =>
        prev
          ? {
            ...prev,
            suppliers: type === 'vendor' ? prev.suppliers : [newStop, ...(prev.suppliers || [])],
            vendors: type === 'vendor' ? [newStop, ...(prev.vendors || [])] : prev.vendors,
          }
          : null
      );
    } else if (level === 'city' && selectedState) {
      const newCity = {
        id: newId,
        city: finalName,
        name: finalName,
        latitude: lat,
        longitude: lng,
        isCustomPinned: true,
        suppliers: [
          {
            id: `SUP-${newId}`,
            name: `${finalName} Depot`,
            latitude: lat,
            longitude: lng,
            location: finalAddress,
            isCustomPinned: true,
          },
        ],
        vendors: [],
      };

      setTrackingData((prev) =>
        prev.map((c) => ({
          ...c,
          states: c.states?.map((st) =>
            st.state === selectedState.state
              ? { ...st, cities: [newCity, ...(st.cities || [])] }
              : st
          ),
        }))
      );

      setSelectedState((prev) =>
        prev
          ? {
            ...prev,
            cities: [newCity, ...(prev.cities || [])],
          }
          : null
      );
    } else if (level === 'state' && selectedCountry) {
      const newState = {
        id: newId,
        state: finalName,
        name: finalName,
        latitude: lat,
        longitude: lng,
        isCustomPinned: true,
        hub: { city: finalName, latitude: lat, longitude: lng },
        cities: [
          {
            id: `CTY-${newId}`,
            city: `${finalName} City`,
            latitude: lat,
            longitude: lng,
            suppliers: [],
            vendors: [],
          },
        ],
      };

      setTrackingData((prev) =>
        prev.map((c) =>
          (c.country || c.state) === (selectedCountry.country || selectedCountry.state)
            ? { ...c, states: [newState, ...(c.states || [])] }
            : c
        )
      );

      setSelectedCountry((prev) =>
        prev
          ? {
            ...prev,
            states: [newState, ...(prev.states || [])],
          }
          : null
      );
    } else {
      // level === 'country'
      const newCountry = {
        id: newId,
        country: finalName,
        name: finalName,
        state: finalName,
        latitude: lat,
        longitude: lng,
        isCustomPinned: true,
        hub: { city: finalName, latitude: lat, longitude: lng },
        states: [
          {
            id: `ST-${newId}`,
            state: `${finalName} Region`,
            latitude: lat,
            longitude: lng,
            hub: { city: finalName, latitude: lat, longitude: lng },
            cities: [],
          },
        ],
      };

      setTrackingData((prev) => [newCountry, ...prev]);
    }

    setSelectedStopId(newId);
    setIsPinModalOpen(false);
    setPendingPin(null);

    // Smooth fly to the newly dropped pin
    mapInstanceRef.current?.flyTo([lat, lng], Math.max(mapInstanceRef.current.getZoom(), 8), { duration: 1 });

    showToast(`Pinned location "${finalName}" added successfully!`, 'success');
  }, [pendingPin, level, selectedCity, selectedState, selectedCountry, updateCityData]);

  // Delete stop handler
  const confirmDeleteStop = React.useCallback(() => {
    if (!stopToDelete) return;
    const targetId = stopToDelete.id || stopToDelete.name || stopToDelete.title;

    if (level === 'detail' && selectedCity) {
      updateCityData((ct) => ({
        ...ct,
        suppliers: (ct.suppliers || []).filter((s) => s.id !== targetId),
        vendors: (ct.vendors || []).filter((v) => v.id !== targetId),
      }));
      setSelectedCity((prev) =>
        prev
          ? {
            ...prev,
            suppliers: (prev.suppliers || []).filter((s) => s.id !== targetId),
            vendors: (prev.vendors || []).filter((v) => v.id !== targetId),
          }
          : null
      );
    } else if (level === 'city' && selectedState) {
      setTrackingData((prev) =>
        prev.map((c) => ({
          ...c,
          states: c.states?.map((st) =>
            st.state === selectedState.state
              ? { ...st, cities: (st.cities || []).filter((ct) => (ct.city || ct.id) !== targetId) }
              : st
          ),
        }))
      );
      setSelectedState((prev) =>
        prev
          ? {
            ...prev,
            cities: (prev.cities || []).filter((ct) => (ct.city || ct.id) !== targetId),
          }
          : null
      );
    } else if (level === 'state' && selectedCountry) {
      setTrackingData((prev) =>
        prev.map((c) =>
          (c.country || c.state) === (selectedCountry.country || selectedCountry.state)
            ? { ...c, states: (c.states || []).filter((st) => (st.state || st.id) !== targetId) }
            : c
        )
      );
      setSelectedCountry((prev) =>
        prev
          ? {
            ...prev,
            states: (prev.states || []).filter((st) => (st.state || st.id) !== targetId),
          }
          : null
      );
    } else {
      // level === 'country'
      setTrackingData((prev) => prev.filter((c) => (c.country || c.state || c.id) !== targetId));
    }

    setSelectedStopId((prev) => (prev === targetId ? null : prev));
    setStopToDelete(null);
    showToast(`Location "${stopToDelete.name || stopToDelete.title}" removed`, 'info');
  }, [stopToDelete, level, selectedCity, selectedState, selectedCountry, updateCityData]);

  if (!isAuthorized) {
    return <Navigate to={getFirstAllowedRoute(user || role)} replace />;
  }

  return (
    <Container version='v0' className="w-full overflow-hidden" style={{ height: 'calc(100vh - 60px)' }}>
      <div className="flex w-full gap-12 overflow-hidden relative" style={{ height: 'calc(100vh - 60px)' }}>
        {/* Left Sidebar */}
        <div className="w-25 bg-white rounded-5 overflow-hidden flex flex-column" style={{ height: '100%' }}>
          <div className="p-10 overflow-hidden">
            <Fields
              type="input"
              icon="Search"
              iconPosition="left"
              placeholder={
                level === 'country'
                  ? 'Search countries...'
                  : level === 'state'
                    ? `Search states in ${selectedCountry?.country || 'India'}...`
                    : level === 'city'
                      ? `Search cities in ${selectedState?.state}...`
                      : `Search vendors & suppliers in ${selectedCity?.city}...`
              }
              value={search}
              onChange={setSearch}
              className="w-full"
            />

            <div className="mt-10">
              <Button
                text={isPinMode ? 'Click on map to drop pin (Cancel)' : 'Pin New Location'}
                version="v3"
                bg={isPinMode ? 'danger' : 'primary'}
                color="white"
                icon={isPinMode ? 'Close' : 'Plus'}
                onClick={() => setIsPinMode((prev) => !prev)}
              />
            </div>

            <div className="mt-12 mb-6">
              {level === 'country' ? (
                <div className="flex items-center justify-between">
                  <h4 className="font-500 text-dark headmini-text">Select Country</h4>
                  <p className="font-400 text-gray mini-text">
                    {filteredItems.length} {filteredItems.length === 1 ? 'country' : 'countries'}
                  </p>
                </div>
              ) : level === 'state' ? (
                <div>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={handleBackToCountries}
                      className="flex items-center gap-4 text-primary font-500 mini-text bg-transparent border-0 cursor-pointer p-0"
                    >
                      <Icon name="ChevronLeft" width="13" height="13" stroke="currentColor" />
                      <span>All Countries</span>
                    </button>
                    <p className="font-400 text-gray mini-text">
                      {filteredItems.length} states
                    </p>
                  </div>
                  <h4 className="font-600 text-dark headmini-text mt-4">
                    {selectedCountry?.country || 'India'}
                  </h4>
                </div>
              ) : level === 'city' ? (
                <div>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={handleBackToStates}
                      className="flex items-center gap-4 text-primary font-500 mini-text bg-transparent border-0 cursor-pointer p-0"
                    >
                      <Icon name="ChevronLeft" width="13" height="13" stroke="currentColor" />
                      <span>{selectedCountry?.country || 'India'}</span>
                    </button>
                    <p className="font-400 text-gray mini-text">
                      {filteredItems.length} {filteredItems.length === 1 ? 'hub' : 'cities'}
                    </p>
                  </div>
                  <h4 className="font-600 text-dark headmini-text mt-4">
                    {selectedState?.state}
                  </h4>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={handleBackToCities}
                      className="flex items-center gap-4 text-primary font-500 mini-text bg-transparent border-0 cursor-pointer p-0"
                    >
                      <Icon name="ChevronLeft" width="13" height="13" stroke="currentColor" />
                      <span>{selectedState?.state}</span>
                    </button>
                    <p className="font-400 text-gray mini-text">{filteredItems.length} stops</p>
                  </div>
                  <h4 className="font-600 text-dark headmini-text mt-4">
                    {selectedCity?.city}
                  </h4>

                  <div className="flex items-center gap-6 mt-8">
                    {[
                      { key: 'all', label: 'All' },
                      { key: 'suppliers', label: `Suppliers (${selectedCity?.suppliers?.length || 0})` },
                      { key: 'vendors', label: `Vendors (${selectedCity?.vendors?.length || 0})` },
                    ].map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-8 py-4 rounded-4 mini-text font-500 border-0 cursor-pointer transition-all ${activeTab === tab.key
                          ? 'bg-primary text-white'
                          : 'bg-forth text-dark hover:bg-tertiary'
                          }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Scrollable list */}
            <div className="mt-8 bg-forth p-10 rounded-5">
              <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 270px)' }}>
                {filteredItems.map((item) => (
                  <LocationCard
                    key={item.id}
                    item={item}
                    isSelected={item.id === selectedStopId}
                    onSelect={handleSelectCard}
                    onDelete={level === 'detail' || item.isCustomPinned ? setStopToDelete : undefined}
                    isDrillable={level !== 'detail' && !item.isCustomPinned}
                  />
                ))}
                {filteredItems.length === 0 && (
                  <div className="text-center py-20 text-gray mini-text">
                    No locations found.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Map */}
        <div className="w-75 relative bg-forth overflow-hidden rounded-5" style={{ height: '100%', minHeight: '500px' }}>
          <div
            ref={mapContainerRef}
            style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, zIndex: 1 }}
          />

          {/* Floating Pin Drop Active Indicator */}
          {isPinMode && (
            <div
              className="absolute top-12 left-50 z-999 bg-white px-16 py-8 rounded-20 b-shadow flex items-center gap-12"
              style={{
                transform: 'translateX(-50%)',
                border: '1.5px solid #2563eb',
                boxShadow: '0 4px 14px rgba(37,99,235,0.22)',
                zIndex: 1000,
              }}
            >
              <div className="flex items-center gap-6">
                <span style={{ fontSize: '15px' }}>📍</span>
                <span className="small-text font-600 text-dark">
                  Click anywhere on the map to drop a new location pin
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsPinMode(false)}
                className="border-0 bg-transparent text-gray hover:text-danger cursor-pointer font-600 mini-text px-6 py-2 rounded-4 hover:bg-slate-100 transition-all"
                title="Cancel pin mode"
              >
                ✕ Cancel
              </button>
            </div>
          )}

          <CanvasToolbar
            zoomPercent={Math.round((zoomLevel / 13) * 100)}
            onZoomIn={() => mapInstanceRef.current?.zoomIn()}
            onZoomOut={() => mapInstanceRef.current?.zoomOut()}
            onResetZoom={handleFitBounds}
            onFitView={handleFitBounds}
            fitViewTitle="Fit Route"
          />

          <RouteLegend level={level} />
        </div>
      </div>

      {/* Pin Location Modal */}
      <Modal
        isOpen={isPinModalOpen}
        onClose={() => {
          setIsPinModalOpen(false);
          setPendingPin(null);
        }}
        title="Pin New Location"
        size="sm"
        footer={
          <div className="flex items-center justify-end gap-8 w-full">
            <Button
              text="Cancel"
              version="v2"
              bg="white"
              border="secondary"
              color="dark"
              onClick={() => {
                setIsPinModalOpen(false);
                setPendingPin(null);
              }}
            />
            <Button
              text="Save & Drop Pin"
              version="v1"
              bg="primary"
              color="white"
              icon="Check"
              onClick={handleConfirmPin}
            />
          </div>
        }
      >
        <div className="p-14 flex flex-column gap-12">
          <div
            className="p-10 rounded-6 flex items-center gap-8"
            style={{ backgroundColor: '#eff6ff', border: '1px solid #dbeafe' }}
          >
            <span style={{ fontSize: '18px' }}>📍</span>
            <div>
              <p className="mini-text font-600 text-primary">Map Coordinates Selected</p>
              <p className="mini-text text-gray mt-2">
                Latitude: <strong>{pendingPin?.lat?.toFixed(5)}</strong> • Longitude: <strong>{pendingPin?.lng?.toFixed(5)}</strong>
              </p>
            </div>
          </div>

          <div>
            <label className="mini-text font-600 text-dark block mb-4">Location Name</label>
            <Fields
              type="input"
              placeholder="e.g. Central Warehouse, North Supplier Depot"
              value={pendingPin?.name || ''}
              onChange={(val) => setPendingPin((prev) => ({ ...prev, name: val }))}
              className="w-full"
            />
          </div>

          {level === 'detail' && (
            <div>
              <label className="mini-text font-600 text-dark block mb-4">Location Type</label>
              <div className="flex items-center gap-8">
                <button
                  type="button"
                  onClick={() => setPendingPin((prev) => ({ ...prev, type: 'supplier' }))}
                  className={`flex-1 py-8 px-12 rounded-6 mini-text font-600 border-0 cursor-pointer transition-all ${pendingPin?.type === 'supplier'
                      ? 'bg-primary text-white'
                      : 'bg-forth text-dark hover:bg-tertiary'
                    }`}
                >
                  Supplier (Blue)
                </button>
                <button
                  type="button"
                  onClick={() => setPendingPin((prev) => ({ ...prev, type: 'vendor' }))}
                  className={`flex-1 py-8 px-12 rounded-6 mini-text font-600 border-0 cursor-pointer transition-all ${pendingPin?.type === 'vendor'
                      ? 'text-white'
                      : 'bg-forth text-dark hover:bg-tertiary'
                    }`}
                  style={{
                    backgroundColor: pendingPin?.type === 'vendor' ? '#db5e1f' : undefined,
                  }}
                >
                  Vendor (Orange)
                </button>
              </div>
            </div>
          )}

          <div>
            <label className="mini-text font-600 text-dark block mb-4">Address / Description</label>
            <Fields
              type="input"
              placeholder="e.g. Industrial Area Phase 2, Near City Gate"
              value={pendingPin?.address || ''}
              onChange={(val) => setPendingPin((prev) => ({ ...prev, address: val }))}
              className="w-full"
            />
          </div>
        </div>
      </Modal>

      <DeleteModal
        isOpen={Boolean(stopToDelete)}
        onClose={() => setStopToDelete(null)}
        onDelete={confirmDeleteStop}
        title="Remove Location Stop"
        message={`Are you sure you want to remove "${stopToDelete?.name || stopToDelete?.title}" from the journey?`}
      />
    </Container>
  );
};

export default React.memo(Location);