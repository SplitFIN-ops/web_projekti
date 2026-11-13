import { createHashRouter } from "react-router-dom";

import App from "./App";
import Dashboard from "./pages/Dashboard";
import Details from "./pages/Details";
import Watchlist from "./pages/Watchlist";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "coin/:id",
        element: <Details />,
      },
      {
        path: "watchlist",
        element: <Watchlist />,
      },
    ],
  },
]);

export default router;