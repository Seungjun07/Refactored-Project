import "./App";
import RootRoute from "./root-route.js";

function App() {
  if (
    window.innerWidth <= 768 ||
    /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent)
  ) {
    document.body.style.zoom = 100 + "%";
  } else {
    document.body.style.zoom = 100 + "%";
  }

  return <RootRoute />;
}

export default App;
