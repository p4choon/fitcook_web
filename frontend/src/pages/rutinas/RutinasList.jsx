import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const RutinasList = () => {
    let [rutinas, setRutinas] = useState([]);
    let [refresca, setRefresca] = useState(false);
  
    useEffect(() => {
      fetch('http://127.0.0.1:8000/api/routines', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'GET',
      })
        .then((data) => data.json())
        .then((resposta) => {
          setRutinas(resposta.routines);
          setRefresca(false);
        });
    }, [refresca]);
  
    return (
      <>
        <div className="rutinas">
          {rutinas.map((v) => (
            <div key={v.id} className='rutina'>
            <div>
              <div className='space-y-2'>
                <div className='space-y-4'>
                  <h4 className='text-2xl font-semibold text-cyan-900'>{v.title}</h4>
                  <p>{v.description}</p>
                  <p>{v.duration}</p>
                  <p>{v.muscle_groups}</p>
                  <Link to={"/rutinas/edit/"+v.id} className="w-max text-cyan-600"> Editar </Link>
                  <a href="#" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-10 md:h-10 uppercase" onClick={(d) => deleteRutina(v.id, d)}>{" "}Esborrar</a>
                </div>
              </div>
            </div>
          </div>
          ))}
        </div>
      </>
    );
  };

export default RutinasList;