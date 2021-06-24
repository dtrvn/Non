import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addJob, getAllJobs } from "../../actions/job";

const AddJobForm = ({ addJob, editing, currentJob, history }) => {
  const initialFormState = { id: null, jobName: "", jobCost: "" };

  const [formData, setFormData] = useState(initialFormState);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const clearForm = () => {
    setFormData({ ...formData, jobName: "", jobCost: "" });
  };

  return (
    <Fragment>
      <form
        class="form"
        onSubmit={(e) => {
          e.preventDefault();
          addJob(formData, history);
          clearForm();
        }}
      >
        <table className="table">
          <tbody>
            <td>
              <input
                type="text"
                placeholder="* Tên công việc"
                name="jobName"
                value={formData.jobName}
                onChange={(e) => onChange(e)}
                required
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="* Số tiền"
                name="jobCost"
                value={formData.jobCost}
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

AddJobForm.propTypes = {
  addJob: PropTypes.func.isRequired,
  getAllJobs: PropTypes.func.isRequired,
};

export default connect(null, { addJob, getAllJobs })(withRouter(AddJobForm));
