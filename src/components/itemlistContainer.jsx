import React, { useEffect, useState } from 'react'
import ItemList from './Card/ItemList';
import Hero from './Hero/Hero';
import styles from "./ItemListContainer.module.css";
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { getProducts, CATEGORY_LABELS } from '../services/dummyJsonProducts';

const categorySubtitles = {
  remeras: 'Remeras de marcas como Fashion Trends, Urban Chic y más',
  hoodies: 'Tops y buzos seleccionados para tu estilo',
  sneakers: 'Nike, Puma y Off White — directo desde el catálogo',
};

function ItemListContainer (){
    const [items, setItems]= useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const {category}= useParams();
    const isHome = !category;

    const pageTitle = category ? CATEGORY_LABELS[category] || category : 'Todos los productos';
    const pageSubtitle = category
      ? categorySubtitles[category] || `Explorá nuestra colección de ${CATEGORY_LABELS[category]?.toLowerCase() || category}`
      : `${items.length} productos disponibles`;

    useEffect(() => {
        setLoading(true);
        setError(null);

        getProducts(category)
            .then(setItems)
            .catch((err) => {
                setError(err.message || 'No se pudieron cargar los productos. Intentá de nuevo más tarde.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [category]);


    if (loading) {
        return (
            <Box className={styles.statusContainer}>
                <CircularProgress sx={{ color: '#ffffff' }} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box className={styles.statusContainer}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    if (items.length === 0) {
        return (
            <div className={styles.container}>
                {isHome && <Hero />}
                <header className={styles.pageHeader}>
                    <h1 className={styles.pageTitle}>{pageTitle}</h1>
                </header>
                <Box className={styles.statusContainer}>
                    <Alert severity="info">No hay productos disponibles en esta categoría.</Alert>
                </Box>
            </div>
        );
    }

    return(
        <div className={styles.container}>
            {isHome && <Hero />}
            <header className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>{pageTitle}</h1>
                <p className={styles.pageSubtitle}>{pageSubtitle}</p>
            </header>
            <div className={styles.itemliststyle}>
                <ItemList products={items}/>
            </div>
        </div>
    )

}

export default ItemListContainer
