import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createUser } from "../../actions/user";

const AddUserForm = ({ createUser, history, typeUser: { typeUsers } }) => {
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    email: "",
    phone: "",
    typeUserId: "",
    status: "",
    roles: "",
  });

  const { name, email, phone, typeUserId, status, roles } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log("in ra mang " + JSON.stringify(formData));
    createUser(formData, history);
  };

  const blankValue = "";

  // var elmTypeUsers = [];
  // typeUsers.map((typeUser, index) => {
  //   elmTypeUsers.push({
  //     label: typeUser.typeUsername,
  //     value: typeUser.typeUsername,
  //   });
  // });

  let elmTypeUsers = typeUsers.map((ele) => (
    <option value={ele._id}>{ele.typeUsername}</option>
  ));

  elmTypeUsers.unshift([<option value={0}>* Chọn loại nhân viên</option>]);

  return (
    <Fragment>
      <h1 className="large text-primary">Tạo mới nhân viên</h1>
      <p className="lead">
        <i className="fas fa-user" /> Hãy nhập thông tin vào các ô bên dưới
      </p>
      <small>* = Ô bắt buộc nhập</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Họ và tên"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Số điện thoại"
            name="phone"
            value={phone}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <select
            name="typeUserId"
            value={typeUserId}
            onChange={(e) => onChange(e)}
          >
            {elmTypeUsers}
          </select>
          {/* <select
            name="typeUserId"
            value={typeUserId}
            onChange={(e) => onChange(e)}
          >
            <option value={0}>* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select> */}
        </div>
        <div className="form-group">
          <select name="status" value={status} onChange={(e) => onChange(e)}>
            <option value={0}>* Chọn trạng thái</option>
            <option value="Hoạt động">Hoạt động</option>
            <option value="Ẩn">Ẩn</option>
          </select>
        </div>
        <div className="form-group">
          <select name="roles" value={roles} onChange={(e) => onChange(e)}>
            <option value={0}>* Chọn quyền</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary my-1">
          Lưu
        </button>
        <Link className="btn btn-light my-1" to="/users">
          Trở về
        </Link>
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
