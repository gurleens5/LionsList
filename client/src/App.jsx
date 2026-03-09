import { Route, Routes } from "react-router";

import TestHomePage from "./pages/TestHomePage"
import TestObjectsPage from "./pages/TestObjectsPage"
import ListingsPage from "./pages/ListingsPage";
import ListingDetailsPage from "./pages/ListingDetailsPage";

const App = () => {
  return <div>
      <Routes>
          <Route path="/" element={<TestHomePage />} />
          <Route path="/testobjects" element={<TestObjectsPage />} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/listings/:id" element={<ListingDetailsPage />} />
      </Routes>
    </div>
}

export default App
