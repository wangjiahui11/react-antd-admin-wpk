import { useRoutes } from 'react-router-dom'
import React from 'react'
import routes from './router/routes'
import './App.css'
import './pages/theme.less'
import RouteGuard from "./router/routeGuard";

function App() {
  const element = useRoutes(routes)
  return (
    <div className="App">
      <RouteGuard>{element}</RouteGuard>
    </div>
  )
}

export default App
