import {
    GET_PERSONINSHIFT,
    UPDATE_PERSONINSHIFT,
    ADD_PERSONINSHIFT,
    PERSONINSHIFT_ERROR,
  } from "../actions/types";
  
  const initialState = {
    personInShifts: [],
    loading: true,
    error: {},
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_PERSONINSHIFT:
        return {
          ...state,
          personInShifts: payload,
          loading: false,
        };
      case PERSONINSHIFT_ERROR:
        return {
          ...state,
          error: payload,
          loading: false,
        };
      case ADD_PERSONINSHIFT:
        return {
          ...state,
          personInShifts: [...state.personInShifts, payload],
          loading: false,
        };
      case UPDATE_PERSONINSHIFT:
        return {
          ...state,
          personInShifts: [
            ...state.personInShifts.filter((shift) => shift._id !== payload._id),
            { ...payload, status: 0 },
          ],
        };
      default:
        return state;
    }
  }
  