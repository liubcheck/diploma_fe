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
import LoadingPage from './components/LoadingPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const Index = () => {
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  useEffect(() => {
    const init = async () => {
      const token = cookie.get('access_token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await store.dispatch(fetchCurrentUser());
      }
      setInitialLoadComplete(true);
    };

    init();
  }, []);

  if (!initialLoadComplete) {
    return <LoadingPage />;
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
