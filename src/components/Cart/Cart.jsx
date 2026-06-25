import Button from "@mui/material/Button";
import React, { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import styles from "./Cart.module.css";
import { useNavigate} from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";


const Cart = () => {
  const { cart, removeItem, clear, totalPrice } = useContext(CartContext);

  const history = useNavigate()

  return (
    <div className={styles.cartPage}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Carrito ({cart.length})</h2>
        <Button variant="outlined" onClick={() => clear()} disabled={cart.length === 0}>
          Limpiar carrito
        </Button>
      </div>
      <div>
        {cart.length === 0 && (
          <div className={styles.texts}>
            <h2 className={styles.emptyTitle}>El carrito está vacío</h2>
            <Button variant="contained" onClick={()=>history("/")}>
              Volver a la tienda
            </Button>
          </div>
        )}
      </div>
      {cart.length > 0 &&
        cart.map((p) => (
          <div key={p.id} className={styles.items}>
            <div className={styles.image}>
              <img src={p.image} alt={p.name} />
            </div>
            <div className={styles.about}>
              <h3 className={styles.nombre}>{p.name}</h3>
              <p className={styles.description}>{p.description}</p>
              <p className={styles.meta}>Precio unitario: &#36;{p.price}</p>
              <p className={styles.meta}>Cantidad: {p.count}</p>
              <p className={styles.meta}>Subtotal: &#36;{p.price * p.count}</p>
            </div>
            <DeleteOutlineIcon
              className={styles.deleteIcon}
              onClick={() => removeItem(p.id)}
            />
          </div>
        ))}
      {cart.length > 0 && (
        <div className={styles.texts}>
          <h2 className={styles.total}>Total: &#36;{totalPrice}</h2>
          <Button variant="contained" onClick={()=>history("/checkout")}>
            Finalizar compra
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
