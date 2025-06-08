import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Catalog from "./components/Catalog/Catalog";
import CamperDetails from "./components/CamperDetails/CamperDetails";
import NotificationContainer from "./components/NotificationContainer/NotificationContainer";
// import NotFound from "./components/NotFound/NotFound";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<CamperDetails />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </main>
      <NotificationContainer />
    </div>
  );
}

export default App;
