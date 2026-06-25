import React, { useState, useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import {
    addDoc,
    collection,
    getFirestore,
    serverTimestamp,
} from "firebase/firestore";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import styles from "./CheckoutForm.module.css";
import { isFirebaseConfigured } from "../../utils/firebase";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: '90%', sm: 420 },
    bgcolor: "#141414",
    border: "1px solid #2a2a2a",
    borderRadius: "8px",
    boxShadow: "0 24px 48px rgba(0, 0, 0, 0.6)",
    p: 4,
};

function CheckoutForm() {
    const { cart, totalPrice, clear } = useContext(CartContext);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    const [checkoutCode, setCheckoutCode] = useState("");
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleClose = () => {
        setOpen(false);
        navigate("/");
    };

    const sendOrder = () => {
        if (!isFirebaseConfigured()) {
            setError(
                "Firebase no está configurado. Agregá las variables REACT_APP_FIREBASE_* en tu entorno de deploy (Vercel → Settings → Environment Variables)."
            );
            return;
        }

        setLoading(true);
        setError(null);

        const order = {
            buyer: { name: name, phone: phone, email: email, address: address },
            items: cart,
            total: totalPrice,
            date: serverTimestamp(),
        };

        const db = getFirestore();
        const ordersRef = collection(db, "orders");

        addDoc(ordersRef, order)
            .then(({ id }) => {
                setCheckoutCode(id);
                clear();
                setOpen(true);
            })
            .catch(() => {
                setError(
                    "No se pudo procesar la orden. Verificá que Firebase esté configurado y que las reglas de Firestore permitan escribir en la colección 'orders'."
                );
            })
            .finally(() => {
                setLoading(false);
            });
    };

    if (cart.length === 0 && !checkoutCode) {
        return (
            <div className={styles.formContainer}>
                <div className={styles.emptyState}>
                    <Alert severity="info">
                        Tu carrito está vacío. Agregá productos antes de finalizar la compra.
                    </Alert>
                    <Button variant="contained" onClick={() => navigate("/")}>
                        Volver a la tienda
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.formContainer}>
            {error && (
                <Alert severity="error" sx={{ mb: 2, maxWidth: 480, width: '100%' }}>
                    {error}
                </Alert>
            )}
            <form
            className={styles.checkoutForm}
            onSubmit={(e) => {
                e.preventDefault();
                sendOrder();
            }}
            >
            <h1 className={styles.titleForm}>Checkout</h1>
            <p className={styles.totalLabel}>Total a pagar: &#36;{totalPrice}</p>

            <div className={styles.fieldGroup}>
                <label htmlFor="name">Nombre</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                    required
                />
            </div>

            <div className={styles.fieldGroup}>
                <label htmlFor="phone">Teléfono</label>
                <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.currentTarget.value)}
                    required
                />
            </div>

            <div className={styles.fieldGroup}>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    required
                />
            </div>

            <div className={styles.fieldGroup}>
                <label htmlFor="address">Dirección</label>
                <input
                    id="address"
                    type="text"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.currentTarget.value)}
                    required
                />
            </div>

            <Button
                type="submit"
                variant="contained"
                disabled={loading || cart.length === 0}
                className={styles.submitButton}
            >
                {loading ? <CircularProgress size={24} sx={{ color: '#000' }} /> : "Finalizar compra"}
            </Button>
            </form>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontWeight: 700, letterSpacing: '0.04em' }}>
                    Orden confirmada
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 1, mb: 1, color: '#a3a3a3', fontSize: '0.875rem' }}>
                    N° de orden:
                </Typography>
                <Typography sx={{ fontFamily: 'monospace', fontSize: '0.9rem', color: '#ffffff', wordBreak: 'break-all' }}>
                    {checkoutCode}
                </Typography>
                <Button sx={{ mt: 3 }} variant="contained" fullWidth onClick={handleClose}>
                    Volver a la tienda
                </Button>
                </Box>
            </Modal>
        </div>
    );
}

export default CheckoutForm;
