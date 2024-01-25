import Home from "./pages/home/Home";
import "./index.css";
import "./utils/all.min.css";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, merchantsInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import NewMerchent from "./pages/newMerchent/NewMerchent";
import Merchents from "./pages/Merchents/Merchents";
import ListMerchents from "./pages/list merchents/List";
import NewProduct from "./pages/newProduct/NewProduct";
import ListProduct from "./pages/list product/List";
import ProducElementList from "./pages/list ProductElement/ProducElementList";
import MerchentElementList from "./pages/list merchentElement/List";
import ListCustomers from "./pages/list customers/ListCustomers";
import ListCustomer from "./pages/list customer/ListCustomer";
import { Toaster } from "react-hot-toast";

function App() {
  const displayError = true;
  const { darkMode } = useContext(DarkModeContext);

  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="merchants">
              <Route
                index
                element={
                  <RequireAuth>
                    <ListMerchents />
                  </RequireAuth>
                }
              />
              <Route
                path=":userId"
                element={
                  <RequireAuth>
                    {/* <Single /> */}
                    <MerchentElementList />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    {/* <New inputs={merchantsInputs} title="Add New Merchant" /> */}
                    <NewMerchent />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="products">
              <Route
                index
                element={
                  <RequireAuth>
                    {/* <List /> */}
                    <ListProduct />
                  </RequireAuth>
                }
              />
              <Route
                path=":productId"
                element={
                  <RequireAuth>
                    <ProducElementList />
                    {/* <Single /> */}
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    {/* <New inputs={productInputs} title="Add New Product" /> */}
                    <NewProduct />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="customers">
              <Route
                index
                element={
                  <RequireAuth>
                    {/* <List /> */}
                    <ListCustomers />
                  </RequireAuth>
                }
              />
              <Route
                path=":customerId"
                element={
                  <RequireAuth>
                    <ListCustomer />
                    {/* <Single /> */}
                  </RequireAuth>
                }
              />
            </Route>

            <Route path="order">
              <Route
                index
                element={
                  <RequireAuth>
                    <List />
                    {/* <ListProduct /> */}
                  </RequireAuth>
                }
              />
              <Route
                path=":productId"
                element={
                  <RequireAuth>
                    <Single />
                    {/* <ProducElementList /> */}
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    {/* <New inputs={productInputs} title="Add New Product" /> */}
                    <NewProduct />
                  </RequireAuth>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center"/>
    </div>
  );
}

export default App;
