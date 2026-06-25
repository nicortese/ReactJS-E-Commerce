import * as React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import styles from './CardItem.module.css';


function MediaCard (props) {
  const {id, name, price, image, brand}=props

  return (
    <Card className={styles.card}>
      <CardActionArea
        component={Link}
        to={`/item/${id}`}
        className={styles.cardAction}
      >
        <CardMedia
          component="img"
          height="180"
          src={image}
          alt={name}
          className={styles.cardMedia}
        />
        <CardContent className={styles.cardContent}>
          {brand && (
            <Typography variant="caption" component="p" className={styles.brand}>
              {brand}
            </Typography>
          )}
          <Typography variant="h5" component="h3" className={styles.productName}>
            {name}
          </Typography>
          <div className={styles.footer}>
            <Typography variant="body2" className={styles.price}>
              $ {price}
            </Typography>
            <span className={styles.viewHint}>
              Ver producto
              <ArrowForwardIcon sx={{ fontSize: 14 }} />
            </span>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MediaCard;
