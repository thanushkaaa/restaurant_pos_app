import './App.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from './pages/HomePage';
import TablePage from "./pages/TablePage"


const router = createBrowserRouter([
  {path: "/", element: <HomePage restaurantName={" HOTEL ALPHA "}/>},
  {path: "/:tableId", element: <TablePage />}
])

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
