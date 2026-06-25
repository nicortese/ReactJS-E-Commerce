import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import styles from './NotFound.module.css';

function NotFound() {
  return (
    <div className={styles.container}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>Página no encontrada</h1>
      <p className={styles.message}>
        La página que buscás no existe o fue movida.
      </p>
      <Button component={Link} to="/" variant="contained">
        Volver al inicio
      </Button>
    </div>
  );
}

export default NotFound;
