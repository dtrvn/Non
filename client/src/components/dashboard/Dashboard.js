import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Job from "./Job";
import Branch from "./Branch";
import Shift from "./Shift";
import TypeUser from "./TypeUser";
import ChangePassForm from "../memberChange-forms/ChangePassForm";
import Education from "./Education";
import { getCurrentUser } from "../../actions/user";
import { getAllJobs } from "../../actions/job";
import { getAllBranchs } from "../../actions/branch";
import { getAllShifts } from "../../actions/shift";
import { getAllTypeUsers } from "../../actions/typeUser";
import { getAllUsers } from "../../actions/user";

const Dashboard = ({
  getCurrentUser,
  getAllJobs,
  getAllBranchs,
  getAllShifts,
  getAllTypeUsers,
  getAllUsers,
  deleteEducation,
  auth: { user },
  profile: { profile, loading },
  job: { jobs },
  branch: { branchs },
}) => {
  useEffect(() => {
    // getCurrentUser();
    getAllJobs();
    getAllBranchs();
    getAllShifts();
    getAllTypeUsers();
    getAllUsers();
  }, [
    // getCurrentUser,
    getAllJobs,
    getAllBranchs,
    getAllShifts,
    getAllTypeUsers,
    getAllUsers,
  ]);

  const [displayChangePass, toggleChangePass] = useState(false);
  const [displayChangeInfo, toggleChangeInfo] = useState(false);

  return (
    <Fragment>
      <h1 className="large text-primary">Trang thông tin</h1>
      <p className="lead">
        <i className="fas fa-user"></i>Chào mừng {user && user.name}
      </p>
      <Fragment>
        <h2>Email: {user && user.email}</h2>
        <h2>Phone: {user && user.phone}</h2>
        <button
          type="button"
          class="btn"
          onClick={(e) => toggleChangePass(!displayChangePass)}
        >
          <i className="fas fa-user-circle text-primary"></i> Đổi mật khẩu
        </button>

        {/* <DashboardActions /> */}

        {displayChangePass && <ChangePassForm />}

        {user && user.roles === "User" ? (
          ""
        ) : (
          <Fragment>
            <Job />
            <Branch />
            <Shift />
            <TypeUser />
          </Fragment>
        )}
      </Fragment>
    </Fragment>
  );
};

Dashboard.propTypes = {
  // getCurrentUser: PropTypes.func.isRequired,
  getAllJobs: PropTypes.func.isRequired,
  getAllBranchs: PropTypes.func.isRequired,
  getAllShifts: PropTypes.func.isRequired,
  getAllTypeUsers: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  job: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  job: state.job,
  branch: state.branch,
  shift: state.shift,
  typeUser: state.typeUser,
  // user: state.user,
});

export default connect(mapStateToProps, {
  // getCurrentUser,
  getAllJobs,
  getAllBranchs,
  getAllShifts,
  getAllTypeUsers,
  getAllUsers,
})(Dashboard);
