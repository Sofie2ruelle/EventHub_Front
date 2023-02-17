import axios from "axios"
import { useEffect, useState } from "react"
import Loading from "../components/Loading"
import ProductCard from "../components/EventCard"

export const Products = () => {
  const API_URL = "http://localhost:3000/products"

  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("Tout")


  const resetFilter = () => {
    setSearch("")
    setCategory("Tout")
  }



  const fetchProducts = async () => {
      setLoading(true)
     await axios.get(API_URL)
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

   useEffect(() => {
     let result;
     // checker la categorie
     if(category != "Tout" ) {
       result = products.filter((product) => {
         return (
          product.category === category && (
            product.title.toLowerCase().includes(search.toLowerCase()) ||
            product.description.toLowerCase().includes(search.toLowerCase()))
         )
       })

     }else {
      result = products.filter((product) => {
        return (
          product.title.toLowerCase().includes(search.toLowerCase()) ||
          product.description.toLowerCase().includes(search.toLowerCase())
        )
      })
     }
     
     setFilteredProducts(result)

   }, [products, search, category])

    return (

        // La barre comparera avec le titre et la description
        // Le select pour la catégorie
        // les filtre sont cumulables 
        // Afficher un bouton pour effacer les filtres seulement quand
        // ils sont remplis
        <main className="my-10 container mx-auto">
          {/* DESCRIPTION */}
          <div>
            <h3 className="text-2xl font-bold">Faites votre choix</h3>
            <p>Profiter des meilleurs avants ruptures</p>
          </div>
            {/* FORMULAIRE */}
            <div className="my-4 flex gap-6">
              <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="py-2 px-6 leading-none bg-gray-900 text-slate-100  focus:outline-none focus:border-pink-700  border-b-2 border-pink-50"
              placeholder="Clavier Razer..." 
              type="search"  />
              <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
               className="py-2 px-6 bg-gray-900 text-slate-100"
               name="cat"
                id="cat" 
               >
                 <option 
                 value="Tout">Tout</option>
                        <option value="Souris">Souris</option>
                        <option value="Jeux video">Jeux video</option>
                        <option value="Ordinateur">Ordinateur</option>
                        <option value="VR">VR</option>
                        <option value="Casque">Casque</option>
                        <option value="Ecran">Ecran</option>
                        <option value="Clavier">Clavier</option> 

              </select>

              {search.length > 1 && 
              <button
              onClick={resetFilter}
              className="font-bold text-2xl text-pink-700">X</button>
          }

            </div>

             {/* RESULTAT */}
             <div>
               <p>Résultat : <span>{filteredProducts.length}</span></p>
             </div>

              {/* LISTE DES PRODUITS */}
              <div className="mt-10 mb-20 gap-7 sm:grid md:grid-cols-2 xl:grid-cols-4">
            { products.length  && !loading ? filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
            )) : <Loading />}

            </div>


        </main>

      
    )
  }
  