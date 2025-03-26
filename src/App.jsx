import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <NavBar />
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </>
  );
}

export default App;
