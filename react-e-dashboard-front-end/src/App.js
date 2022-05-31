import './App.css';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Nav from './components/Nav'
import Footer from './components/Footer'
import Login from "./components/Login"
import SignUp from './components/SignUp'
import AddProducts from './components/AddProducts'
import ProductList from './components/ProductList'
import UpdateProduct from './components/UpdateProduct'
import PrivateComponent from './components/PrivateComponent';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<ProductList />} />
            <Route path="/add" element={<AddProducts />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/logout" element={<h1>logout componet</h1>} />
            <Route path="/profile" element={<h1>profile componet</h1>} />
          </Route>

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
