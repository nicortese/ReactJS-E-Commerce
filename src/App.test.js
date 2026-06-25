import { render, screen, fireEvent, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import NotFound from './components/NotFound/NotFound';
import CartContextProvider, { CartContext } from './Context/CartContext';
import React, { useContext } from 'react';

const renderNavBar = () => {
  render(
    <CartContextProvider>
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    </CartContextProvider>
  );
};

function CartTester() {
  const { cart, addItem, totalPrice, totalItems, removeItem } = useContext(CartContext);

  return (
    <div>
      <button
        type="button"
        onClick={() =>
          addItem({ id: '1', name: 'Test Shoe', price: 100, count: 2, image: '/test.jpg' })
        }
      >
        Agregar
      </button>
      <button type="button" onClick={() => removeItem('1')}>
        Eliminar
      </button>
      <span data-testid="cart-count">{cart.length}</span>
      <span data-testid="total-price">{totalPrice}</span>
      <span data-testid="total-items">{totalItems}</span>
    </div>
  );
}

beforeEach(() => {
  localStorage.clear();
});

test('renders store name in navbar', () => {
  renderNavBar();
  expect(screen.getByRole('link', { name: /Cop´r Drop/i })).toBeInTheDocument();
});

test('renders category links in navbar', () => {
  renderNavBar();
  const nav = document.querySelector('.navLinks');
  expect(within(nav).getByText('Remeras')).toBeInTheDocument();
  expect(within(nav).getByText('Hoodies')).toBeInTheDocument();
  expect(within(nav).getByText('Sneakers')).toBeInTheDocument();
});

test('renders 404 page', () => {
  render(
    <BrowserRouter>
      <NotFound />
    </BrowserRouter>
  );
  expect(screen.getByText(/404/i)).toBeInTheDocument();
  expect(screen.getByText(/Página no encontrada/i)).toBeInTheDocument();
});

test('cart adds items and calculates totals', () => {
  render(
    <CartContextProvider>
      <CartTester />
    </CartContextProvider>
  );

  fireEvent.click(screen.getByText('Agregar'));

  expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
  expect(screen.getByTestId('total-price')).toHaveTextContent('200');
  expect(screen.getByTestId('total-items')).toHaveTextContent('2');
});

test('cart persists items in localStorage', () => {
  render(
    <CartContextProvider>
      <CartTester />
    </CartContextProvider>
  );

  fireEvent.click(screen.getByText('Agregar'));

  const saved = JSON.parse(localStorage.getItem('coprdrop_cart'));
  expect(saved).toHaveLength(1);
  expect(saved[0].count).toBe(2);
});
