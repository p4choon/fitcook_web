import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';

const EjercicioEdit = () => {

    const { id } = useParams();
    let navigate = useNavigate();

    let [error,setError]  = useState ("")
    let [ formulari,setFormulari] = useState({});

    console.log(id)
          
    const getEjercicio = async () => {
      try {
      

        console.log("Inicio lectura");
        const data = await fetch ("http://equip01.insjoaquimmir.cat/api/exercises",{
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  method: "GET",
       })

        const resposta = await data.json();

        console.log("ddmawdawidijaijdpowpo")
        console.log(resposta.exercises)
        

        setFormulari({
            user_id: resposta.exercises.user_id,
            title: resposta.exercises.title,
            description: resposta.exercises.description,
            level: resposta.exercises.level,
            muscle_groups: resposta.exercises.muscle_groups,
            video_url: resposta.exercises.video_url,
            miniature: resposta.exercises.miniature
        })

      }
      catch (e) {

          console.log("S'ha produit algun error");
      }   
             
     

    }

    const handleChange = (e)=> {

      e.preventDefault();

      setError("");
      if (e.target.type && e.target.type==="file")
      {
        console.log(e.target.files[0].name) 
        setFormulari({

          ...formulari,
          [e.target.name] : e.target.files[0] 
  
        })

      }
      else {
      // Canviem l'element de l'objecte de l'estat
      setFormulari({

        ...formulari,
        [e.target.name] : e.target.value

      })
    }

  }
  
    useEffect(() => {
              getEjercicio();      
   
         }, []) 

  
    const editar = (e) => {

        e.preventDefault();
    
        let { user_id,title,description,level,muscle_groups,video_url,miniature}=formulari;
        const formData = new FormData();
        formData.append("user_id", user_id);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("level", level);
        formData.append("muscle_groups", muscle_groups);
        formData.append("video_url", video_url);
        formData.append("miniature", miniature);
    
    
    
        console.log("Editando ejercicio....")
        console.log(formulari)
        console.log(JSON.stringify({ user_id,title,description,level,muscle_groups,video_url,miniature }))
        // Enviam dades a l'aPI i recollim resultat
        fetch ("http://equip01.insjoaquimmir.cat/api/exercises/"+id,{
            headers: {
                Accept: 'application/json',
                //'Content-type': 'multipart/form-data',
                //Authorization: 'Bearer '
            },
            method: "POST",
            //body: JSON.stringify({ user_id,title,description,level,muscle_groups,video_url,miniature })  
            body: formData

        }
        ).then( data => data.json() )
        .then (resposta => { 
            
                console.log(resposta); 
                if (resposta.exercise == true )
                {
                    //setAfegir(false); // Tornem al llistat
                    navigate("/ejercicios/")
                }
                else
                {
                  setError(resposta.message)
                }
            } ) 
    
    
      }


      return (
        <>
         <div className="py-9 pl-9">
         <div className="py-9 flex flex-col gap-y-2">
              <label className="text-gray-600" htmlFor="user_id">user_id</label>
              <input
                  type="text"
                  value={formulari.user_id}
                  name="user_id"
                  className="w-1/3 px-4 py-2 border border-gray-300 outline-none focus:border-gray-400"
                  onChange={ handleChange}
              />
          </div>
          <div className="py-9 flex flex-col gap-y-2">
              <label className="text-gray-600" htmlFor="Title">Titutlo</label>
              <input
                  type="text"
                  value={formulari.title}
                  name="title"
                  className="w-1/3 px-4 py-2 border border-gray-300 outline-none focus:border-gray-400"
                  onChange={ handleChange}
              />
          </div>
    
          <div className="w-1/3">
        <label className="text-gray-600">Descripció</label>
        <textarea 
          name="description"
          value={formulari.description} 
          className="
            w-full
            h-32
            px-4
            py-3
            border-2 border-gray-300
            rounded-sm
            outline-none
            focus:border-blue-400
          "
          placeholder="Explica en que consiste la rutina"
          onChange={ handleChange}
        ></textarea>
    
      {/* <div className="flex justify-center">
        <div className="mb-3 w-96">
          <label htmlFor="formFile" className="form-label inline-block mb-2 text-gray-600">Imatge PNG, JPG or GIF (MAX. 800x400px)</label>
          <input name="upload" 
          onChange={ handleChange}
          className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="upload"/>
        </div>
      </div> */}
    
      <label htmlFor="level" className="block mb-2 text-sm text-gray-600 dark:text-white">Selecciona la dificultad</label>
      <select value={formulari.level} name="level" id="level" onChange={ handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option defaultValue value="">----</option>
        <option  value="1">Facil</option>
        <option value="2">Medio</option>
        <option value="3">Dificil</option>
      </select>
      <div className="py-9 flex flex-col gap-y-2">
              <label className="text-gray-600" htmlFor="duration">Duracion</label>
              <input
                  type="text"
                  value={formulari.duration}
                  name="duration"
                  className="w-1/3 px-4 py-2 border border-gray-300 outline-none focus:border-gray-400"
                  onChange={handleChange}
              />
          </div>
    
      <span className="flex flex-col gap-y-2">
              <label className="text-gray-600" htmlFor="muscle_groups">Grupo Muscular</label>
              <input
                type="text"
                name="muscle_groups"
                value={formulari.muscle_groups}
                onChange={ handleChange}
                className="w-1/3 px-4 py-2 border border-gray-300 outline-none focus:border-gray-400"
              />
      </span>
      <span className="flex flex-col gap-y-2">
              <label className="text-gray-600" htmlFor="video_url">Video</label>
              <input
                type="text"
                name="video_url"
                value={formulari.video_url}
                onChange={ handleChange}
                className="w-1/3 px-4 py-2 border border-gray-300 outline-none focus:border-gray-400"
              />
      </span>
    
      <div className="flex justify-center">
      <span className="flex flex-col gap-y-2">
          <label className="text-gray-600" htmlFor="miniature">URL Foto</label>
          <input
            type="text"
            name="miniature"
            value={formulari.miniature}
            onChange={ handleChange}
            className="w-1/3 px-4 py-2 border border-gray-300 outline-none focus:border-gray-400"
          />
      </span>
    </div>
<div className="py-9">
{ error ? (<div className="flex w-full items-center space-x-2 rounded-2xl bg-red-50 mb-4 px-4 ring-2 ring-red-200 ">{error}</div>) : (<></>)  }
<button onClick={editar}  type="submit" className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
    Editar Entrada
    </button>
    <button onClick={ ()=> {navigate(-1)}}  type="submit" className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
    Cancelar
    </button>
    
    
  </div>
    
  
    
    
    
    
    
    </div>
    {/* </form> */}
   
    </div>
    
    
    
    
    
    </>
  )
}

export default EjercicioEdit;