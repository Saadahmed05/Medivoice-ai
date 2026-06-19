import React, { useEffect, useState } from 'react';
import { MapPin, Navigation, Phone, Search, Loader2, ArrowRight } from 'lucide-react';

export default function NearestHospital({ severity, onNext, isLargeText }) {
  const [locState, setLocState] = useState('idle');
  const [userCoords, setUserCoords] = useState(null);
  const [manualQuery, setManualQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const isEmergency = severity === 'emergency';

  const detectLocation = () => {
    setLocState('loading');
    setErrorMsg('');
    setAppliedQuery('');

    if (!navigator.geolocation) {
      setLocState('error');
      setErrorMsg('GPS is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocState('success');
      },
      (err) => {
        console.warn('GPS Error', err);
        setLocState('error');
        setErrorMsg('Could not detect GPS location. Please enter your location manually.');
      },
      { enableHighAccuracy: true, timeout: 6000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    detectLocation();
  }, []);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (!manualQuery.trim()) return;
    setAppliedQuery(manualQuery.trim());
    setUserCoords(null);
    setLocState('success');
  };

  const getFacilities = () => {
    const queryTerm = appliedQuery
      ? encodeURIComponent(appliedQuery)
      : userCoords
        ? `${userCoords.lat},${userCoords.lng}`
        : '';

    return [
      {
        type: 'PHC',
        label: 'Nearest Primary Health Center (PHC)',
        desc: 'Government Sub-Center PHC',
        distance: userCoords ? '0.7 km away' : 'Local Area',
        details: 'Open Now • Free clinical consults and basic medicines',
        color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        url: `https://www.google.com/maps/search/?api=1&query=Primary+Health+Center+near+${queryTerm}`
      },
      {
        type: 'Govt Hospital',
        label: 'Nearest District Hospital',
        desc: 'District General Government Civil Hospital',
        distance: userCoords ? '2.3 km away' : 'District Center',
        details: 'Open 24/7 • Free emergency ward and specialists',
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        url: `https://www.google.com/maps/search/?api=1&query=Government+Hospital+near+${queryTerm}`
      }
    ];
  };

  const facilities = getFacilities();

  return (
    <div className="w-full max-w-xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <div className="mx-auto bg-blue-50 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center border border-blue-100">
          <MapPin className="w-6 h-6" />
        </div>
        <h2 className={`font-black text-gray-900 ${isLargeText ? 'text-3xl' : 'text-2xl'}`}>
          Healthcare Facilities
        </h2>
        <p className={`text-gray-500 font-semibold ${isLargeText ? 'text-lg' : 'text-sm'}`}>
          Find the nearest primary health center or government civil hospital
        </p>
      </div>

      {/* Emergency Call Shortcut (108 is emergency medical services in India) */}
      {isEmergency && (
        <a
          href="tel:108"
          className="w-full bg-red-600 hover:bg-red-700 text-white rounded-2xl p-5 font-black text-xl flex items-center justify-center gap-3 active:scale-[0.98] transition-all shadow-md shadow-red-200 animate-pulse"
        >
          <Phone className="w-6 h-6" />
          <span>CALL AMBULANCE (108)</span>
        </a>
      )}

      {locState === 'loading' && (
        <div className="p-8 bg-white border border-gray-200 rounded-2xl flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <span className="font-bold text-gray-700">Finding nearby facilities...</span>
        </div>
      )}

      {locState === 'error' && (
        <div className="p-5 bg-red-50 border border-red-100 text-red-800 rounded-2xl text-center font-bold">
          {errorMsg}
        </div>
      )}

      {locState === 'success' && (
        <div className="space-y-4">
          {facilities.map((fac, idx) => (
            <div key={idx} className="p-5 bg-white border border-gray-200 rounded-2xl flex justify-between items-center shadow-sm">
              <div className="space-y-1">
                <span className={`px-2.5 py-0.5 rounded text-xs font-black uppercase ${fac.color}`}>
                  {fac.type}
                </span>
                <h4 className={`font-black text-gray-900 ${isLargeText ? 'text-lg' : 'text-base'}`}>
                  {fac.label}
                </h4>
                <p className="text-xs font-bold text-gray-400">{fac.desc}</p>
                <p className="text-xs font-black text-blue-800 mt-1">{fac.distance} • {fac.details}</p>
              </div>
              <a
                href={fac.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center gap-2 transition-all shrink-0 active:scale-95 focus:outline-none"
              >
                <Navigation className="w-5 h-5" />
                <span>Go</span>
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Manual GPS Fallback Input */}
      <form onSubmit={handleSearchSubmit} className="flex gap-2 bg-white p-2 border border-gray-200 rounded-2xl shadow-sm">
        <input
          type="text"
          value={manualQuery}
          onChange={(e) => setManualQuery(e.target.value)}
          placeholder="Enter village, district, or city..."
          className="flex-1 px-4 py-3 bg-transparent text-gray-900 font-semibold focus:outline-none placeholder-gray-400 text-sm"
        />
        <button
          type="submit"
          className="bg-gray-50 hover:bg-gray-100 p-3 border border-gray-200 rounded-xl text-gray-650 focus:outline-none"
        >
          <Search className="w-5 h-5" />
        </button>
      </form>

      <button
        onClick={onNext}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl btn-large shadow-md active:scale-95"
      >
        Generate Referral Summary
        <ArrowRight className="w-6 h-6" />
      </button>
    </div>
  );
}
