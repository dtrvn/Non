import axios from "axios";
import { setAlert } from "./alert";

import {
    GET_PERSONINSHIFT,
    ADD_PERSONINSHIFT,
    UPDATE_PERSONINSHIFT,
    PERSONINSHIFT_ERROR,
} from "./types";

// Create or update shift
export const addPersonInShift =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post("/api/personInShifts", formData, config);

      if (edit) {
        dispatch({
          type: UPDATE_PERSONINSHIFT,
          payload: res.data,
        });
      } else {
        dispatch({
          type: ADD_PERSONINSHIFT,
          payload: res.data,
        });
      }
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: PERSONINSHIFT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// Get person in Shift by dateFrom and dateTo
export const getPersonInShift = (dateFrom, dateTo) => async (dispatch) => {
  try {
    console.log("in ra "+dateFrom+" - "+dateTo);
    const res = await axios.get(`/api/personInShifts/${dateFrom}/${dateTo}`);
    dispatch({
      type: GET_PERSONINSHIFT,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    dispatch({
      type: PERSONINSHIFT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
