import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { deleteTypeUser, getAllTypeUsers } from "../../actions/typeUser";
import AddTypeUserForm from "../typeUser-forms/AddTypeUserForm";
import EditTypeUserForm from "../typeUser-forms/EditTypeUserForm";

const TypeUser = ({
  deleteTypeUser,
  getAllTypeUsers,
  typeUser: { typeUsers, typeUser },
}) => {
  const initialFormState = {
    id: null,
    typeUsername: "",
    typeUserPercentCost: "",
  };

  // Setting state
  const [currentTypeUser, setCurrentTypeUser] = useState(initialFormState);
  const [editing, setEditing] = useState(false);

  const editTypeUser = (typeUser) => {
    setEditing(true);

    setCurrentTypeUser({
      id: typeUser._id,
      typeUsername: typeUser.typeUsername,
      typeUserPercentCost: typeUser.typeUserPercentCost,
    });
  };

  const listTypeUsers = typeUsers.map((typeUser) => (
    <tr key={typeUser._id}>
      <td>{typeUser.typeUsername}</td>
      <td>{typeUser.typeUserPercentCost}</td>
      <td>
        <button
          onClick={() => editTypeUser(typeUser)}
          className="btn btn-success"
        >
          Chỉnh sửa
        </button>
        <button
          onClick={() => deleteTypeUser(typeUser._id)}
          className="btn btn-danger"
        >
          Xóa
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Loại nhân viên</h2>
      {editing ? (
        <EditTypeUserForm
          editing={editing}
          setEditing={setEditing}
          currentTypeUser={currentTypeUser}
        />
      ) : (
        <AddTypeUserForm />
      )}
      <table className="table">
        <thead>
          <tr>
            <th>Tên loại nhân viên</th>
            <th>Phần trăm tiền lương</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>{listTypeUsers}</tbody>
      </table>
    </Fragment>
  );
};

TypeUser.propTypes = {
  getAllTypeUsers: PropTypes.func.isRequired,
  deleteTypeUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  typeUser: state.typeUser,
});

export default connect(mapStateToProps, { deleteTypeUser, getAllTypeUsers })(
  TypeUser
);
