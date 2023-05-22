import React, { useState, useEffect } from 'react';
import './calculadoraimc.css';

const CalculadoraIMC = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [imc, setIMC] = useState(null);
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    const savedProgress = localStorage.getItem('imcProgress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  const calculateIMC = () => {
    if (height && weight) {
      const heightInMeters = height / 100;
      const imcValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setIMC(imcValue);

      const currentDate = new Date().toLocaleDateString();
      const newEntry = { date: currentDate, imc: imcValue };
      const newProgress = [...progress, newEntry];
      setProgress(newProgress);
      localStorage.setItem('imcProgress', JSON.stringify(newProgress));

      setHeight('');
      setWeight('');
    }
  };

  const getIMCCategory = (imc) => {
    if (imc < 18.5) {
      return 'Bajo peso';
    } else if (imc >= 18.5 && imc < 25) {
      return 'Peso saludable';
    } else if (imc >= 25 && imc < 30) {
      return 'Sobrepeso';
    } else {
      return 'Obesidad';
    }
  };

  return (
    <div className="imc-calculator">
      <h2>Calculadora de IMC</h2>
      <div className="input-group">
        <label>Altura (cm):</label>
        <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
      </div>
      <div className="input-group">
        <label>Peso (kg):</label>
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
      </div>
      <button className="calculate-button" onClick={calculateIMC}>Calcular IMC</button>

      {imc && (
        <div className="result">
          <h3>Tu IMC es: {imc}</h3>
          <h4>Categoría: {getIMCCategory(imc)}</h4>
        </div>
      )}

      {progress.length > 0 && (
        <div className="progress">
          <h2>Seguimiento de progreso</h2>
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>IMC</th>
              </tr>
            </thead>
            <tbody>
              {progress.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.date}</td>
                  <td>{entry.imc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CalculadoraIMC;
