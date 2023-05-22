import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import {auth, db} from '../../firebase';
import Picker from 'emoji-picker-react';
import { FiSmile, FiX, FiSend } from "react-icons/fi";

const SendMessage = ({ scroll }) => {
    const [input, setInput] = useState('');
    const [open, setOpen] = useState('close');

    const sendMessage = async (e) => {
        e.preventDefault();
        if(input === ''){
            alert('Please enter a valid message');
            return;
        }
        const {uid, displayName, photoURL} = auth.currentUser;
        await addDoc(collection(db, 'messages'), {
            text: input,
            name: displayName,
            uid,
            photo: photoURL,
            timestamp: serverTimestamp()
        }) 
        setInput('');
        scroll.current.scrollIntoView({behavior: 'smooth'})
    }

    const emoji = () => {
        setOpen('open');
    }
    const closeEmoji = () => {
        setOpen('close');
    }
    const onEmojiClick = (event, emojiObject) => {
        setInput(`${input}${emojiObject.emoji}`)
    };

    return ( 
        <form onSubmit={sendMessage} className="formComunidad">
            <button 
                type="button" 
                className="btn-emoji"
                onClick={emoji}>
                    <FiSmile/>
            </button>
            <div className={open}>
                <button 
                    className="close-emoji" 
                    onClick={closeEmoji}
                    type="button">
                <FiX size={24}/>
                </button>
                <Picker onEmojiClick={onEmojiClick}/>
            </div>

            <input type="text" 
                placeholder="Escribe tu mensaje aquí" 
                value={input} 
                onChange={e=>setInput(e.target.value)} 
            />
            <button type="submit">Enviar <FiSend/></button>
        </form>
    );
}
 
export default SendMessage;