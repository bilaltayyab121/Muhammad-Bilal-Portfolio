import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home.jsx';
import ProjectsPage from "./pages/Projects.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "rgba(12,12,26,0.85)",
            color: "#e2e8f0",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            borderRadius: "14px",
            padding: "12px 14px",
            fontSize: "14px",
          },
          success: {
            iconTheme: { primary: "#22d3ee", secondary: "#0c0c1a" },
          },
          error: {
            iconTheme: { primary: "#f87171", secondary: "#0c0c1a" },
          },
        }}
      />
    </>
  );
}
