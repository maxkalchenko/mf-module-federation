import React from "react";

const RemoteComponent = React.lazy(() => import("app2/RemoteComponent"));

function App() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      width: "100%",
      justifyContent: "center",
      position: "absolute",
      margin: -8,
      backgroundColor: "#282c34",
      color: "#61dafb",
      textAlign: "center",
      fontFamily: "sans-serif",
    }}>
      <h1 style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        border: "1px dashed #61dafb",
        margin: 16,
      }}>
        Application One
      </h1>
      <React.Suspense fallback="Loading Remote Component...">
        <RemoteComponent />
      </React.Suspense>
    </div>
  );
}

export default App;
