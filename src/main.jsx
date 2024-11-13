import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

import HomePage from './HomePage.jsx';
import Rules from './Rules.jsx';
import Header from './Header.jsx';
import MinesweeperGame from './MineSweeperGame.jsx';
import { MinesweeperGameProvider } from './MinesweeperGameProvider.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element:
    <div>
      <Header />
      <HomePage />
    </div>
  },
  {
    path: '/game/:difficulty',
    element:
    
    <MinesweeperGameProvider>
      <Header></Header>
      <MinesweeperGame />
    </MinesweeperGameProvider>
  },
  {
    path: '/rules',
    element:
    <div>
      <Header />
      <Rules />
    </div>
  }

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
