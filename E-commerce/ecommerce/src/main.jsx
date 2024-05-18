import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
const clientQuery= new QueryClient();
import { CartContextProvider } from './Component/web/cart/Cart';
import { UserContext, UserContextProvider } from './Component/web/userContext/UserContext';


        

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
    <QueryClientProvider client={clientQuery}>
    <UserContextProvider>
    <CartContextProvider>
    <App />
    </CartContextProvider>
    </UserContextProvider>
    </QueryClientProvider>
    </>
    )
