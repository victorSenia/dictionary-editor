import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import "ag-grid-community/styles/ag-theme-alpine.css";
import AppLayout from "./components/AppLayout";
import { useAppController } from "./hooks/useAppController";
import "./App.css";

ModuleRegistry.registerModules([AllCommunityModule]);

function App() {
  const controller = useAppController();
  return <AppLayout controller={controller} />;
}

export default App;
