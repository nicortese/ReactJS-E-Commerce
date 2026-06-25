import React from 'react'
import MediaCard from './CardItem'

function ItemList({products}) {
  return (
    products.map(p =>(
        <MediaCard
        key={p.id}
        id={p.id}
        name={p.name}
        price={p.price}
        image={p.image}
        brand={p.brand}
        />
    ))
  )
}

export default ItemList