import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTypeUser } from "../../actions/typeUser";

const EditTypeUserForm = ({
  addTypeUser,
  editing,
  setEditing,
  currentTypeUser,
  history,
}) => {
  const [formData, setFormData] = useState(currentTypeUser);

  useEffect(() => {
    setFormData(currentTypeUser);
  }, [currentTypeUser]);

  const typeUsername = formData.typeUsername;
  const typeUserPercentCost = formData.typeUserPercentCost;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const clearForm = () => {
    setFormData({ ...formData, typeUsername: "", typeUserPercentCost: "" });
    setEditing(false);
  };

  return (
    <Fragment>
      <form
        class="form"
        onSubmit={(e) => {
          e.preventDefault();
          addTypeUser(formData, history, true);
          clearForm();
        }}
      >
        <table className="table">
          <tbody>
            <td>
              <input
                type="text"
                placeholder="* Tên loại nhân viên"
                name="typeUsername"
                value={formData.typeUsername}
                onChange={(e) => onChange(e)}
                required
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="* Phần trăm tiền lương"
                name="typeUserPercentCost"
                value={formData.typeUserPercentCost}
                onChange={(e) => onChange(e)}
                required
              />
            </td>
            <td>
              <button type="submit" class="btn btn-primary my-1">
                Lưu
              </button>
              <button
                onClick={() => setEditing(false)}
                class="btn btn-danger my-1"
              >
                Hủy bỏ
              </button>
            </td>
          </tbody>
        </table>
      </form>
    </Fragment>
  );
};

EditTypeUserForm.propTypes = {
  addTypeUser: PropTypes.func.isRequired,
  setEditing: PropTypes.func.isRequired,
};

export default connect(null, { addTypeUser })(withRouter(EditTypeUserForm));
