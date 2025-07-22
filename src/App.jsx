import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import UsersManagement from "./pages/UsersManagement";
import DocumentManagement from "./pages/DocumentManagement";
import SiteSettings from "./pages/SiteSettings";
import SecuritySettings from "./pages/SecuritySettings";
import ChangePassword from "./pages/ChangePassword";
import UpdateProfile from "./pages/UpdateProfile";
import UpdatesChecking from "./pages/UpdatesChecking";
import PostsManagement from "./pages/PostsManagement";
import PostsViewing from "./pages/PostsViewing";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<UsersManagement />} />
          <Route path="/posts" element={<PostsManagement />} />
          <Route path="/posts-viewing" element={<PostsViewing />} />
          <Route path="/documents" element={<DocumentManagement />} />
          <Route path="/settings" element={<SiteSettings />} />
          <Route path="/settings/security" element={<SecuritySettings />} />
          <Route path="/settings/password" element={<ChangePassword />} />
          <Route path="/settings/profile" element={<UpdateProfile />} />
          <Route path="/settings/updates" element={<UpdatesChecking />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
