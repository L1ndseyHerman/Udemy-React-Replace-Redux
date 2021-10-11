//  This will trigger re-renders the way that regular React hooks do.
import { useState, useEffect } from "react";

let globalState = {};
//  This seems like maybe the Observer design pattern?
let listeners = [];
let actions = {};

//  A custom hook! All React hooks are functions.
export const useStore = () => {
  //  This is apparently allowed, can just set a useState() to trigger re-renders, but
  //  never read it's value?!?!
  const setState = useState(globalState)[1];

  //    This is like the useReducer() action with the all caps and stuff:
  const dispatch = (actionIdentifier) => {
    //  "actions" is an object, but this action property is a function somehow?!
    const newState = actions[actionIdentifier](globalState);
    //  Merge the states:
    globalState = { ...globalState, ...newState };

    for (const listener of listeners) {
      listener(globalState);
    }
  };

  useEffect(() => {
    listeners.push(setState);

    //  Remove the listener when the component un-mounts:
    return () => {
      listeners = listeners.filter((li) => li !== setState);
    };
  }, [setState]);

  return [globalState, dispatch];
};

export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }
  actions = { ...actions, ...userActions };
};
