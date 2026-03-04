import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Navbar/Navbar";
import { REGIONS } from "../../constants";
import { productsData, formatPriceRange } from "../../data/products";
import "./AllProducts.css";

const categories = [
  { key: "all", label: "Tất cả" },
  { key: "fruit", label: "Trái cây" },
  { key: "vegetable", label: "Rau củ" },
  { key: "coffee", label: "Cà phê" },
  { key: "rice", label: "Lúa gạo" },
  { key: "spice", label: "Gia vị" },
  { key: "tea", label: "Chè" },
];

const regionList = [
  { key: "all", label: "Tất cả miền", icon: "🗺️" },
  { key: "north", ...REGIONS.NORTH },
  { key: "central", ...REGIONS.CENTRAL },
  { key: "south", ...REGIONS.SOUTH },
];

const AllProducts = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const activeRegionInfo = regionList.find(r => r.key === selectedRegion);

  const filtered = useMemo(() => {
    let result = [...productsData];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.location.toLowerCase().includes(q));
    }
    if (selectedCategory !== "all") result = result.filter(p => p.category === selectedCategory);
    if (selectedRegion !== "all") result = result.filter(p => p.region === selectedRegion);
    if (sortBy === "price-asc") result.sort((a, b) => a.priceMin - b.priceMin);
    else if (sortBy === "price-desc") result.sort((a, b) => b.priceMax - a.priceMax);
    else if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);
    else result.sort((a, b) => b.reviewCount - a.reviewCount);
    return result;
  }, [search, selectedCategory, selectedRegion, sortBy]);

  const getRegionObj = (key) => {
    const map = { north: REGIONS.NORTH, central: REGIONS.CENTRAL, south: REGIONS.SOUTH };
    return map[key] || REGIONS.SOUTH;
  };

  return (
    <motion.div className="allproducts-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Navbar />

      <div className="ap-container">
        <div className="ap-header">
          <h1>Sản phẩm Bao tiêu</h1>
          <p>Khám phá nông sản chất lượng cao từ khắp 3 miền Việt Nam</p>
        </div>

        {/* REGION SELECTOR */}
        <div className="ap-region-selector">
          {regionList.map(r => (
            <button
              key={r.key}
              className={`region-btn ${selectedRegion === r.key ? "active" : ""}`}
              style={selectedRegion === r.key && r.color ? { borderColor: r.color, background: r.color + "15" } : {}}
              onClick={() => setSelectedRegion(r.key)}
            >
              <span className="region-icon">{r.icon}</span>
              <span>{r.label}</span>
            </button>
          ))}
        </div>

        {/* REGION HIGHLIGHT BANNER */}
        <AnimatePresence mode="wait">
          {selectedRegion !== "all" && (
            <motion.div
              className="region-highlight"
              key={selectedRegion}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{ borderLeftColor: activeRegionInfo?.color }}
            >
              <span className="rh-icon">{activeRegionInfo?.icon}</span>
              <div>
                <h3>Đặc sản {activeRegionInfo?.label}</h3>
                <p>{activeRegionInfo?.highlight}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FILTERS BAR */}
        <div className="ap-filters">
          <div className="ap-search">
            <span>🔍</span>
            <input placeholder="Tìm sản phẩm, địa điểm..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="ap-category-tabs">
            {categories.map(c => (
              <button key={c.key} className={selectedCategory === c.key ? "active" : ""}
                onClick={() => setSelectedCategory(c.key)}>{c.label}</button>
            ))}
          </div>
          <select className="ap-sort" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="popular">Phổ biến nhất</option>
            <option value="rating">Đánh giá cao</option>
            <option value="price-asc">Giá thấp → cao</option>
            <option value="price-desc">Giá cao → thấp</option>
          </select>
        </div>

        {/* RESULT COUNT */}
        <p className="ap-result-count">Tìm thấy <strong>{filtered.length}</strong> sản phẩm</p>

        {/* PRODUCT GRID */}
        <div className="ap-grid">
          <AnimatePresence>
            {filtered.map(product => {
              const rgn = getRegionObj(product.region);
              return (
                <motion.div
                  key={product.id}
                  className="ap-card"
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -6, boxShadow: "0 12px 30px rgba(0,0,0,0.12)" }}
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  <div className="ap-card-img">
                    <img src={product.image} alt={product.name} />
                    {product.badge && <span className="ap-badge">{product.badge}</span>}
                    <span className="ap-region-badge" style={{ background: rgn.color }}>{rgn.icon} {rgn.label}</span>
                  </div>
                  <div className="ap-card-body">
                    <h3>{product.name}</h3>
                    <p className="ap-card-location">📍 {product.location} • {product.farm}</p>
                    <div className="ap-card-price">
                      {formatPriceRange(product.priceMin, product.priceMax)}
                      <span>/{product.unit}</span>
                    </div>
                    <div className="ap-card-meta">
                      <span className="ap-card-rating">⭐ {product.rating} ({product.reviewCount})</span>
                      <span className="ap-card-remaining">Còn {product.remaining.toLocaleString()}{product.unit}</span>
                    </div>
                    <div className="ap-card-progress">
                      <div className="ap-pbar">
                        <div className="ap-pfill" style={{ width: `${product.progress}%` }} />
                      </div>
                      <span>{product.progress}% cam kết</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="ap-empty">
            <span>🍃</span>
            <p>Không tìm thấy sản phẩm phù hợp. Hãy thử bộ lọc khác!</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AllProducts;
