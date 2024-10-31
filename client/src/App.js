import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CreateListing from "./pages/CreateListing";
import ListingDetails from "./pages/ListingDetails";
 
import PropertyList from "./pages/PropertyList"; 
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import SuccessPage from "./pages/SuccessPage";
import Dashboard from "./pages/Dashboard";
import PropertyBuyPage from "./pages/PropertyBuyPage";
import ContactPropertyOwner from "./pages/ContactPropertyOwner";
import ChatPage from "./pages/Chat";
import PaymentDetails from "./pages/PaymentDetails";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/properties/:listingId" element={<ListingDetails />} />
          <Route path="/properties/category/:category" element={<CategoryPage />} />
          <Route path="/properties/search/:search" element={<SearchPage />} />
          <Route path="/:userId/properties" element={<PropertyList />} /> 
          <Route path="/successfully-listed-property" element={<SuccessPage/>} />
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/property-search" element={<PropertyBuyPage/>}/>
          <Route path='/users/contact-property-owner' element={<ContactPropertyOwner/>} />
          {/* <Route path="/chat-with-owner" element={<ChatPage/>} /> */}

          <Route path="/payment/details" element={<PaymentDetails/>} />
           
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
