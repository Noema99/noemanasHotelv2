import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import {
  Reservation, Row, RowBody, RowHead, DateRange, Value, Label
} from '../styles/AddReservation';

const AddReservationScreen = () => {
    return (
      <View style={styles.container}>
        <Text>Faite votre reservation maintenant </Text>      
        <Reservation>
              <RowHead>
               <DateRange>
                  <Value>Compte rendu de votre réservation </Value>
                </DateRange>
              </RowHead>
              <RowBody>
                <Row>
                  <Label> Reservation ID</Label>
                  <Value>Reserv9595 </Value>
               </Row>
                 <Row>
                  <Label> Nombre de personne</Label>
                  <Value>3  </Value>
                </Row>             
              </RowBody>
            </Reservation>
      </View>
    );
};

export default AddReservationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});