import React, { useState } from 'react'
import ItemCount from './ItemCount';
import { useNavigate, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import styles from './ItemDetail.module.css';
import { CATEGORY_LABELS } from '../../services/dummyJsonProducts';

const ItemDetail = ({ product }) => {
    
    const [addedToCart, setAddedToCart] = useState(false)
    const [selectedImage, setSelectedImage] = useState(0)
    
    const navigate = useNavigate()

    const { name, price, image, images, description, stock, brand, category, rating } = product;

    const gallery = images?.length ? images : [image];
    const categoryLabel = CATEGORY_LABELS[category] || category;
    const categoryPath = category ? `/category/${category}` : '/';

    function handleOnAdd(){
        setAddedToCart(true)
    }

    function handleBack() {
        navigate(-1);
    }

    function getStockBadge() {
        const qty = stock ?? 0;
        if (qty === 0) return { label: 'Sin stock', className: styles.stockOut };
        if (qty <= 5) return { label: `Últimas ${qty} unidades`, className: styles.stockLow };
        return { label: `${qty} disponibles`, className: styles.stockAvailable };
    }

    const stockBadge = getStockBadge();

    return(
        <article className={styles.detailPage}>
            <div className={styles.topBar}>
                <Button
                    className={styles.backButton}
                    onClick={handleBack}
                    startIcon={<ArrowBackIcon fontSize="small" />}
                >
                    Volver
                </Button>

                <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                    <Link to="/" className={styles.breadcrumbLink}>Inicio</Link>
                    <span className={styles.breadcrumbSep}>/</span>
                    <Link to={categoryPath} className={styles.breadcrumbLink}>{categoryLabel}</Link>
                    <span className={styles.breadcrumbSep}>/</span>
                    <span className={styles.breadcrumbCurrent}>{name}</span>
                </nav>
            </div>

            <div className={styles.grid}>
                <section className={styles.gallery} aria-label="Imágenes del producto">
                    <div className={styles.mainImageWrap}>
                        <img
                            src={gallery[selectedImage]}
                            alt={name}
                            className={styles.mainImage}
                        />
                    </div>
                    {gallery.length > 1 && (
                        <div className={styles.thumbnails}>
                            {gallery.map((img, index) => (
                                <button
                                    key={img}
                                    type="button"
                                    className={`${styles.thumbnail} ${index === selectedImage ? styles.thumbnailActive : ''}`}
                                    onClick={() => setSelectedImage(index)}
                                    aria-label={`Ver imagen ${index + 1}`}
                                    aria-current={index === selectedImage ? 'true' : undefined}
                                >
                                    <img src={img} alt="" />
                                </button>
                            ))}
                        </div>
                    )}
                </section>

                <section className={styles.info}>
                    {brand && <p className={styles.brand}>{brand}</p>}
                    <h1 className={styles.productName}>{name}</h1>

                    <div className={styles.meta}>
                        {rating != null && (
                            <span className={styles.rating}>
                                <StarIcon sx={{ fontSize: 18, color: '#d4d4d4' }} />
                                {rating.toFixed(1)}
                            </span>
                        )}
                        <span className={styles.categoryTag}>{categoryLabel}</span>
                    </div>

                    <p className={styles.productDescription}>{description}</p>

                    <div className={styles.purchasePanel}>
                        <div className={styles.priceRow}>
                            <p className={styles.productPrice}>&#36;{price}</p>
                            <span className={`${styles.stockBadge} ${stockBadge.className}`}>
                                {stockBadge.label}
                            </span>
                        </div>

                        <hr className={styles.divider} />

                        <div className={styles.actions}>
                            {!addedToCart ? (
                                <ItemCount
                                    product={product}
                                    stock={stock ?? 0}
                                    onAdd={handleOnAdd}
                                />
                            ) : (
                                <div className={styles.successBox}>
                                    <p className={styles.successText}>
                                        <CheckCircleOutlineIcon sx={{ fontSize: 16, verticalAlign: 'text-bottom', mr: 0.5 }} />
                                        Producto agregado al carrito
                                    </p>
                                    <div className={styles.successActions}>
                                        <Button variant="outlined" onClick={handleBack}>
                                            Seguir comprando
                                        </Button>
                                        <Button variant="contained" onClick={() => navigate('/cart')}>
                                            Ir al carrito
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </article>
    )
};

export default ItemDetail;
