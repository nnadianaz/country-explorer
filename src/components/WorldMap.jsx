import "./WorldMap.css";

const WorldMap = () => {
  return (
    <div className="world-map" role="img" aria-label="Map of the world">
      <span className="world-map-overlay" aria-hidden="true" />
    </div>
  );
};

export default WorldMap;