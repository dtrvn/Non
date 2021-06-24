import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { Link, withRouter, Redirect } from "react-router-dom";
import { deleteJob, getAllJobs, getJob } from "../../actions/job";
import AddJobForm from "../job-forms/AddJobForm";
import EditJobForm from "../job-forms/EditJobForm";

const Job = ({ deleteJob, getAllJobs, job: { jobs, job } }) => {
  const initialFormState = { id: null, jobName: "", jobCost: "" };

  // Setting state
  const [currentJob, setCurrentJob] = useState(initialFormState);
  const [editing, setEditing] = useState(false);

  const editJob = (job) => {
    setEditing(true);

    setCurrentJob({ id: job._id, jobName: job.jobName, jobCost: job.jobCost });
  };

  const listJobs = jobs.map((job) => (
    <tr key={job._id}>
      <td>{job.jobName}</td>
      <td className="hide-sm">{job.jobCost}</td>
      <td>
        <button onClick={() => editJob(job)} className="btn btn-success">
          Chỉnh sửa
        </button>
        <button onClick={() => deleteJob(job._id)} className="btn btn-danger">
          Xóa
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Công việc</h2>
      {editing ? (
        <EditJobForm
          editing={editing}
          setEditing={setEditing}
          currentJob={currentJob}
        />
      ) : (
        <AddJobForm />
      )}
      <table className="table">
        <thead>
          <tr>
            <th>Tên công việc</th>
            <th>Số tiền</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>{listJobs}</tbody>
      </table>
    </Fragment>
  );
};

Job.propTypes = {
  getAllJobs: PropTypes.func.isRequired,
  deleteJob: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  job: state.job,
});

export default connect(mapStateToProps, { deleteJob, getAllJobs })(Job);
