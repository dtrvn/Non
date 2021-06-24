import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addShift } from "../../actions/shift";

const AddShiftForm = ({ addShift, editing, currentShift, history }) => {
  const initialFormState = { id: null, shiftName: "", shiftTime: "" };

  const [formData, setFormData] = useState(initialFormState);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const clearForm = () => {
    setFormData({ ...formData, shiftName: "", shiftTime: "" });
  };

  return (
    <Fragment>
      <form
        class="form"
        onSubmit={(e) => {
          e.preventDefault();
          addShift(formData, history);
          clearForm();
        }}
      >
        <table className="table">
          <tbody>
            <td>
              <input
                type="text"
                placeholder="* Tên ca"
                name="shiftName"
                value={formData.shiftName}
                onChange={(e) => onChange(e)}
                required
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="* Thời gian làm"
                name="shiftTime"
                value={formData.shiftTime}
                onChange={(e) => onChange(e)}
                required
              />
            </td>
            <td>
              <button type="submit" class="btn btn-primary my-1">
                Lưu
              </button>
            </td>
          </tbody>
        </table>
      </form>
    </Fragment>
  );
};

AddShiftForm.propTypes = {
  addShift: PropTypes.func.isRequired,
};

export default connect(null, { addShift })(withRouter(AddShiftForm));
