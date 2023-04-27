import './App.css';
import { useRoutes } from 'react-router-dom';
import Book from './components/Book';
import User from './components/User';
import Login from './components/Login';

const App = () => {
  
  const routes = useRoutes ([
    {
      path: 'book',
      element: <Book />
    },
    {
      path: 'user',
      element: <User />,
    },
    {
      path: '',
      element: <Login />
    },
  ]);
  return routes;
}

export default App;
