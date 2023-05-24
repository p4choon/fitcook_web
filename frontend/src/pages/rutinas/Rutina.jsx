import React from 'react';
import { Link } from 'react-router-dom';

const Rutina = ({ v }) => {
  console.log(v); // Valores de v desde fetch routines

  const deleteRutina = (id, d) => {
    d.preventDefault();

    let confirma = window.confirm("¿Estás seguro?");

    if (confirma) {
        fetch("http://equip01.insjoaquimmir.cat/api/routines/" + id, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "DELETE",
        })
        .then((data) => data.json())
        .then((resposta) => {
            console.log(resposta);
            if (resposta.exercise) {  
            console.log("OK");
            // provoca el refrescat del component i la reexecució de useEffect
            // setRefresca(true);
            }
        });
    }
    };

  let dificultad = '';

  if (v.level === 'beginner') {
    dificultad = 'carta-rutina-facil';
  } else if (v.level === 'intermediate') {
    dificultad = 'carta-rutina-medio';
  } else if (v.level === 'advanced') {
    dificultad = 'carta-rutina-dificil';
  } else {
    dificultad = '';
  }

  return (
    <Link to={"/rutinas/show/"+v.id} className="w-max text-cyan-600">
      <div key={v.id} className='rutina'>
        <div className={dificultad}>
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
    </Link>
  );
};

export default Rutina;