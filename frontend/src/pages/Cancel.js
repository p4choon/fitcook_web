function Cancel() {
  return (
    <div>
      <h1 className="mt-3">Vaya... Has cancelado la compra😢</h1>
      
      <a href="/store">
        <button
          className="btn btn-primary"
          style={{ backgroundColor: '#222222', fontWeight: 'bold', color:'white', borderColor:'#FFD700' }}
        >Volver</button>
      </a>
    </div>
  );
}

export default Cancel;
