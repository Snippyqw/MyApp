import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    FlatList,
    Alert
  } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';
import {ListItem,} from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import i18n from '../i18n';

const styles = StyleSheet.create({
   List: {
        borderTopStartRadius: 20,
        borderTopEndRadius: 20
   },
   op: {
       
   },
   Item: {
    padding: 0,
    borderBottomWidth:5,
    borderBottomColor: 'rgba(66, 65, 96, 0.7)'
   }
  });

    const Contact = () => {
        const [contacts, setContacts] = useState([]);
        const [permissionsGranted, setPermissionsGranted] = useState(false);
        useEffect(() => {
            const askPermissions = async () => {
                const { status } = await Permissions.askAsync(
                  Permissions.CONTACTS);
                if (status === 'granted') {
                  setPermissionsGranted(true);
          
                }
              };
              askPermissions();
            });
    
        useEffect(() => {
            if (!permissionsGranted) {
              return;
            }
            const loadContacts = async () => {
              const { data } = await Contacts.getContactsAsync({
                fields: [
                  Contacts.Fields.Emails,
                  Contacts.Fields.PhoneNumbers,
                  Contacts.Fields.Name,
                  Contacts.Fields.ID,
                ],
              });
                setContacts(data);
            };
            loadContacts();
          });

        return (
            <FlatList 
                style={styles.List}
                data={contacts}
                keyExtractor={(contact) => contact.id}
                renderItem={(row) => { 
                    return (
                        <TouchableOpacity
                            style={styles.op}
                          onPress={() => { Alert.alert(
                                                i18n.t('inv2'),
                                                i18n.t('inv3') + row.item.name+'?',
                                                [
                                                {text: (i18n.t('no')), onPress: () => this.close},
                                                {text: (i18n.t('yes')), onPress: () => this.close}
                                                ]
                          
                                            ) 
                                        }
                                    }
                        >
                          <ListItem
                            style={styles.Item}
                            title={row.item.name}
                            subtitle={row.item.phoneNumbers ? row.item.phoneNumbers.map((phoneNumber) => phoneNumber.number).join(', ') : ''}
                          />
                        </TouchableOpacity>
          
                      );
                    }}
            />
        );
       
    }
export default Contact