import React, { useState , useContext} from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import styles from "./ItemCount.module.css";
import { CartContext } from '../../Context/CartContext';



function ItemCount({ stock, product, onAdd }) {
  const [count, setCount] = useState(0);

  const { addItem } = useContext(CartContext);
  
  function adding() {
    if (count < stock) {
      setCount(count + 1);
    }
  }
  function subs() {
    if (count > 0) {
      setCount(count - 1);
    }
  }
  const handleClick = () => {
    if (count !== 0){
        addItem({...product, count});
        setCount(0);
        if (onAdd) onAdd();
    }
  }

  if (stock === 0) {
    return <p className={styles.noStock}>Sin stock disponible</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.stepper}>
          <IconButton
            onClick={subs}
            disabled={count === 0}
            className={styles.stepperBtn}
            size="small"
            aria-label="Disminuir cantidad"
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <span className={styles.count}>{count}</span>
          <IconButton
            onClick={adding}
            disabled={count >= stock}
            className={styles.stepperBtn}
            size="small"
            aria-label="Aumentar cantidad"
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </div>
        <Button
          onClick={handleClick}
          variant="contained"
          disabled={count === 0}
          className={styles.addButton}
          size="small"
        >
          Agregar
        </Button>
      </div>
    </div>
  );
}

export default ItemCount;
