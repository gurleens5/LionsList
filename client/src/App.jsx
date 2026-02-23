import { Route, Routes } from "react-router";

import TestHomePage from "./pages/TestHomePage"
import TestObjectsPage from "./pages/TestObjectsPage"

const App = () => {
  return <div>
      <Routes>
          <Route path="/" element={<TestHomePage />} />
          <Route path="/testobjects" element={<TestObjectsPage />} />
      </Routes>
    </div>
}

export default App
