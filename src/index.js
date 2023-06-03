import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  createRoutesFromElements,
} from "react-router-dom";
import Zone from "./routes/Zone";
import Pharmacie from "./routes/Pharmacie";
import Ville from "./routes/Ville";
import Map from "./routes/Map";
import PharmaDeGarde from "./routes/PharmacieDeGardePage"
import Navbar from "./components/Navbar";
import "./App.css";
import PharmacieDetails from "./routes/pharmacieDetails";
import AddPharmaciePage from "./routes/AddPharmacieForm";
import Register from "./routes/register";
import Login from "./routes/login"

const AppLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Pharmacie />,
      },
      {
        path: "zones",
        element: <Zone />,
      },
      {
        path: "villes",
        element: <Ville />,
      },
      {
        path: "map",
        element: <Map />,
      },
      {
        path: "pharmadegarde",
        element: <PharmaDeGarde />,
      },
      {
        path: "PharmacieDetails/:id",
        element: <PharmacieDetails />,
      },
      {
        path: "pharmacies/add",
        element: <AddPharmaciePage />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
