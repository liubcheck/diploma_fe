// index.tsx
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {BrowserRouter} from 'react-router-dom';
import cookie from 'js-cookie';
import axios from 'axios';
import {fetchCurrentUser} from './redux/thunks/userThunks';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const Index = () => {
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  useEffect(() => {
    const init = async () => {
      const token = cookie.get('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await store.dispatch(fetchCurrentUser());
      }
      setInitialLoadComplete(true);
    };

    init();
  }, []);

  if (!initialLoadComplete) {
    return <div>Loading...</div>;
  }

  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};

root.render(<Index />);
