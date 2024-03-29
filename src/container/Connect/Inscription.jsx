import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Inscription.css';
import axios from 'axios';
import {
  Textfield, EmailField, PasswordField, NumberField,
} from '../../component/textfield/Textfield';
import useInscription from '../../hooks/useInscription';
import Button from '../../component/button/Button';
import { ContainerForm, ContainerRegister, ContainerPicture } from '../../component/containerForm/ContainerForm';

const setToken = (value) => {
  localStorage.setItem('token', value);
};
function Inscription() {
  const navigate = useNavigate();
  const {
    lastName,
    setLastName,
    firstName,
    setFirstName,
    mail,
    setMail,
    number,
    setNumber,
    password,
    setPassword,
    passwordDouble,
    setPasswordDouble,
    erreur,
    setErreur,
  } = useInscription();

  const handleLastName = (name) => {
    setLastName(name);
  };
  const handleFirstName = (name) => {
    setFirstName(name);
  };
  const handleEmail = (e) => {
    setMail(e.target.value);
  };
  const handleNumber = (e) => {
    setNumber(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handlePasswordDouble = (e) => {
    setPasswordDouble(e.target.value);
  };

  const HandleSend = () => {
    axios.post('http://localhost:8080/inscription/', {
      lastName, firstName, mail, number, password, passwordDouble,
    })
      .then((response) => {
        setToken(response.data.token);
        navigate('/');
      })
      .catch((error) => {
        setErreur(error.response.data.message);
      });
  };

  return (

    <div className="inscription">
      <ContainerForm>

        <ContainerRegister>
          <Textfield value={lastName} onChange={handleLastName} placeholder="nom" />
          <Textfield placeholder="prenom" value={firstName} onChange={handleFirstName} />
          <EmailField placeholder="Email" value={mail} onChange={handleEmail} />
          <NumberField placeholder="Telephone" value={number} onChange={handleNumber} />
          <PasswordField value={password} onChange={handlePassword} placeholder="mot de passe" />
          <PasswordField value={passwordDouble} onChange={handlePasswordDouble} placeholder="Même mot de passe" />
          <span>
            {' '}
            {erreur}
          </span>
          <Button appareanceLike="appareanceLike" onClick={HandleSend}> Valider </Button>
          <Link className="link" to="/login"> Déjà un compte</Link>
        </ContainerRegister>
        <ContainerPicture />

      </ContainerForm>
    </div >

  );
}
export default Inscription;
