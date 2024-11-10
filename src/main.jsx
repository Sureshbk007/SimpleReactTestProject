import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { BlogList, LoginForm, ProtectedRoute } from "./components/index.js";
import { AuthProvider } from "./context/AuthContent.jsx";
// Router setup
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<LoginForm />} />
      <Route
        path="blogs"
        element={
          <ProtectedRoute>
            <BlogList />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);

// Render the app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
