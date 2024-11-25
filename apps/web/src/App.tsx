import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "./providers/Authentication";

const router = createBrowserRouter([
  {
    path: "/",
    lazy: () => import("./pages/home").then((m) => ({ Component: m.HomePage })),
  },
  {
    path: "/register",
    lazy: () =>
      import("./pages/register").then((m) => ({ Component: m.RegisterPage })),
  },
  {
    path: "/login",
    lazy: () =>
      import("./pages/login").then((m) => ({ Component: m.LoginPage })),
  },
]);

function App() {
  return (
    <React.Fragment>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster richColors={true} />
      </AuthProvider>
    </React.Fragment>
  );
}

export default App;
