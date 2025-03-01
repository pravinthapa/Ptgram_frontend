import react from "react";
import RouteHandler from "./RouteHandler";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <div>
        <RouteHandler />
        <ToastContainer />
      </div>
    </>
  );
}
