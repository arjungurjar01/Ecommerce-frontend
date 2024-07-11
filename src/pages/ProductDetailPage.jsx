import React from 'react'
import ProductDetail from '../features/product/ProductDetail'
import Navbar from '../features/navbar/Navbar'

function ProductDetailPage() {
  return (
    <div>
        <Navbar>
        <ProductDetail/>
        </Navbar>
        
    </div>
  )
}

export default ProductDetailPage