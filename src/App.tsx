import Carousel from "./components/Carousel";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>React Carousel Demo</h1>
        <p>A fully accessible image carousel with modern styling</p>
      </header>

      <main className="app-main">
        <Carousel autoplay={true} autoplayInterval={3000} />

        <div className="features-section">
          <h2>Features</h2>
          <ul>
            <li>5 beautiful slides images</li>
            <li>Next/Previous navigation buttons</li>
            <li>Active slide indicators with borders</li>
            <li>5-second autoplay with play/pause control</li>
            <li>Responsive design</li>
          </ul>
        </div>

        <div className="accessibility-section">
          <h2>Accessibility Features</h2>
          <ul>
            <li>
              <strong>Keyboard Navigation:</strong> Arrow keys for previous and next, Space for play/pause
            </li>
            <li>
              <strong>Screen Reader:</strong> ARIA labels and roles
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
