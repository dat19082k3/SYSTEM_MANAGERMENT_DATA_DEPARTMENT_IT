import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import {RouterProvider} from "react-router-dom";
import route from "./router/route.tsx";
import {Provider} from "react-redux";
import store from "./states/configureStore.ts";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
          <RouterProvider router={route} future={{
              v7_startTransition: true
          }}></RouterProvider>
      </Provider>
  </StrictMode>,
)
