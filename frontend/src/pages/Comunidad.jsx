import Chat from '../components/comunidad/Chat'
import User from '../components/comunidad/UserComunidad'
import './comunidad.css'

function Comunidad() {

  return (
    <div className="Comunidad">
      <User/>
      <Chat/>
    </div>
  )
}

export default Comunidad;