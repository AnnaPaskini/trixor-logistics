
import { geoMercator, geoPath } from 'd3-geo';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { feature } from 'topojson-client';
import ScrollReveal from './ScrollReveal';

// --- CONFIGURATION ---

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

// ACTIVE countries (where we operate): DE, PL, CZ, AT, HU, SK
const ACTIVE_IDS = [
  "276", // Germany
  "616", // Poland
  "203", // Czechia
  "040", // Austria
  "348", // Hungary
  "703"  // Slovakia
];

// Custom shades for active countries - UPDATED LIGHTER PALETTE
const COUNTRY_FILLS: Record<string, string> = {
  "276": "#5e5e5e", // Germany
  "616": "#555555", // Poland
  "203": "#757575", // Czechia - BRIGHTEST (HQ)
  "040": "#5c5c5c", // Austria
  "348": "#525252", // Hungary
  "703": "#585858", // Slovakia
};

// CONTEXT countries (surrounding)
const CONTEXT_IDS = [
  "250", // France
  "380", // Italy
  "528", // Netherlands
  "056", // Belgium
  "208", // Denmark
  "756", // Switzerland
  "705", // Slovenia
  "191", // Croatia
  "804", // Ukraine
  "112", // Belarus
  "440", // Lithuania
  "752", // Sweden
  "578", // Norway
  "246", // Finland
  "826", // United Kingdom
  "724", // Spain
  "620", // Portugal
  "642", // Romania
  "688", // Serbia
  "499", // Montenegro
  "008", // Albania
  "300", // Greece
  "100"  // Bulgaria
];

// ISO Labels for better understanding
const COUNTRY_LABELS: Record<string, string> = {
  "276": "DE", "616": "PL", "203": "CZ", "040": "AT", "348": "HU", "703": "SK",
  "250": "FR", "380": "IT", "528": "NL", "056": "BE", "208": "DK", "756": "CH",
  "705": "SI", "191": "HR", "804": "UA", "112": "BY", "440": "LT", "752": "SE",
  "578": "NO", "246": "FI", "826": "UK", "724": "ES", "620": "PT", "642": "RO",
  "688": "RS", "499": "ME", "008": "AL", "300": "GR", "100": "BG"
};

// --- Types ---

interface City {
  id: string;
  name: string;
  lat: number;
  lon: number;
}

interface LaneConfig {
  id: string;
  from: string;
  to: string;
  baseFlow: number;
  frequency: string;
}

// --- Data ---

const CITIES: Record<string, City> = {
  PRAGUE: { id: 'PRAGUE', name: 'Prague', lat: 50.0755, lon: 14.4378 },
  BERLIN: { id: 'BERLIN', name: 'Berlin', lat: 52.5200, lon: 13.4050 },
  HAMBURG: { id: 'HAMBURG', name: 'Hamburg', lat: 53.5511, lon: 9.9937 },
  MUNICH: { id: 'MUNICH', name: 'Munich', lat: 48.1351, lon: 11.5820 },
  VIENNA: { id: 'VIENNA', name: 'Vienna', lat: 48.2082, lon: 16.3738 },
  BUDAPEST: { id: 'BUDAPEST', name: 'Budapest', lat: 47.4979, lon: 19.0402 },
  BRATISLAVA: { id: 'BRATISLAVA', name: 'Bratislava', lat: 48.1486, lon: 17.1077 },
  WARSAW: { id: 'WARSAW', name: 'Warsaw', lat: 52.2297, lon: 21.0122 },
  DORTMUND: { id: 'DORTMUND', name: 'Dortmund', lat: 51.5136, lon: 7.4653 },
  FRANKFURT: { id: 'FRANKFURT', name: 'Frankfurt', lat: 50.1109, lon: 8.6821 },
};

const LANES: LaneConfig[] = [
  { id: 'cz-de-north', from: 'PRAGUE', to: 'HAMBURG', baseFlow: 2, frequency: '3x Weekly' },
  { id: 'cz-de-west', from: 'PRAGUE', to: 'DORTMUND', baseFlow: 1, frequency: '2x Weekly' },
  { id: 'cz-de-sw', from: 'PRAGUE', to: 'FRANKFURT', baseFlow: 1, frequency: '2x Weekly' },
  { id: 'cz-at', from: 'PRAGUE', to: 'VIENNA', baseFlow: 2, frequency: 'Daily' },
  { id: 'at-hu', from: 'VIENNA', to: 'BUDAPEST', baseFlow: 1, frequency: '3x Weekly' },
  { id: 'cz-sk', from: 'PRAGUE', to: 'BRATISLAVA', baseFlow: 1, frequency: 'Daily' },
  { id: 'de-de', from: 'BERLIN', to: 'MUNICH', baseFlow: 1, frequency: '2x Weekly' },
  { id: 'de-pl', from: 'BERLIN', to: 'WARSAW', baseFlow: 1, frequency: '2x Weekly' },
];

const MAP_WIDTH = 800;
const MAP_HEIGHT = 600;

// --- Component ---

const Lanes: React.FC = () => {
  const { t } = useTranslation();
  const [hoveredLane, setHoveredLane] = useState<string | null>(null);
  const [geographies, setGeographies] = useState<any[]>([]);

  // Frequency translation mapping
  const frequencyKeys: Record<string, string> = {
    'Daily': 'daily',
    '2x Weekly': '2xWeekly', 
    '3x Weekly': '3xWeekly'
  };

  // Fetch and Parse TopoJSON
  useEffect(() => {
    fetch(GEO_URL)
      .then(res => res.json())
      .then(data => {
        // Convert TopoJSON to GeoJSON features
        const countries = feature(data, data.objects.countries) as any;
        setGeographies(countries.features);
      })
      .catch(err => console.error("Failed to load map data", err));
  }, []);

  // Custom Projection for Central Europe
  const projection = useMemo(() => {
    return geoMercator()
      .center([15.0, 50.0]) // Center slightly west to balance view
      .scale(1600) // Zoomed out to show more context (UK, France, Balkans)
      .translate([MAP_WIDTH / 2, MAP_HEIGHT / 2]);
  }, []);

  // Path Generator
  const pathGenerator = useMemo(() => {
    return geoPath().projection(projection);
  }, [projection]);

  // --- Helper for Curves ---
  const getCurvePath = (startId: string, endId: string, offset: number = 20) => {
    const startCity = CITIES[startId];
    const endCity = CITIES[endId];

    // Project coordinates
    const [startX, startY] = projection([startCity.lon, startCity.lat]) || [0, 0];
    const [endX, endY] = projection([endCity.lon, endCity.lat]) || [0, 0];

    // Calculate curve
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    const dx = endX - startX;
    const dy = endY - startY;
    const len = Math.sqrt(dx * dx + dy * dy);
    const nx = -dy / len;
    const ny = dx / len;
    const cX = midX + nx * offset;
    const cY = midY + ny * offset;

    return `M ${startX},${startY} Q ${cX},${cY} ${endX},${endY}`;
  };

  return (
    <section id="lanes" className="py-24 bg-[#0A0A0A] text-white overflow-hidden relative scroll-mt-24">
      <ScrollReveal>
        <div className="container mx-auto px-4 md:px-8 relative z-10">

          <div className="flex flex-col items-center gap-12">

            {/* Text Content */}
            <div className="w-full max-w-4xl text-center">
              <div className="inline-block px-10 py-3 border border-primary/50 bg-neutral-900/50 text-white text-l font-mono font-bold tracking-widest uppercase mb-6">
                {t('lanes.badge')}
              </div>
              <h2 className="text-4xl font-black mb-6">{t('lanes.title')}</h2>
              <p className="text-neutral-400 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
                {t('lanes.desc')}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="p-4 bg-neutral-800 border-l-4 border-primary rounded-r">
                  <h4 className="font-bold text-white uppercase tracking-wider text-sm">{t('lanes.features.roundTrip.title')}</h4>
                  <p className="text-xs text-neutral-400 mt-1">{t('lanes.features.roundTrip.desc')}</p>
                </div>
                <div className="p-4 bg-neutral-800/50 border-l-4 border-neutral-600 rounded-r">
                  <h4 className="font-bold text-neutral-300 uppercase tracking-wider text-sm">{t('lanes.features.justInTime.title')}</h4>
                  <p className="text-xs text-neutral-500 mt-1">{t('lanes.features.justInTime.desc')}</p>
                </div>
              </div>
            </div>

            {/* THE MAP */}
            <div className="w-full max-w-5xl aspect-[4/3] bg-[#0A0A0A] rounded-xl overflow-hidden relative shadow-2xl border border-neutral-800 group mx-auto">

              {/* Vignette Overlay for Fade Effect at Edges - MUCH LARGER NOW */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background: `
                    radial-gradient(ellipse 110% 90% at 50% 50%, transparent 55%, rgba(10,10,10,0.4) 85%, #0A0A0A 100%),
                    linear-gradient(to bottom, rgba(10,10,10,0.1) 0%, transparent 20%, transparent 80%, rgba(10,10,10,0.1) 100%)
                  `
                }}
              ></div>

              <svg
                viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
                className="w-full h-full"
              >
                {/* Definitions for Animations and Filters */}
                <defs>
                  <symbol id="truck" viewBox="0 0 15 6">
                    <rect x="0" y="0" width="11" height="6" rx="1" fill="#B32025" />
                    <rect x="11" y="0.5" width="4" height="5" rx="1" fill="#8B1A1F" />
                  </symbol>
                  <radialGradient id="hubGlow">
                    <stop offset="0%" stopColor="#B32025" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#B32025" stopOpacity="0" />
                  </radialGradient>
                  {/* NEW FILTER */}
                  <filter id="activeGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>

                  {/* Dot Grid Pattern - Tenser (smaller width/height) */}
                  <pattern id="dotGrid" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="1" fill="#ffffff" opacity="0.08" />
                  </pattern>

                  <style type="text/css">
                    {`
                      @keyframes flowDash {
                        to { stroke-dashoffset: -24; }
                      }
                      .route-line {
                        stroke-dasharray: 8 4;
                        animation: flowDash 2s linear infinite;
                      }
                    `}
                  </style>
                </defs>

                {/* Layer 1: Water/Sea Background */}
                <rect x="0" y="0" width={MAP_WIDTH} height={MAP_HEIGHT} fill="#0A0A0A" />

                {/* Layer 2: Context Geography (Surrounding Countries) */}
                <g className="context-layer">
                  {geographies.map((geo, i) => {
                    if (ACTIVE_IDS.includes(geo.id) || !CONTEXT_IDS.includes(geo.id)) return null;
                    return (
                      <path
                        key={`ctx-${i}`}
                        d={pathGenerator(geo) || undefined}
                        fill="#333333"
                        stroke="#454545"
                        strokeWidth={1}
                      />
                    );
                  })}
                </g>

                {/* Layer 2.5: Operating Zone Indicator (Overlay) */}
                <g className="zone-overlay">
                  {geographies.filter(g => ACTIVE_IDS.includes(g.id)).map((geo, i) => (
                    <path
                      key={`zone-${i}`}
                      d={pathGenerator(geo) || undefined}
                      fill="rgba(179,32,37,0.03)"
                      stroke="none"
                    />
                  ))}
                </g>

                {/* Layer 3: Active Geography (Operational Countries) */}
                <g className="active-layer">
                  {geographies.map((geo, i) => {
                    if (!ACTIVE_IDS.includes(geo.id)) return null;

                    // Czech Republic gets special treatment as HQ country
                    const isCzech = geo.id === "203";

                    return (
                      <React.Fragment key={`act-group-${i}`}>
                        <path
                          key={`act-${i}`}
                          d={pathGenerator(geo) || undefined}
                          fill={COUNTRY_FILLS[geo.id] || "#555555"}
                          stroke="#888888"
                          strokeWidth={1.5}
                        />
                        {/* Special Glow for Czech Republic */}
                        {isCzech && (
                          <path
                            d={pathGenerator(geo) || undefined}
                            fill="none"
                            stroke="#B32025"
                            strokeWidth={2}
                            opacity={0.3}
                            style={{ filter: 'blur(4px)', pointerEvents: 'none' }}
                          />
                        )}
                      </React.Fragment>
                    );
                  })}
                </g>

                {/* Layer 3.5: Country Labels (ISO Codes) */}
                <g className="labels-layer pointer-events-none select-none">
                  {geographies.map((geo) => {
                    const label = COUNTRY_LABELS[geo.id];
                    if (!label) return null;
                    const isActive = ACTIVE_IDS.includes(geo.id);
                    // Don't label active if they are covered by cities, but let's label context for sure
                    if (isActive) return null;

                    const centroid = pathGenerator.centroid(geo);
                    if (!centroid || isNaN(centroid[0])) return null;

                    return (
                      <text
                        key={`lbl-${geo.id}`}
                        x={centroid[0]}
                        y={centroid[1]}
                        textAnchor="middle"
                        fill="#666666"
                        fontSize="10"
                        fontFamily="monospace"
                        opacity="0.8"
                      >
                        {label}
                      </text>
                    );
                  })}
                </g>

                {/* Subtle dot grid overlay for tech feel */}
                <rect width="100%" height="100%" fill="url(#dotGrid)" className="pointer-events-none" />

                {/* Layer 4: Lanes & Traffic */}
                {LANES.map((lane) => {
                  const isHovered = hoveredLane === lane.id;
                  const isAnyHovered = hoveredLane !== null;
                  const opacity = isAnyHovered && !isHovered ? 0.2 : 0.9;

                  const pathIdOut = `path-${lane.id}-out`;
                  const pathIdIn = `path-${lane.id}-in`;

                  const dOut = getCurvePath(lane.from, lane.to, 15);
                  const dIn = getCurvePath(lane.to, lane.from, 15);

                  return (
                    <g
                      key={lane.id}
                      className="transition-opacity duration-300"
                      style={{ opacity }}
                      onMouseEnter={() => setHoveredLane(lane.id)}
                      onMouseLeave={() => setHoveredLane(null)}
                    >
                      {/* Visual Route Lines */}
                      <path d={dOut} fill="none" stroke={isHovered ? '#B32025' : '#888'} strokeWidth={isHovered ? 2 : 1} className="transition-colors duration-300 route-line" />
                      <path d={dIn} fill="none" stroke={isHovered ? '#B32025' : '#888'} strokeWidth={isHovered ? 2 : 1} className="transition-colors duration-300 route-line" />

                      {/* Trucks */}
                      {Array.from({ length: lane.baseFlow }).map((_, i) => (
                        <use key={`out-${i}`} href="#truck" width="16" height="8" x="-8" y="-4">
                          <animateMotion dur="8s" repeatCount="indefinite" begin={`-${i * 4}s`} rotate="auto" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                            <mpath href={`#${pathIdOut}`} />
                          </animateMotion>
                        </use>
                      ))}
                      {Array.from({ length: lane.baseFlow }).map((_, i) => (
                        <use key={`in-${i}`} href="#truck" width="16" height="8" x="-8" y="-4">
                          <animateMotion dur="8s" repeatCount="indefinite" begin={`-${i * 4}s`} rotate="auto" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                            <mpath href={`#${pathIdIn}`} />
                          </animateMotion>
                        </use>
                      ))}

                      {/* Interaction Hit Areas */}
                      <path id={pathIdOut} d={dOut} fill="none" stroke="transparent" strokeWidth="20" className="cursor-pointer" />
                      <path id={pathIdIn} d={dIn} fill="none" stroke="transparent" strokeWidth="20" className="cursor-pointer" />
                      {/* Tooltip */}
                      {isHovered && (() => {
                        const fromCoords = projection([CITIES[lane.from].lon, CITIES[lane.from].lat]) || [0, 0];
                        const toCoords = projection([CITIES[lane.to].lon, CITIES[lane.to].lat]) || [0, 0];
                        const midX = (fromCoords[0] + toCoords[0]) / 2;
                        const midY = (fromCoords[1] + toCoords[1]) / 2 - 30;

                        return (
                          <g transform={`translate(${midX}, ${midY})`}>
                            <rect x="-50" y="-20" width="100" height="40" rx="4" fill="#1a1a1a" />
                            <text y="-5" textAnchor="middle" className="fill-white text-[10px] font-bold">
                              {CITIES[lane.from].name} → {CITIES[lane.to].name}
                            </text>
                            <text y="10" textAnchor="middle" className="fill-white text-[11px] font-mono font-bold">
                              {t(`lanes.frequencies.${frequencyKeys[lane.frequency]}`)}
                            </text>
                          </g>
                        );
                      })()}
                    </g>
                  );
                })}

                {/* Layer 5: Cities */}
                {Object.values(CITIES).map((city) => {
                  const [x, y] = projection([city.lon, city.lat]) || [0, 0];
                  const isPrague = city.id === 'PRAGUE';
                  const isHub = ['BERLIN', 'VIENNA'].includes(city.id);

                  if (isPrague) {
                    return (
                      <g key={city.id} transform={`translate(${x}, ${y})`}>
                        {/* Pulsing Rings for HQ */}
                        <circle r="10" fill="none" stroke="#B32025" strokeWidth="2" opacity="0.5">
                          <animate attributeName="r" values="10;40" dur="2.5s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.8;0" dur="2.5s" repeatCount="indefinite" />
                        </circle>
                        <circle r="6" fill="#B32025" stroke="#FFFFFF" strokeWidth="2" />
                        <text y={-15} textAnchor="middle" className="font-mono font-bold text-[14px] fill-white uppercase tracking-widest pointer-events-none" style={{ textShadow: '0 2px 8px rgba(0,0,0,1)' }}>{city.name}</text>
                      </g>
                    );
                  }

                  return (
                    <g key={city.id} transform={`translate(${x}, ${y})`}>
                      {isHub && (
                        <circle r="12" fill="url(#hubGlow)">
                          <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3s" repeatCount="indefinite" />
                        </circle>
                      )}
                      <circle r={isHub ? 4 : 3} fill={isHub ? "#B32025" : "#FFFFFF"} />
                      <text y={-10} textAnchor="middle" className={`font-mono uppercase tracking-wider select-none pointer-events-none ${isHub ? 'fill-white font-bold text-[12px]' : 'fill-neutral-400 text-[10px]'}`} style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>{city.name}</text>
                    </g>
                  );
                })}

              </svg>

              {/* Legend - Updated to match Prague Pulse Style via SVG */}
              <div className="absolute bottom-8 left-8 flex gap-4 pointer-events-none z-20">
                <div className="flex items-center gap-3 bg-neutral-900/90 px-4 py-2 rounded border border-neutral-700 backdrop-blur-md shadow-xl">
                  <div className="relative w-4 h-4 flex items-center justify-center">
                    <svg width="40" height="40" viewBox="0 0 40 40" className="absolute pointer-events-none">
                      {/* Pulsing Ring - Matches Prague */}
                      <circle cx="20" cy="20" r="8" fill="none" stroke="#B32025" strokeWidth="2" opacity="0.5">
                        <animate attributeName="r" values="8;18" dur="2.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.8;0" dur="2.5s" repeatCount="indefinite" />
                      </circle>
                      {/* Center Dot - Matches Prague */}
                      <circle cx="20" cy="20" r="4" fill="#B32025" stroke="#FFFFFF" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <span className="text-xs text-neutral-200 font-mono uppercase font-bold tracking-widest">{t('lanes.legend')}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default Lanes;
