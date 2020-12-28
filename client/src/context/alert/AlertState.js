import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import { v4 as uuidv4 } from 'uuid';

//Actions
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = (props) => {
  //Initial State
  const initialState = [];

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  //Set alert
  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuidv4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };
  //Remove alert

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}>
      {props.children}
    </AlertContext.Provider>
  );
  // eslint-disable-next-line
};

export default AlertState;
