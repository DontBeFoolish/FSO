import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';

import App from './App';
import { NotificationContextProvider } from './contexts/NotificationContext';
import { AuthContextProvider } from './contexts/AuthContext';
import './index.css';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <AuthContextProvider>  
        <App />
      </AuthContextProvider>
    </NotificationContextProvider>
  </QueryClientProvider>
);
