import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { CartProvider } from './contexts/CartContext'
import { AuthProvider } from './contexts/AuthContext'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <Router>
      <CartProvider>
        <AuthProvider>
          <AppRoutes />
          <Toaster 
            position="top-center"
            toastOptions={{
              style: {
                background: '#1A1A1A',
                color: '#fff',
                border: '1px solid #333',
              },
              success: {
                iconTheme: {
                  primary: '#F05A28',
                  secondary: '#fff',
                },
              },
            }}
          />
        </AuthProvider>
      </CartProvider>
    </Router>
  )
}

export default App
