import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from './routes';
import './App.css';
const renderRoute = (route) =>
  route.children && route.children.length > 0 ? (
    <Route key={route.path} path={route.path} element={route.element}>
      {route.children.map(renderRoute)}
    </Route>
  ) : (
    <Route key={route.path} path={route.path} element={route.element} />
  );
function App() {
  return (
    <BrowserRouter>
      <Routes>{routes.map(renderRoute)}</Routes>
    </BrowserRouter>
  );
}

export default App;
