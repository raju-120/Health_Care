
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { persistor, store } from './redux/store.js';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from 'react-query';
//import {SocketContextProvider} from './context/SocketContext.jsx'
//import { BrowserRouter as Router } from 'react-router-dom';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <Router>
        </Router> */}
          <App />
      </PersistGate>
    </Provider>
  </QueryClientProvider>,
)
