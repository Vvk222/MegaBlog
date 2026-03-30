import React from "react";
import { Login as LoginComponent } from "../components";

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <LoginComponent />
    </div>
  );
}

export default Login;