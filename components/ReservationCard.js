









// on va pas l'utiliser 







import React from 'react';
import {
  Card,
  ReservationInfo,
  ChambreImg,
  ChambreType,
  ChambreInfoText,
    NbrLit,
    GenreLit,
    PrixNuit,
    PrixTotal,
  Periode,
  DateDebut,NbrPersonne,
} from '../styles/ReservationsStyles';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const ReservationCard = ({onIconPress,item, navigation,route}) => {
  return (
    <Card key={item.id}>
      <ReservationInfo>
            <ChambreImg source={{ uri : item.chambreImg}} />
            <ReservationInfoText>
                <ChambreType onPress={() => {}}>C'est une chambre {item.type}</ChambreType>
                <NbrLit>{item.nbrLit} lit(s)</NbrLit>
                <GenreLit>De type {item.genreLit}</GenreLit>
                <NbrLit>Prix <PrixNuit> {item.prixNuit} DHS/nuit</PrixNuit></NbrLit>
                <NbrLit>Periode <Periode> {item.periode} jours</Periode></NbrLit>
                <NbrLit>Première date  <DateDebut> {item.dateDebut} </DateDebut></NbrLit>
                <NbrLit>Vous serez  <NbrPersonne> {item.nbrPersonne} personnes </NbrPersonne></NbrLit>
                <NbrLit>Prix total : <PrixTotal> {item.prixTotal} MAD</PrixTotal></NbrLit>
                <NbrLit>Paiement à l'accueil ! </NbrLit>               
            </ReservationInfoText>
      </ReservationInfo> 
    </Card>
  );
};

export default ReservationCard;
/*   <FontAwesome5.Button
              name="plus"
              size={14}
              backgroundColor="#f8f8f8"
              color="#2E765E"
              onPress={()=>{ console.log(route.params.selectedChambre)}}
            />*/