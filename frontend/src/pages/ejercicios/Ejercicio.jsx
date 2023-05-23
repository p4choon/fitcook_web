import React from 'react';
import { Link } from 'react-router-dom';

const Ejercicio = ({v}) => {

    const deleteEjercicio = (id, e) => {
    e.preventDefault();

    let confirma = confirm("Estas  segur?");

    if (confirma) {
        fetch("http://127.0.0.1:8000/api/exercises/" + id, {
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
            setRefresca(true);
            }
        });
    }
    };

  console.log(v)

  let dificultad = '';

  if (v.level === '1') {
    dificultad = 'carta-rutina-facil';
  } else if (v.level === '2') {
    dificultad = 'carta-rutina-medio';
  } else if (v.level === '3'){
    dificultad = 'carta-rutina-dificil';
  } else {
    dificultad = '';
  }
  

return (
  <div key={v.id} className='rutina'>
    <div className={dificultad}>
      <div className="space-y-2">
        <div className="space-y-4">
          <h4 className="text-2xl font-semibold text-cyan-900">{v.title}</h4>
          <img src={v.miniature} className='eimg'></img>
          <p>{v.description}</p>
          <p>{v.level}</p>
          <p>{v.duration}</p>
          <video width="640" height="360" controls>
            <source src={v.video_url}  type="video/mp4"/>
            Tu navegador no soporta la reproducción de videos.
          </video>
          <p>{v.video_url}</p>
          <p>{v.muscle_groups}</p>
          <Link to={"/ejercicios/edit/"+v.id} className="w-max text-cyan-600"> Editar </Link>
          <a href="#" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-10 md:h-10 uppercase" onClick={(e) => deleteEjercicio(v.id, e)}>{" "}Esborrar</a>
        </div>
      </div>
    </div>
  </div>    
)
}

export default Ejercicio;