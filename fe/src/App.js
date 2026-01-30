import { BrowserRouter, Routes, Route } from "react-router-dom";

// HOME
import Navbar from "./Component/Navbar/Navbar";
import Hero from "./Component/Hero/Hero";
import Process from "./Component/Process/Process";
import Campaigns from "./Component/Campaigns/Campaigns";
import AgricultureBanner from "./Component/AgricultureBanner/AgricultureBanner";
import Footer from "./Component/Footer/Footer";
import FloatingAuth from "./Component/FloatingAuth/FloatingAuth";

// SOLUTIONS PAGE
import Solutions from "./Component/Solutions/Solutions";

// CONTACT PAGE
import Contact from "./Component/Contact/Contact";

// AUTH PAGE
import Auth from "./Component/Auth/Auth";

// REGISTER PAGE
import Register from "./Component/Register/Register";

// DASHBOARD
import EnterpriseDashboard from "./Component/EnterpriseDashboard/EnterpriseDashboard";
import FarmerDashboard from "./Component/FarmerDashboard/FarmerDashboard";

// PRODUCTS PAGE
import AllProducts from "./Component/AllProducts/AllProducts";

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Process />
      <Campaigns />
      <AgricultureBanner />
      <Footer />
      <FloatingAuth />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* HOME */}
        <Route path="/" element={<HomePage />} />

        {/* SOLUTIONS */}
        <Route path="/solutions" element={<Solutions />} />

        {/* CONTACT */}
        <Route path="/contact" element={<Contact />} />

        {/* AUTH */}
        <Route path="/auth" element={<Auth />} />

        {/* REGISTER */}
        <Route path="/register" element={<Register />} />

        {/* DOANH NGHIỆP */}
        <Route path="/enterprise" element={<EnterpriseDashboard />} />

        {/* NÔNG DÂN */}
        <Route path="/farmer" element={<FarmerDashboard />} />

        {/* DANH SÁCH SẢN PHẨM */}
        <Route path="/products" element={<AllProducts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
