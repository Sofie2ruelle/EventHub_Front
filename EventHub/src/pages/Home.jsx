import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Loading from "../components/Loading"
import Separateur from "../components/Separateur"

export const Home = () => {

    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(false)


    const fetchEvents = async () => {
        setLoading(true)
       await axios.get("http://localhost:8081/api/events")
             .then((res) => 
             { 
                 setEvents(res.data)   
            }).catch((e) => console.log(e))
            .finally(() => {
                    setLoading(false)
            })
    }
        
    
    useEffect(() => {

     fetchEvents()

    }, [])


    return (
        <main>
        {/* DESCRIPTION */}
        <section className="lg:flex block gap-5 my-44 container mx-auto">
            <div className="lg:w-1/2 w-full flex flex-col justify-between">
                <div className="flex gap-10">
                    <button className="py-4 px-10 bg-pink-700 text-pink-50 shadow-sm shadow-black hover:bg-pink-300 hover:text-gray-900">
                        <Link to={"/login"}>
                            S'inscrire
                        </Link>
                    </button>
                    <button className="py-4 px-10 bg-pink-50 text-pink-700 shadow-sm shadow-black hover:bg-pink-300 hover:text-gray-900">
                        <Link to={"/events"}>
                            Voir tout les événements
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
    
        {/* EVENEMENTS LES PLUS POPULAIRES */}
        <section className="container mx-auto">
            <div>
                <h3 className="text-2xl font-bold">Les Meilleurs événements</h3>
                <p>Profiter des meilleurs événement avant leurs fins</p>
            </div>
            {/* CARDEVENEMENT */}
            <div className="mt-10 mb-20 gap-7 sm:grid md:grid-cols-2 xl:grid-cols-4">
            { events.length  && !loading ? events.slice(-4).map((p) => (
                <EventCard key={p.id} event={p} />
            )) : <Loading />}

            </div>



                
    
        </section>
        {/* SEPATEUR */}
        <Separateur />
    
    </main>
    )
  }