import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createUser } from "../../actions/user";
import Select from "react-select";

const AddUserForm = ({
  createUser,
  editing,
  currentUser,
  history,
  typeUser: { typeUsers },
}) => {
  const initialFormState = {
    id: null,
    name: "",
    email: "",
    phone: "",
    typeUserId: "",
    status: "",
    roles: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleChangeTypeUser = (value) => {
    setFormData({
      ...formData,
      typeUserId: typeUsers.map((ele) =>
        ele.typeUsername === value ? ele._id : ""
      ),
    });
  };

  const clearForm = () => {
    setFormData({
      ...formData,
      name: "",
      email: "",
      phone: "",
      typeUserId: "",
      status: "",
      roles: "",
    });
  };

  const blankValue = "";

  var elmTypeUsers = [];
  typeUsers.map((typeUser, index) => {
    elmTypeUsers.push({
      label: typeUser.typeUsername,
      value: typeUser.typeUsername,
    });
  });

  return (
    <Fragment>
      <form
        class="form"
        onSubmit={(e) => {
          e.preventDefault();
          createUser(formData, history);
          clearForm();
        }}
      >
        <table className="table">
          <tbody>
            <td>
              <input
                type="text"
                placeholder="* Tên nhân viên"
                name="name"
                value={formData.name}
                onChange={(e) => onChange(e)}
                required
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="* Email"
                name="email"
                value={formData.email}
                onChange={(e) => onChange(e)}
                required
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="* Số điện thoại"
                name="phone"
                value={formData.phone}
                onChange={(e) => onChange(e)}
                required
              />
            </td>
            <td>
              <Select
                className="form-control form-white"
                options={elmTypeUsers}
                value={blankValue}
                onChange={(value) => this.handleChangeTypeUser(value)}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="* Trạng thái"
                name="status"
                value={formData.status}
                onChange={(e) => onChange(e)}
                required
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="* Quyền"
                name="roles"
                value={formData.roles}
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

AddUserForm.propTypes = {
  createUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  typeUser: state.typeUser,
});

export default connect(mapStateToProps, { createUser })(
  withRouter(AddUserForm)
);
