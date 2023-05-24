import React, { useState, useEffect } from 'react';
import Rutina from './Rutina';
import RutinaList from './RutinasList';
import { Link } from 'react-router-dom';
import { HiPlus } from 'react-icons/hi';

const Rutinas = () => {
  const [rutinas, setRutinas] = useState([]);
  const [refresca, setRefresca] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
      });
  }, [refresca]);

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        rutinas && rutinas.length > 0 ? (
          <div className="rutinas">
            {rutinas.map((v) => (
              <Rutina setRefresca={setRefresca} key={v.id} v={v} />
            ))}
            {rutinas.map((v) => (
              <RutinaList setRefresca={setRefresca} key={v.id} v={v} />
            ))}
            <div>
              <Link to="/rutinas/add">
                <div className="circulo suma">
                  <HiPlus />
                </div>
              </Link>
            </div>
          </div>
        ) : (
          <><p>No hay rutinas disponibles</p></>
        )
      )}
    </>
  );
};

export default Rutinas;