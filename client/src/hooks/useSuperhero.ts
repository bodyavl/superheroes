import { useReducer } from "react";

export enum SuperheroActionTypes {
  SET_SUPERHERO = "SET_SUPERHERO",
  SET_NICKNAME = "SET_NICKNAME",
  SET_REAL_NAME = "SET_REAL_NAME",
  SET_ORIGIN_DESCRIPTION = "SET_ORIGIN_DESCRIPTION",
  SET_SUPERPOWERS = "SET_SUPERPOWERS",
  SET_CATCH_PHRASE = "SET_CATCH_PHRASE",
  SET_PICTURES = "SET_PICTURES",
}

type SetSuperheroAction = {
  type: SuperheroActionTypes.SET_SUPERHERO;
  payload: SuperheroState;
};

type SetSuperheroFieldAction = {
  type:
    | SuperheroActionTypes.SET_CATCH_PHRASE
    | SuperheroActionTypes.SET_NICKNAME
    | SuperheroActionTypes.SET_ORIGIN_DESCRIPTION
    | SuperheroActionTypes.SET_REAL_NAME
    | SuperheroActionTypes.SET_SUPERPOWERS;
  payload: string;
};
type SetSuperheroPicturesAction = {
  type: SuperheroActionTypes.SET_PICTURES;
  payload: File[];
};

type ActionType =
  | SetSuperheroAction
  | SetSuperheroFieldAction
  | SetSuperheroPicturesAction;

export interface SuperheroState {
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string;
  catch_phrase: string;
  pictures: File[];
}

const initialState: SuperheroState = {
  nickname: "",
  real_name: "",
  origin_description: "",
  superpowers: "",
  catch_phrase: "",
  pictures: [],
};

const reducer = (state: SuperheroState, action: ActionType) => {
  switch (action.type) {
    case SuperheroActionTypes.SET_SUPERHERO:
      return action.payload;
    case SuperheroActionTypes.SET_NICKNAME:
      return { ...state, nickname: action.payload };
    case SuperheroActionTypes.SET_REAL_NAME:
      return { ...state, real_name: action.payload };
    case SuperheroActionTypes.SET_ORIGIN_DESCRIPTION:
      return { ...state, origin_description: action.payload };
    case SuperheroActionTypes.SET_SUPERPOWERS:
      return { ...state, superpowers: action.payload };
    case SuperheroActionTypes.SET_CATCH_PHRASE:
      return { ...state, catch_phrase: action.payload };
    case SuperheroActionTypes.SET_PICTURES:
      return {
        ...state,
        pictures: action.payload,
      };
    default:
      return state;
  }
};

const useSuperhero = () => {
  return useReducer(reducer, initialState);
};

export default useSuperhero;
