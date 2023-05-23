import React, { useState, useEffect } from 'react';
import Rutina from './Rutina';
import RutinaList from './RutinasList';
import { Link } from 'react-router-dom';
import { HiPlus } from 'react-icons/hi';

const Rutinas = () => {
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
    </>
  );
};

export default Rutinas;