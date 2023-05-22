import React, { useState, useEffect, useRef } from 'react';
import './crea-tu-dieta.css';
import { VictoryPie, VictoryLabel } from 'victory';

const CreaTuDieta = () => {
  const [peso, setPeso] = useState('');
  const [edad, setEdad] = useState('');
  const [factorActividad, setFactorActividad] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [porcentaje, setPorcentaje] = useState('');
  const [caloriasDiarias, setCaloriasDiarias] = useState(0);
  const [proteinas, setProteinas] = useState(0);
  const [grasas, setGrasas] = useState(0);
  const [carbohidratos, setCarbohidratos] = useState(0);
  const [gastoCaloricoBasal, setGastoCaloricoBasal] = useState(0);
  

  const data = [
    { x: 'Proteinas', y: proteinas * 4},
    { x: 'Grasas', y: grasas * 9},
    { x: 'Carbohidratos', y: carbohidratos * 4},
  ];

  const legendData = [
    { name: 'Proteinas', symbol: { fill: '#FF5722' } },
    { name: 'Grasas', symbol: { fill: '#4CAF50' } },
    { name: 'Carbohidratos', symbol: { fill: '#2196F3' } },
  ];

  const colorScale = ['#FF5722', '#4CAF50', '#2196F3'];

  const handlePesoChange = (event) => {
    setPeso(event.target.value);
  };

  const handleEdadChange = (event) => {
    setEdad(event.target.value);
  };

  const handleFactorActividadChange = (event) => {
    setFactorActividad(event.target.value);
  };

  const handleObjetivoChange = (event) => {
    setObjetivo(event.target.value);
  };

  const handlePorcentajeChange = (event) => {
    setPorcentaje(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const gastoCaloricoBasal = Math.round(peso * edad * factorActividad);
    const gastoCalorico = Math.round(peso * edad * factorActividad);
    let caloriasObjetivo = gastoCalorico;

    if (objetivo === 'bajar') {
      caloriasObjetivo -= Math.round(gastoCalorico * (porcentaje / 100));
    } else if (objetivo === 'subir') {
      caloriasObjetivo += Math.round(gastoCalorico * (porcentaje / 100));
    }

    const proteinasGramos = objetivo === 'bajar' ? peso * 2.4 : peso * 2;
    const grasasGramos = objetivo === 'bajar' ? peso * 1 : peso * 1.2;
    const proteinasKcal = proteinasGramos * 4;
    const grasasKcal = grasasGramos * 9;
    const carbohidratosKcal = caloriasObjetivo - proteinasKcal - grasasKcal;
    const carbohidratosGramos = carbohidratosKcal / 4;

    setCaloriasDiarias(caloriasObjetivo);
    setProteinas(Math.round(proteinasGramos));
    setGrasas(Math.round(grasasGramos));
    setCarbohidratos(Math.round(carbohidratosGramos));
    setGastoCaloricoBasal(gastoCaloricoBasal);
  };

  return (
    <div className="crea-tu-dieta">
      <h2>Crea tu dieta</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Peso actual (kg):
        </label>
        <input type="number" value={peso} onChange={handlePesoChange} required />
        <br />
        <label>
          Edad:
        </label>
        <input type="number" value={edad} onChange={handleEdadChange} required />
        <br />
        <label>
          Factor de actividad:
          <select value={factorActividad} onChange={handleFactorActividadChange} required>
            <option value="">Seleccionar</option>
            <option value="1.2">Poco o ningún ejercicio</option>
            <option value="1.4">Ejercicio ligero (1-3 días a la semana)</option>
            <option value="1.6">Ejercicio moderado (3-5 días a la semana)</option>
            <option value="1.8">Ejercicio fuerte (6-7 días a la semana)</option>
            <option value="2">Ejercicio muy fuerte (dos veces al día, entrenamientos muy duros)</option>
          </select>
        </label>
        <label>
          Objetivo:
        </label>
        <select value={objetivo} onChange={handleObjetivoChange} required>
          <option value="">Seleccionar</option>
          <option value="bajar">Bajar de peso</option>
          <option value="subir">Subir de peso</option>
        </select>
        {objetivo && (
          <div>
            <label>
              Porcentaje:
            </label>
            <br/>
            <select value={porcentaje} onChange={handlePorcentajeChange} required>
              <option value="">Seleccionar</option>
              {objetivo === 'bajar' && (
                <>
                  <option value="10">-10% (bajada lenta pero segura)</option>
                  <option value="20">-20% (bajada más rápida)</option>
                  <option value="30">-30% (bajada rápida u obesidad)</option>
                </>
              )}
              {objetivo === 'subir' && (
                <>
                  <option value="10">+10% (tendencia a engordar o ganar masa muscular)</option>
                  <option value="15">+15% (subir algo más de peso)</option>
                  <option value="20">+20% (ectomorfos o hardgainers)</option>
                </>
              )}
            </select>
            <br />
          </div>
        )}
        <br />
        <button type="submit">Calcular</button>
      </form>
      {caloriasDiarias > 0 && (
        <div className="results">
          <h3>Resultados:</h3>
          <p>Gasto calórico basal: {gastoCaloricoBasal} Kcal</p>
          <p>Calorías diarias para {objetivo}: {caloriasDiarias} Kcal</p>
          <p>Proteínas: {proteinas} gramos/día, {proteinas * 4} Kcal</p>
          <p>Grasas: {grasas} gramos/día, {grasas * 9} Kcal</p>
          <p>Carbohidratos: {carbohidratos} gramos/día, {carbohidratos * 4} Kcal</p>
          <br/>
          <p className="micronutrientes">Aún asi, no te olvides de incluir micronutrientes ya que son esenciales para el crecimiento y desarrollo del organismo, la utilización metabólica de los macronutrientes y el mantenimiento del sistema inmunológico.</p>
          <div className="grafico-container">
            <div className="legend">
              {legendData.map((item) => (
                <div key={item.name} className="legend-item">
                  <div className="legend-symbol" style={{ background: item.symbol.fill }}></div>
                  <div className="legend-label" style={{ color: item.symbol.fill }}>{item.name}</div>
                </div>
              ))}
            </div>
            <VictoryPie 
              data={data} 
              colorScale={colorScale}
              labels={({ datum }) => `${datum.x}: ${Math.round((datum.y / caloriasDiarias) * 100)}%`}
              labelRadius={({ innerRadius }) => innerRadius + 29}
              labelComponent={<VictoryLabel renderInPortal />}
            />
            </div>
          </div>
      )}
    </div>
  );
};

export default CreaTuDieta;
