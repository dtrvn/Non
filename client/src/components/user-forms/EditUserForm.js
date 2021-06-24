import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createUser, getCurrentUser } from "../../actions/user";

const EditUserForm = ({
  user: { user, loading },
  typeUser: { typeUsers },
  createUser,
  history,
}) => {
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    email: "",
    phone: "",
    typeUserId: "",
    status: "",
    roles: "",
  });

  useEffect(() => {
    setFormData({
      id: !user ? "" : user._id,
      name: !user ? "" : user.name,
      email: !user ? "" : user.email,
      phone: !user ? "" : user.phone,
      typeUserId: !user ? "" : user.typeUserId,
      status: !user ? "" : user.status,
      roles: !user ? "" : user.roles,
    });
  }, [user]);

  const { name, email, phone, typeUserId, status, roles } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createUser(formData, history, true);
  };

  let elmTypeUsers = typeUsers.map((ele) => (
    <option value={ele._id}>{ele.typeUsername}</option>
  ));

  elmTypeUsers.unshift([<option value={0}>* Chọn loại nhân viên</option>]);

  return (
    <Fragment>
      <h1 className="large text-primary">Điều chỉnh thông tin nhân viên</h1>
      <p className="lead">
        <i className="fas fa-user" /> Hãy điều chỉnh thông tin vào các ô bên
        dưới
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

EditUserForm.propTypes = {
  createUser: PropTypes.func.isRequired,
  // getCurrentUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  typeUser: state.typeUser,
});

export default connect(mapStateToProps, { createUser })(
  withRouter(EditUserForm)
);
