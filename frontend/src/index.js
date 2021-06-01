// Importing the Bootstrap CSS (Must come before react components)
import "bootstrap/dist/css/bootstrap.min.css";
//import "./index.css";  <== Keep this in case we want to do some custom CSS later

// React
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
