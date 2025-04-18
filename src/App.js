import { Route, Routes, useLocation } from "react-router-dom";
import Index from "./pages/index";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './asset/scss/style.scss'
import './asset/css/materialdesignicons.min.css';
import Footer from "./components/footer";
import ScrollTop from "./components/scrollTop";
import IndexTwo from "./pages/index/index-two"
import IndexThree from "./pages/index/index-three";
import IndexFour from "./pages/index/index-four";
import IndexFive from "./pages/index/index-five";
import IndexSix from "./pages/index/index-six";
import IndexSeven from "./pages/index/index-seven";
import Buy from "./pages/buy";
import Sell from "./pages/sell";
import Grid from "./pages/listing/grid";
import GridSidebar from "./pages/listing/grid-sidebar";
import List from "./pages/listing/list";
import ListSidebar from "./pages/listing/list-sidebar";
import PropertyDetails from "./pages/listing/property-detail";
import PropertyDetailsTwo from "./pages/listing/property-detail-two";
import AboutUs from "./pages/aboutus";
import Features from "./pages/features";
import Pricing from "./pages/pricing";
import Faqs from "./pages/faqs";
import Terms from "./pages/terms";
import Privacy from "./pages/privacy";
import Blogs from "./pages/blogs";
import BlogSidebar from "./pages/blog-sidebar";
import BlogDetail from "./pages/blog-detail";
import ContactUs from "./pages/contactus";
import AuthLogin from "./pages/auth/auth-login";
import ResetPassword from "./pages/auth/auth-re-password";
import Signup from "./pages/auth/auth-signup";
import Comingsoon from "./pages/Special/comingsoon";
import Maintenance from "./pages/Special/maintenance";
import Error from "./pages/Special/error";
import FinancialSelection from "./pages/Special/financialSelection";
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./components/Logout";
import Profile from "./pages/Profile";

// Adding the FinancialConsideration page
import FinancialConsideration from "./pages/Special/FinancialConsideration";


function App() {
  const location = useLocation()
  return (
    <>
    <Routes>
       <Route path="/" element={<Index />}/>
       <Route path="/index-two" element={<IndexTwo/>}/>
       <Route path="/index-three" element={<IndexThree/>}/>
       <Route path="/index-four" element={<IndexFour/>}/>
       <Route path="/index-five" element={<IndexFive/>}/>
       <Route path="/index-six" element={<IndexSix/>}/>
       <Route path="/index-seven" element={<IndexSeven/>}/>
       <Route path="/buy" element={<Buy/>}/>
       <Route path="/sell" element={<Sell/>}/>
       <Route path="/grid" element={<Grid/>}/>
       <Route path="/grid-sidebar" element={<GridSidebar/>}/>
       <Route path="/list" element={<List/>}/>
       <Route path="/list-sidebar" element={<ListSidebar/>}/>
       <Route path="/comingsoon" element={<Comingsoon/>}/>
       <Route path="/maintenance" element={<Maintenance/>}/>
       <Route path="/property-detail" element={<PropertyDetails/>}/>
       <Route path="/property-detail/:id" element={<PropertyDetails/>}/>
       <Route path="/property-detail-two" element={<PropertyDetailsTwo/>}/>
       <Route path="/aboutus" element={
        <ProtectedRoute><AboutUs/></ProtectedRoute>
       }/>
       <Route path="/auth-login" element={<AuthLogin/>}/>
       <Route path="/auth-signup" element={<Signup/>}/>
       <Route path="/auth-reset-password" element={<ResetPassword/>}/>
       <Route path="/error" element={<Error/>}/>
       <Route path="/logout" element={<Logout/>}/>
       <Route path="/profile" element={
        <ProtectedRoute><Profile/></ProtectedRoute>
       }/>
       <Route path="*" element={<Error/>}/>
       <Route path='/FinancialConsideration/' element={<FinancialConsideration/>}/>
    </Routes>
    <ScrollTop/>
    </>
  );
}

export default App;
