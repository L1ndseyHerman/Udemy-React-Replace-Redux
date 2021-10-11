//  This will trigger re-renders the way that regular React hooks do.
import { useState, useEffect } from "react";

let globalState = {};
//  This seems like maybe the Observer design pattern?
let listeners = [];
let actions = {};

//  A custom hook! All React hooks are functions.
const useStore = () => {
  //  This is apparently allowed, can just set a useState() to trigger re-renders, but
  //  never read it's value?!?!
  const setState = useState(globalState)[1];

  useEffect(() => {
    listeners.push(setState);

    //  Remove the listener when the component un-mounts:
    return () => {
      listeners = listeners.filter((li) => li !== setState);
    };
  }, [setState]);
};
