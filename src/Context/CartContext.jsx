import React, {createContext, useState, useEffect} from "react";

export const CartContext = createContext();

const CART_STORAGE_KEY = 'coprdrop_cart';

function loadCartFromStorage() {
    try {
        const saved = localStorage.getItem(CART_STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
}

const CartContextProvider = ({children}) => {

    const [cart, setCart] = useState(loadCartFromStorage);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        let total = 0;
        let items = 0;
        cart.forEach(item => {
            total += item.count * item.price;
            items += item.count;
        });
        setTotalPrice(total);
        setTotalItems(items);
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }, [cart]);

    const addItem = (item) =>{
        const indexProduct = cart.findIndex((cartItem)=> cartItem.id === item.id);
        if(indexProduct !== -1){
            const newCart = [...cart];
            newCart[indexProduct].count = newCart[indexProduct].count + item.count;
            setCart(newCart);
        } else {
            setCart([...cart, item]);
        }
    };

    const removeItem = (id) =>{
        setCart(cart.filter((products) => products.id !== id ));
    };

    const clear = () => setCart([]);

    return(
        <CartContext.Provider value={{cart, addItem, removeItem, clear, totalPrice, totalItems}}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;
