import React from 'react';
import {
  Card,
  ChambreInfo,
  ChambreImg,
  ChambreType,
  ChambreInfoText,
    NbrLit,
    GenreLit,
    PrixNuit,
  PostText,
  PostImg,
  Divider,
} from '../styles/ChambresStyles';

const ChambreCard = ({item}) => {
  return (
    <Card key={item.id}>
          <ChambreInfo>
          <ChambreImg source={{ uri : item.chambreImg}} />
          <ChambreInfoText>
          <ChambreType>C'est une chambre {item.type}</ChambreType>
                  <NbrLit>{item.nbrLit} lit(s)</NbrLit>
                  <GenreLit>De type {item.genreLit}</GenreLit>
                  <NbrLit>Prix <PrixNuit> {item.prixNuit} DHS/nuit</PrixNuit></NbrLit>
                  {item.reduction != false ? <NbrLit>+ Réduction selon le nombre de jours </NbrLit> : <NbrLit>Sans réduction </NbrLit>}
                  {item.salleBain != false ? <NbrLit>+ Salle de bain </NbrLit> : <NbrLit>Sans salle de bain </NbrLit>}
                  {item.balcon != false ? <NbrLit>+ Balcon </NbrLit> : <NbrLit>Sans balcon</NbrLit>}
                  {item.cheminee != false ? <NbrLit>+ Cheminée</NbrLit> : <NbrLit>Sans cheminée</NbrLit> }
        </ChambreInfoText>
      </ChambreInfo>
     
    </Card>
  );
};

export default ChambreCard;
