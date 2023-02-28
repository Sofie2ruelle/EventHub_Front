import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

// Liste tout les événements d'un utilisateur.
export const ListEventsUser = () => {

    const URL = "http://localhost:8081/api/events/";
    const URI_GetEvents = "events-by-user/" 
    const pathEvent= "/events/";
    const navigation = useNavigate();
    const user=JSON.parse(localStorage.getItem("user"));
    const [events, setEvents]=useState([])
    const [loading, setLoading]=useState(false);

    // Récupération de tous les événements d'un utilisateur.
    const fetchEvents = async()=>{
        setLoading(true)
        await axios.get(URL+URI_GetEvents+user.id)
        .then((res)=>{
            setEvents(res.data);
        })
        .catch((e)=>{console.log(e);})
        .finally(()=>{setLoading(false)})
    } 
    
    // Suppression d'un événement.
    const deleteEvent = async (event) => {
        setLoading(true)
        await axios.delete(URL+event.id)
        .then((res)=>{
            fetchEvents()
        })
        .catch((e)=>{console.log(e);})
        .finally(()=>{setLoading(false)})
    }
    
    // Aller à la page de création ou d'édition d'un événemnet.
    const goToCreateUpdateEvent = (event) => {
        let slug = pathEvent;
        event != null ? (slug+="editer-un-evenement/"+event.id) : (slug+="creer-un-evenement")
        console.log(slug);
        navigation(slug);
    }

    // Aller à la page de détail d'un événement.
    const goToReadEvent = (event) => {
        const slug=pathEvent + event.titre.replaceAll(/[` .!?`]/gi, '-').toLowerCase()+event.id
        navigation(slug)
    }
   
    
    useEffect(()=>{
        fetchEvents();
    }, [])

    return (
    <div>
        <div className='py-4'>
            <BackButton path={"/user-detail"} />
        </div>
        <div className="container max-w-7xl mx-auto mt-8">
        <div className="mb-4">
            <h1 className="font-serif text-3xl font-bold underline decoration-gray-400">Liste des événements</h1>
            <div className="flex justify-end">
                <button onClick={()=>goToCreateUpdateEvent()} className="px-4 py-2 rounded-md bg-sky-500 text-sky-100 hover:bg-sky-600">Créer un événement</button>
            </div>
        </div>
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                <table className="min-w-full">
                <thead>
                    <tr>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Image</th>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Titre</th>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Résumé</th>
                    <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Date de l'événement</th>
                    <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50" colSpan="3">
                        Action</th>
                    </tr>
                </thead>

                <tbody className="bg-white">
                {events.map((event)=>
                    <tr key={event.id}>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="text-sm leading-5 text-gray-900">
                            <img width={60} height={60} src={`data:image/jpeg;base64,${event.img}`} alt={event.titre}/>
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <p>{event.titre}</p>
                    </td>
                    <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                        <span>{event.resume}</span>
                    </td>
                    <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                        <span>{event.date_event.replace('T', ' ')}</span>
                    </td>

                    <td className="text-sm font-medium leading-5 text-center whitespace-no-wrap border-b border-gray-200 ">
                        <button onClick={()=>goToCreateUpdateEvent(event)} className="text-indigo-600 hover:text-indigo-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        </button>
                    </td>

                    <td className="text-sm font-medium leading-5 text-center whitespace-no-wrap border-b border-gray-200 ">
                        <button onClick={()=>goToReadEvent(event)} className="text-gray-600 hover:text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        </button>
                    </td>

                    <td className="text-sm font-medium leading-5 text-center whitespace-no-wrap border-b border-gray-200 ">
                        <button onClick={()=>deleteEvent(event)} className="text-gray-600 hover:text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-600 hover:text-red-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        </button>
                    </td>
                    </tr>
                    )}
                </tbody>
                </table>
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}
