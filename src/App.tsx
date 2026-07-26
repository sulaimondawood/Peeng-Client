
import { BrowserRouter as Router } from 'react-router-dom';
import { StateProvider } from './context/StateContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from './pages/dashboard/components/ToastContainer';
import { AuthProvider } from './context/AuthContext';
import { AppRoutes } from './utils/routes/routes';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});


export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StateProvider>
        <AuthProvider>
          <Router>
            <AppRoutes />
            <ToastContainer />
          </Router>
        </AuthProvider>
      </StateProvider>
    </QueryClientProvider>
  );
}