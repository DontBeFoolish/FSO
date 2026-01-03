import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { NotificationContextProvider } from './contexts/NotificationContext';
import { AuthContextProvider } from './contexts/AuthContext';
import App from './App';

import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <NotificationContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </NotificationContextProvider>
    </QueryClientProvider>
  </Router>,
);
