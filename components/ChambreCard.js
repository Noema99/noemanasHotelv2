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
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const ChambreCard = ({onIconPress,item, navigation,route}) => {
  return (
    <Card key={item.id}>
          <ChambreInfo>
          <ChambreImg source={{ uri : item.chambreImg}} />
          <ChambreInfoText>
          <ChambreType onPress={() => {
          }}>C'est une chambre {item.type}
       
          </ChambreType>
                  <NbrLit>{item.nbrLit} lit(s)</NbrLit>
                  <GenreLit>De type {item.genreLit}</GenreLit>
                  <NbrLit>Prix <PrixNuit> {item.prixNuit} DHS/nuit</PrixNuit></NbrLit>
                  {item.reduction != false ? <NbrLit>+ Réduction selon le nombre de jours </NbrLit> : <NbrLit>- Sans réduction </NbrLit>}
                  {item.salleBain != false ? <NbrLit>+ Salle de bain </NbrLit> : <NbrLit>- Sans salle de bain </NbrLit>}
                  {item.balcon != false ? <NbrLit>+ Balcon </NbrLit> : <NbrLit>- Sans balcon</NbrLit>}
          {item.cheminee != false ? <NbrLit>+ Cheminée</NbrLit> : <NbrLit>- Sans cheminée</NbrLit>}
          
           
        </ChambreInfoText>
       
      </ChambreInfo>
     
     
    </Card>
  );
};

export default ChambreCard;
/*   <FontAwesome5.Button
              name="plus"
              size={14}
              backgroundColor="#f8f8f8"
              color="#2E765E"
              onPress={()=>{ console.log(route.params.selectedChambre)}}
            />*/