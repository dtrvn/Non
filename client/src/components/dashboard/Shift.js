import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { deleteShift, getAllShifts } from "../../actions/shift";
import AddShiftForm from "../shift-forms/AddShiftForm";
import EditShiftForm from "../shift-forms/EditShiftForm";

const Shift = ({ deleteShift, getAllShifts, shift: { shifts, shift } }) => {
  const initialFormState = { id: null, shiftName: "", shiftTime: "" };

  // Setting state
  const [currentShift, setCurrentShift] = useState(initialFormState);
  const [editing, setEditing] = useState(false);

  const editShift = (shift) => {
    setEditing(true);

    setCurrentShift({
      id: shift._id,
      shiftName: shift.shiftName,
      shiftTime: shift.shiftTime,
    });
  };

  const listShifts = shifts.map((shift) => (
    <tr key={shift._id}>
      <td>{shift.shiftName}</td>
      <td>{shift.shiftTime}</td>
      <td>
        <button onClick={() => editShift(shift)} className="btn btn-success">
          Chỉnh sửa
        </button>
        <button
          onClick={() => deleteShift(shift._id)}
          className="btn btn-danger"
        >
          Xóa
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Ca làm việc</h2>
      {editing ? (
        <EditShiftForm
          editing={editing}
          setEditing={setEditing}
          currentShift={currentShift}
        />
      ) : (
        <AddShiftForm />
      )}
      <table className="table">
        <thead>
          <tr>
            <th>Tên ca</th>
            <th>Thời gian làm</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>{listShifts}</tbody>
      </table>
    </Fragment>
  );
};

Shift.propTypes = {
  getAllShifts: PropTypes.func.isRequired,
  deleteShift: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  shift: state.shift,
});

export default connect(mapStateToProps, { deleteShift, getAllShifts })(Shift);
