import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'

export const EditCreateEvent = () => {

    const params=useParams();
    const URL = "http://localhost:8081/api/events/"+params.id;
    
    const [loading, setLoading]=useState(false);
    const [formData, setFormData]=useState({
        titre: "",
        lieu: "",
        date_event: "",
        type: "",
        prix: "",
        resume: "",
        description: "",
        user: "",
        file: "",
    });


    const fetchEvent=async ()=>{
        setLoading(true)
        await axios.get(URL)
        .then((res)=>{console.log(res.data); setFormData(res.data)})
        .catch((e)=>{console.log(e);})
        .finally(()=>{setLoading(false)})
    }

    const createUpdateEvent=async ()=>{
        setLoading(true);
    }

    const onSubmit = ()=>{
        console.log(formData);
        //createUpdateEvent
    }

    const onChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
        console.log(formData);
    }

    useEffect(()=>{
        params.id !== null ? fetchEvent() : null;
    }, [])

    return (

        <div>
        <div className='py-4'>
            <BackButton />
        </div>
        <section className="max-w-4xl mb-6 p-6 mx-auto rounded-md shadow-md bg-gradient-to-r from-blue-300 to-blue-400 mt-20">
        <h1 className="text-xl font-bold text-white capitalize dark:text-white">Création d'un événement</h1>
        <form>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                    <label className="text-white dark:text-gray-200" htmlFor="titre">Titre</label>
                    <input id="titre" type="text" value={formData.titre} onChange={onChange} name="titre" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                </div>
                <div>
                    <label className="text-white dark:text-gray-200" htmlFor="lieu">Lieu</label>
                    <input id="lieu" type="text" value={formData.lieu} onChange={onChange} name="lieu" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                </div>
                {/*<div>
                    <label className="text-white dark:text-gray-200" htmlFor="date">Date</label>
                    <input id="date" type="date" value={Date.now(formData.date_event)} onChange={onChange} name="date_event"  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                </div>*/}
                <div>
                    <label className="text-white dark:text-gray-200" htmlFor="type">Types</label>
                    <select id="type" value={formData.type} onChange={onChange} name="type" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                            <option value="SPORTIF">Sport</option>
                            <option value="MUSIQUE">Musique</option>
                            <option value="ART">Art</option>
                            <option value="CULTUREL">Culture</option>
                            <option value="EXPO">Exposition</option>
                            <option value="AUTRE">Autre</option>
                    </select>
                </div>
                <div>
                    <label className="text-white dark:text-gray-200" htmlFor="prix">Prix</label>
                    <input id="prix" type="number" step="0.01" value={formData.prix} onChange={onChange} name="prix" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
                </div>
                <div>
                    <label className="text-white dark:text-gray-200" htmlFor="textarea">Résumé</label>
                    <textarea id="textarea" type="textarea" value={formData.resume} onChange={onChange} name="resume" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"></textarea>
                </div>
                <div>
                    <label className="text-white dark:text-gray-200" htmlFor="textarea">Description</label>
                    <textarea id="textarea" type="textarea" value={formData.description} onChange={onChange} name="description" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"></textarea>
                </div>
                
                <input type="hidden" value={formData.user} name="user"/>
                
                <div>
                    <label className="block text-sm font-medium text-white">
                    Image
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-white" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                          <span className="">Upload un fichier</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only"/>
                        </label>
                        <p className="pl-1 text-white">ou fait glissé et déposé</p>
                      </div>
                      <p className="text-xs text-white">
                        PNG, JPG, GIF jusqu'à 10MB
                      </p>
                    </div>
                  </div>
                </div>
            </div>
    
            <div className="flex justify-end mt-6">
                <button onClick={onSubmit} className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-gray-600">Save</button>
            </div>
        </form>
    </section>
    </div>
      )
}

