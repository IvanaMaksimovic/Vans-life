
// Currently I'm looking at the new "loader" feature and how to integrate it in my application. But the loaders
// do not work for nested <Routes />. The documentation says:

// "If you're using a data router like createBrowserRouter it is uncommon to use this component as it does not participate in data loading."

// So this is the way I've done my application.


import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Link, BrowserRouter } from "react-router-dom";

import "./server";

import Home from "./pages/Home";
import About from "./pages/About";
import Vans, { loader as vansLoader} from "./pages/vans/Vans";
import Error from './components/Error';
import VanDetail, {loader as vanDetailLoader} from './pages/vans/VanDetail';
import Layout from "./components/Layout";
import Dashboard from './pages/host/Dashboard';
import Income from './pages/host/Income';
// import Reviews from './pages/host/Reviews';
import HostLayout from './components/HostLayout';
import HostVans, {loader as hostVansLoader} from './pages/host/HostVans';
import HostVanDetail, {loader as hostVanDetailLoader} from './pages/host/HostVanDetail';
import HostVanPhotos from './pages/host/HostVanPhotos';
// import Login from './pages/Login';
import HostVanInfo from './pages/host/HostVanInfo';
import HostVanPricing from './pages/host/HostVanPricing';
import NotFound from './pages/NotFound';
import ContentNotAvailable from './components/ContentNotAvailable';
import Reviews from './pages/host/Reviews/index';

const router = createBrowserRouter(createRoutesFromElements(
<Route path="/" element={<Layout />}>
  <Route index element={<Home />} />
  <Route path="about" element={<About />} />
  {/* <Route path="login" element={<Login />}/> */}
  <Route path="vans" element={<Vans />} errorElement={< Error />} loader={vansLoader} />
  <Route loader={vanDetailLoader} path="vans/:id" element={<VanDetail />} />
  <Route path="contentNotAvailable" element={ <ContentNotAvailable />} />


<Route path="host" element={<HostLayout />} >
  <Route 
   index element={<Dashboard />} />
  <Route
   path="income" element={<Income />} />
  <Route
   path="reviews" element={<Reviews />} />
  <Route
   loader={hostVansLoader} 
   path="vans" element={<HostVans />} />
  <Route
   loader={hostVanDetailLoader} 
   path="vans/:id" element={<HostVanDetail />} >
    <Route 
    index element={<HostVanInfo />}/>
    <Route 
    path="pricing" element={<HostVanPricing/>}/>
    <Route 
    path="photos" element={<HostVanPhotos/>} />
  </Route>
</Route>
<Route path="*" element={< NotFound />} />
</Route>
))

function App() {
  return (
    <RouterProvider router={router} />
  )
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App />);

