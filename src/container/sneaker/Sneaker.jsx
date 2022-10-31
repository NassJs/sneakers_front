import React, { useEffect, useState } from 'react';
import './Sneaker.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Textfield } from '../../component/textfield/Textfield';
import Button from '../../component/button/Button';
import Picture from '../../component/picture/Picture';
import {
  ContainerInfo, ContainerHeaderInfo, ContainerLinkShop, ContainerPrice, ContainerSize,
  ContainerMatiere,
} from '../../component/containerInfoSneakers/ContainerInfo';
import Comment from './Comment';

function Sneaker() {
  const { id } = useParams();
  const [marque, setMarque] = useState();
  const [newName, setNewName] = useState();
  const [picture, setPicture] = useState();
  const [price, setPrice] = useState();
  const [size, setSize] = useState();

  useEffect(() => {
    axios.get(`http://localhost:8080/sneakers/${id}`)
      .then((response) => {
        console.log(response);
        setMarque(response.data.marque.toUpperCase());
        setNewName(response.data.name);
        setPicture(response.data.picture);
        setPrice(response.data.price);
        setSize(response.data.size);
      });
  }, []);

  const UpdateSend = (name) => {
    setNewName(name);
  };

  const sendUpdateComment = () => {
    axios.put(`http://localhost:8080/sneakers/${id}`, {
      newName,
    })
      .then((response) => {
        console.log(response);
      });
  };

  const deleteComment = () => {
    axios.delete(`http://localhost:8080/sneakers/${id}`)
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div className="sneaker">
      <div className="sneaker_header">
        <Picture pictureComment="pictureComment" source={picture} />
        <ContainerInfo>
          <ContainerHeaderInfo info={newName} marque={marque} />
          <ContainerPrice price={price} />
          <ContainerSize size={size} />
          <ContainerMatiere />
          <ContainerLinkShop />
        </ContainerInfo>
      </div>
      <span> Name : </span>
      <Textfield value={newName} onChange={UpdateSend} />
      <Button onClick={sendUpdateComment}> Envoyer </Button>
      <Button onClick={deleteComment}> Supprimer </Button>
      <Comment />
    </div>
  );
}

export default Sneaker;
