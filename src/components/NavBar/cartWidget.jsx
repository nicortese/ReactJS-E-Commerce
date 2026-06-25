import React, { useContext } from 'react'
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import Badge from '@mui/material/Badge';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';

function CartIcon() {
    const { totalItems } = useContext(CartContext);

    return(
        <Link to='/cart' style={{ display: 'flex' }}>
        <IconButton aria-label="carrito">
            <Badge badgeContent={totalItems} showZero={false}>
                <ShoppingCartRoundedIcon sx={{ color: '#ffffff' }}/>
            </Badge>
        </IconButton>
        </Link>
    );
}

export default CartIcon
