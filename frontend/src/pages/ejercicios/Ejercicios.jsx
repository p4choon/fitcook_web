import React, { useState } from 'react'
import { useEffect } from 'react';
import Ejercicio from './Ejercicio';
import { Link } from 'react-router-dom';
import { HiPlus } from 'react-icons/hi';


const Ejercicios = () => {

  // desa el retorn de dades de l'api rutinas
  let [ ejercicios, setEjercicios ] = useState([]);
  // Ho utilitzem per provar un refresc quan esborrem un element
  let [refresca,setRefresca] = useState(false)
      
  // només quan la vble d'estat refresca canvia el seu valor
  // refresca canviarà el valor quan fem alguna operació com delete   
  useEffect(() => {
    console.log("HOLA")
    fetch ("http://equip01.insjoaquimmir.cat/api/exercises",{
         headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
        },
        method: "GET"
    }
    ).then( data => data.json() )
    .then (resposta => { 
            console.log("Resposta: "+resposta.exercises); 
            setEjercicios(resposta.exercises);
            setRefresca(false);
          
        } ) 
         console.log(ejercicios)
  }, [refresca])   // condició d'execució del useffect
  
  return (
   <>
    <div className="rutinas">
      {ejercicios && ejercicios.length > 0 ? (
        ejercicios.map( (v,i)=> { return (
          <>
            {  <Ejercicio  setRefresca={ setRefresca } key={v.id} v={v}/>  }   
          </>
        )})
      ):(
        <p>No hay ejercicios disponibles</p>
      )}
    </div>
    <Link to="/ejercicios/add"><div className="circulo suma"><HiPlus/></div></Link>
</>
  )
}

export default Ejercicios
