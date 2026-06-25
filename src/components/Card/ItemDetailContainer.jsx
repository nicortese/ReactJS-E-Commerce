import React, { useEffect, useState } from 'react';
import ItemDetail from './ItemDetail';
import { useNavigate, useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from "../ItemListContainer.module.css";
import { getProductById } from '../../services/dummyJsonProducts';

const ItemDetailContainer = () =>{
    const [product, setProduct] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        setError(null);

        getProductById(id)
            .then(setProduct)
            .catch((err) => {
                setError(err.message || 'No se pudo cargar el producto. Intentá de nuevo más tarde.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <Box className={styles.statusContainer}>
                <CircularProgress sx={{ color: '#ffffff' }} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box className={styles.statusContainer} sx={{ flexDirection: 'column', gap: 2 }}>
                <Alert severity="error">{error}</Alert>
                <Button
                    startIcon={<ArrowBackIcon />}
                    variant="outlined"
                    onClick={() => navigate(-1)}
                >
                    Volver
                </Button>
            </Box>
        );
    }

    return <ItemDetail product={product} />;
};

export default ItemDetailContainer;
