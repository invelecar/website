// Import necessary components and functions from react-router-dom.

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { DataSearch } from "./pages/DataSearch";
import { Login } from "./pages/login";
import { Dashboard } from "./pages/Dashboard";
import { DataSearchByYear } from "./pages/DataSearchByYear";
import { Nosotros } from "./pages/Nosotros";
import { Informes } from "./pages/Informes";
import { Signup } from "./pages/Signup";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const router = createBrowserRouter(
    createRoutesFromElements(
    // CreateRoutesFromElements function allows you to build route elements declaratively.
    // Create your routes here, if you want to keep the Navbar and Footer in all views, add your new routes inside the containing Route.
    // Root, on the contrary, create a sister Route, if you have doubts, try it!
    // Note: keep in mind that errorElement will be the default page when you don't get a route, customize that page to make your project more attractive.
    // Note: The child paths of the Layout element replace the Outlet component with the elements contained in the "element" attribute of these child paths.

      // Root Route: All navigation will start from here.
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

        {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
        <Route path= "/" element={<Home />} />
        <Route path= "/cifras-del-sector" element={<DataSearch />} />
        <Route path= "/cifras-del-sector-por-fecha" element={<DataSearchByYear />} />
        <Route path= "/nosotros" element={<Nosotros />} />
        <Route path= "/informes" element={<Informes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    )
);