import React from 'react'
import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/itemlistContainer';
import ItemDetailContainer from './components/Card/ItemDetailContainer';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Cart from './components/Cart/Cart'
import CartContextProvider from "./Context/CartContext";
import Footer from './components/Footer/Footer';
import CheckoutForm from './components/Form/CheckoutForm';
import NotFound from './components/NotFound/NotFound';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';




function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartContextProvider>
        <BrowserRouter>
          <div className="appLayout">
            <NavBar/>
            <main className="mainContent">
              <Routes>
                <Route path='/' element={<ItemListContainer/>} />
                <Route path='/category/:category' element={<ItemListContainer/>}/>
                <Route path='/item/:id' element={<ItemDetailContainer/>}/>
                <Route path='/cart' element={<Cart/>}/>
                <Route path="/checkout" element={<CheckoutForm />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer/>
          </div>
        </BrowserRouter>
      </CartContextProvider>
    </ThemeProvider>
  );
}

export default App;
