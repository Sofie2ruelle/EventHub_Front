import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Loading from "../components/Loading"
import ProductCard from "../components/EventCard"
import Separateur from "../components/Separateur"

export const Home = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)


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
        
    
    useEffect(() => {

     fetchProducts()

    }, [])


    return (
        <main>
        {/* DESCRIPTION */}
        <section className="lg:flex block gap-5 my-44 container mx-auto">
            <div className="lg:w-1/2 w-full flex flex-col justify-between">
                <div>
                    <h1 className="text-7xl font-bold mb-5">Des <span className="text-pink-700" >produits</span> rares et exclusifs à portée de clic !</h1>
                    <p className="text-lg">Notre sélection de produits gaming rares et difficiles à trouver ailleurs vous propose les dernières innovations et tendances du monde du jeu vidéo. Chaque article a été soigneusement choisi pour vous offrir une expérience de jeu unique et immersive.</p>
    
                </div>
    
                <div className="flex gap-10">
                    <button className="py-4 px-10 bg-pink-700 text-pink-50 shadow-sm shadow-black hover:bg-pink-300 hover:text-gray-900">
                        <Link to={"/login"}>
                            S'inscrire
                        </Link>
                    </button>
                    <button className="py-4 px-10 bg-pink-50 text-pink-700 shadow-sm shadow-black hover:bg-pink-300 hover:text-gray-900">
                        <Link to={"/produits"}>
                            Voir tout les produits
                        </Link>
                    </button>
                </div>
            </div>
            <div className="lg:w-1/2 w-full">
                <img src="https://images.unsplash.com/photo-1614149484421-dcd8185578cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80" alt="" />
            </div>
    
        </section>
        {/* SEPATEUR */}
        <Separateur />
    
        {/* PRODUITS LES PLUS POPULAIRES */}
        <section className="container mx-auto">
            <div>
                <h3 className="text-2xl font-bold">Les Meilleurs ventes</h3>
                <p>Profiter des meilleurs avant ruptures</p>
            </div>
            {/* CARDPRODUCT */}
            <div className="mt-10 mb-20 gap-7 sm:grid md:grid-cols-2 xl:grid-cols-4">
            { products.length  && !loading ? products.slice(-4).map((p) => (
                <ProductCard key={p.id} product={p} />
            )) : <Loading />}

            </div>



                
    
        </section>
        {/* SEPATEUR */}
        <Separateur />
    
    </main>
    )
  }