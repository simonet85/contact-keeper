import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import contactContext from './contactContext';
import contactReducer from './contactReducer';
//Actions
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CONTACT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  SET_ALERT,
} from '../types';

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'jill Johnson',
        email: 'jill@gmail.com',
        phone: '111-111-1111',
        type: 'personal',
      },
      {
        id: 2,
        name: 'Sara Watson',
        email: 'sara@gmail.com',
        phone: '222-222-2222',
        type: 'personal',
      },
      {
        id: 3,
        name: 'Harry white',
        email: 'harrywhite@gmail.com',
        phone: '333-333-3333',
        type: 'professional',
      },
    ],
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);
  //Add Contact
  const addContact = (contacts) => {
    contacts.id = uuidv4();
    dispatch({ type: ADD_CONTACT, payload: contacts });
  };
  //Delete Contact
  const deleteContact = (id) => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };
  //Set Current Contact

  //Update Contact

  //Filter Contacts

  //Clear Filter
  return (
    <contactContext.Provider
      value={{ contacts: state.contacts, addContact, deleteContact }}>
      {props.children}
    </contactContext.Provider>
  );
  // eslint-disable-next-line
};

export default ContactState;
