import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Loading from '../components/Loading'

const ProductDetails = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const params = useParams()
 



    const fetchProducts = async () => {
        setLoading(true)
       await axios.get("http://localhost:3000/products")
             .then((res) => 
             { 
                 setProducts(res.data)   
            }).catch((e) => console.log(e))
            .finally(() => {
                    setLoading(false)
            })
    }

    const currentProduct = products.find((p) => p.slug === params.slug)
        
    
    useEffect(() => {

     fetchProducts()

    }, [])

  return (
    <main className='container mx-auto'>
            {
                currentProduct && !loading ?
                    <>
                        <div className='py-4'>
                            <BackButton />
                        </div>

                        <div className="flex">
                            <div className="w-1/2">
                                <img src={currentProduct.image} alt={currentProduct.title} />
                            </div>
                            <div className="w-1/2 pl-10 flex flex-col justify-between">
                                <div>
                                <h2 className="text-5xl font-bold mb-5">{currentProduct.title}</h2>
                                <div className="mb-3">
                                    <p className="mb-3 font-bold text-xl">Description: </p>
                                    <p>{currentProduct.description}</p>
                                </div>

                                <div className="mb-3">
                                    <p className="mb-3 font-bold text-xl">Catégorie: </p>
                                    <p>{currentProduct.category}</p>
                                </div>

                                </div>
                                
                         
                                <div className='flex justify-between'>
                                    <p className="text-6xl font-bold">{currentProduct.price} <span className='text-pink-700'>$</span></p>
                                    <button
    
                                        className='py-2 px-6 bg-pink-700 text-pink-50 shadow-sm shadow-black hover:bg-pink-300 hover:text-gray-900'
                                    >+</button>
                                </div>

                            </div>
                        </div>

                    </> :
                    <div className='flex justify-center'>
                        <Loading />
                    </div>
            }

        </main>

  )
}

export default ProductDetails