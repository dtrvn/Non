import React, { Fragment, useState, useEffect, createElement } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import Moment from "react-moment";
import moment from "moment";
import { getAllShifts } from "../../actions/shift";
import { getAllUsers } from "../../actions/user";
import { getPersonInShift } from "../../actions/personInShift";
import PersonInShiftList from "./PersonInShiftList";

const ShiftRegisters = ({
  setAlert,
  getAllShifts,
  getAllUsers,
  getPersonInShift,
  user: { users },
  auth: { user },
  shift: { shifts },
  personInShift: { personInShifts },
}) => {
  useEffect(() => {
    getAllShifts();
    getAllUsers();
    getPersonInShift(moment(createDate.firstdayOfThisWeek).format('MM-DD-YYYY'), moment(createDate.lastdayOfThisWeek).format('MM-DD-YYYY'));
  }, [getAllShifts, getAllUsers, getPersonInShift]);

  const [createDate, setCreateDate] = useState({
    currentDate: moment().toString(),
    firstdayOfThisWeek: moment().startOf("isoWeek"),
    lastdayOfThisWeek: moment().startOf("isoWeek").add(6, "days"),
    monday: moment().startOf("isoWeek"),
    tuesday: moment().startOf("isoWeek").add(1, "days"),
    wednesday: moment().startOf("isoWeek").add(2, "days"),
    thursday: moment().startOf("isoWeek").add(3, "days"),
    friday: moment().startOf("isoWeek").add(4, "days"),
    saturday: moment().startOf("isoWeek").add(5, "days"),
    sunday: moment().startOf("isoWeek").add(6, "days"),
  });

  // const date1 = moment().startOf("isoWeek");
  // const date2 = moment().startOf("isoWeek").add(6, "days");

  // setCreateDate({
  //   firstdayOfThisWeek: date1,
  //   lastdayOfThisWeek: date2,
  // });

  // const currentDate = moment().toString();
  // const firstdayOfThisWeek = moment().startOf("isoWeek");
  // const lastdayOfThisWeek = firstdayOfThisWeek.add(6, "days");

  const onPrevWeek = () => {
    const currentFirstWeek = createDate.firstdayOfThisWeek.subtract(7, "days");
    const currentLastWeek = createDate.lastdayOfThisWeek.subtract(7, "days");

    const mondayCurrent = currentFirstWeek;
    const tuesdayCurrent = currentFirstWeek.clone().add(1, "days");
    const wednesdayCurrent = currentFirstWeek.clone().add(2, "days");
    const thursdayCurrent = currentFirstWeek.clone().add(3, "days");
    const fridayCurrent = currentFirstWeek.clone().add(4, "days");
    const saturdayCurrent = currentFirstWeek.clone().add(5, "days");
    const sundayCurrent = currentLastWeek;

    setCreateDate({
      ...createDate,
      firstdayOfThisWeek: currentFirstWeek,
      lastdayOfThisWeek: currentLastWeek,
      monday: mondayCurrent,
      tuesday: tuesdayCurrent,
      wednesday: wednesdayCurrent,
      thursday: thursdayCurrent,
      friday: fridayCurrent,
      saturday: saturdayCurrent,
      sunday: sundayCurrent,
    });
  };

  const onNextWeek = () => {
    const currentFirstWeek = createDate.firstdayOfThisWeek.add(7, "days");
    const currentLastWeek = createDate.lastdayOfThisWeek.add(7, "days");

    const mondayCurrent = currentFirstWeek;
    const tuesdayCurrent = currentFirstWeek.clone().add(1, "days");
    const wednesdayCurrent = currentFirstWeek.clone().add(2, "days");
    const thursdayCurrent = currentFirstWeek.clone().add(3, "days");
    const fridayCurrent = currentFirstWeek.clone().add(4, "days");
    const saturdayCurrent = currentFirstWeek.clone().add(5, "days");
    const sundayCurrent = currentLastWeek;

    setCreateDate({
      ...createDate,
      firstdayOfThisWeek: currentFirstWeek,
      lastdayOfThisWeek: currentLastWeek,
      monday: mondayCurrent,
      tuesday: tuesdayCurrent,
      wednesday: wednesdayCurrent,
      thursday: thursdayCurrent,
      friday: fridayCurrent,
      saturday: saturdayCurrent,
      sunday: sundayCurrent,
    });
  };

  const onCurrentWeek = () => {
    const currentFirstWeek = moment().startOf("isoWeek");
    const currentLastWeek = moment().startOf("isoWeek").add(6, "days");

    const mondayCurrent = currentFirstWeek;
    const tuesdayCurrent = currentFirstWeek.clone().add(1, "days");
    const wednesdayCurrent = currentFirstWeek.clone().add(2, "days");
    const thursdayCurrent = currentFirstWeek.clone().add(3, "days");
    const fridayCurrent = currentFirstWeek.clone().add(4, "days");
    const saturdayCurrent = currentFirstWeek.clone().add(5, "days");
    const sundayCurrent = currentLastWeek;

    setCreateDate({
      ...createDate,
      firstdayOfThisWeek: currentFirstWeek,
      lastdayOfThisWeek: currentLastWeek,
      monday: mondayCurrent,
      tuesday: tuesdayCurrent,
      wednesday: wednesdayCurrent,
      thursday: thursdayCurrent,
      friday: fridayCurrent,
      saturday: saturdayCurrent,
      sunday: sundayCurrent,
    });
  };

  const {
    currentDate,
    firstdayOfThisWeek,
    lastdayOfThisWeek,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
  } = createDate;

  let elmShiftsTable = shifts.map((ele) => <td colspan="1">{ele.shiftName}</td>);
  let elmShifts = shifts.map((ele) => <div className="Rtable-cell--content boder-cell">{ele.shiftName}</div>);

  let shiftsSize = shifts.length;
  let shiftsArray = [];
  shifts.map((ele) => shiftsArray.push(ele._id));
  console.log("in ra " + shiftsSize + " - " + JSON.stringify(shiftsArray));
  let elmPersonInShifts = [];
  personInShifts.map((ele) => {
    if (moment(createDate.monday).format('MM-DD-YYYY') === moment(ele.date).format('MM-DD-YYYY')) {
      // let getPosition = shiftsArray.indexOf(ele.shiftId);
      // if(getPosition = 0 ){
      elmPersonInShifts.push(<td colspan="1">{ele.personNumber}</td>);
      // }
    }
    if (moment(createDate.tuesday).format('MM-DD-YYYY') === moment(ele.date).format('MM-DD-YYYY')) {
      elmPersonInShifts.push(<td colspan="1">{ele.personNumber}</td>);
    }
    if (moment(createDate.wednesday).format('MM-DD-YYYY') === moment(ele.date).format('MM-DD-YYYY')) {
      elmPersonInShifts.push(<td colspan="1">{ele.personNumber}</td>);
    }
    if (moment(createDate.thursday).format('MM-DD-YYYY') === moment(ele.date).format('MM-DD-YYYY')) {
      elmPersonInShifts.push(<td colspan="1">{ele.personNumber}</td>);
    }
    if (moment(createDate.friday).format('MM-DD-YYYY') === moment(ele.date).format('MM-DD-YYYY')) {
      elmPersonInShifts.push(<td colspan="1">{ele.personNumber}</td>);
    }
    if (moment(createDate.saturday).format('MM-DD-YYYY') === moment(ele.date).format('MM-DD-YYYY')) {
      elmPersonInShifts.push(<td colspan="1">{ele.personNumber}</td>);
    }
    if (moment(createDate.sunday).format('MM-DD-YYYY') === moment(ele.date).format('MM-DD-YYYY')) {
      elmPersonInShifts.push(<td colspan="1">{ele.personNumber}</td>);
    }
  })
  // let elmPersonInShifts = [];
  // personInShifts.map((ele) => {
  //   if (moment(createDate.monday).format('MM-DD-YYYY') === moment(ele.date).format('MM-DD-YYYY')) {
  //     // let getPosition = shiftsArray.indexOf(ele.shiftId);
  //     // if(getPosition = 0 ){
  //     elmPersonInShifts.push(<div className="Rtable-cell--content boder-cell">{ele.personNumber}</div>);
  //     // }
  //   }
  //   if (moment(createDate.tuesday).format('MM-DD-YYYY') === moment(ele.date).format('MM-DD-YYYY')) {
  //     elmPersonInShifts.push(<div className="Rtable-cell--content boder-cell">{ele.personNumber}</div>);
  //   }
  //   if (moment(createDate.wednesday).format('MM-DD-YYYY') === moment(ele.date).format('MM-DD-YYYY')) {
  //     elmPersonInShifts.push(<div className="Rtable-cell--content boder-cell">{ele.personNumber}</div>);
  //   }
  //   if (moment(createDate.thursday).format('MM-DD-YYYY') === moment(ele.date).format('MM-DD-YYYY')) {
  //     elmPersonInShifts.push(<div className="Rtable-cell--content boder-cell">{ele.personNumber}</div>);
  //   }
  //   if (moment(createDate.friday).format('MM-DD-YYYY') === moment(ele.date).format('MM-DD-YYYY')) {
  //     elmPersonInShifts.push(<div className="Rtable-cell--content boder-cell">{ele.personNumber}</div>);
  //   }
  //   if (moment(createDate.saturday).format('MM-DD-YYYY') === moment(ele.date).format('MM-DD-YYYY')) {
  //     elmPersonInShifts.push(<div className="Rtable-cell--content boder-cell">{ele.personNumber}</div>);
  //   }
  //   if (moment(createDate.sunday).format('MM-DD-YYYY') === moment(ele.date).format('MM-DD-YYYY')) {
  //     elmPersonInShifts.push(<div className="Rtable-cell--content boder-cell">{ele.personNumber}</div>);
  //   }
  // })


  let getUsers = users.filter((ele) => ele.roles === "User");

  let elmUsers = getUsers.map((ele, index) => (
    <tr>
      <td colspan="3">{ele.name}</td>
      <td colspan="3"></td>
      <td colspan="3"></td>
      <td colspan="3"></td>
      <td colspan="3"></td>
      <td colspan="3"></td>
      <td colspan="3"></td>
      <td colspan="3"></td>
    </tr>
  ));

  return (
    <Fragment>
      <h1 className="large text-primary">Đăng ký ca</h1>
      <p class="card-category">
        Tuần: <Moment format="DD/MM/YYYY">{firstdayOfThisWeek}</Moment>
        {" - "}
        <Moment format="DD/MM/YYYY">{lastdayOfThisWeek}</Moment>
        <button
          type="button"
          class="btn btn-primary"
          style={{ marginLeft: "100px" }}
          onClick={() => onPrevWeek()}
        >
          Tuần trước
        </button>
        <button
          type="button"
          class="btn btn-primary"
          onClick={() => onCurrentWeek()}
        >
          Tuần hiện tại
        </button>
        <button
          type="button"
          class="btn btn-primary"
          onClick={() => onNextWeek()}
        >
          Tuần tới
        </button>
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModalCenter"
        >
          Tạo ca làm
        </button>
      </p>
      <br />
      <div class="container">
        <div class="table-responsive-sm">
          <table class="table-shiftRegister">
            <thead class=" text-primary">
              <th colspan="3">Họ và Tên</th>
              <th colspan="3">
                Thứ 2 (<Moment format="DD/MM">{monday}</Moment>)
              </th>
              <th colspan="3">
                Thứ 3 (<Moment format="DD/MM">{tuesday}</Moment>)
              </th>
              <th colspan="3">
                Thứ 4 (<Moment format="DD/MM">{wednesday}</Moment>)
              </th>
              <th colspan="3">
                Thứ 5 (<Moment format="DD/MM">{thursday}</Moment>)
              </th>
              <th colspan="3">
                Thứ 6 (<Moment format="DD/MM">{friday}</Moment>)
              </th>
              <th colspan="3">
                Thứ 7 (<Moment format="DD/MM">{saturday}</Moment>)
              </th>
              <th colspan="3">
                Chủ nhật (<Moment format="DD/MM">{sunday}</Moment>)
              </th>
              <th colspan="3">
                Hành động
              </th>
            </thead>
            <tbody>
              <tr>
                <td colspan="3">Ca</td>
                {elmShiftsTable}
                {elmShiftsTable}
                {elmShiftsTable}
                {elmShiftsTable}
                {elmShiftsTable}
                {elmShiftsTable}
                {elmShiftsTable}
              </tr>
              <tr>
                <td colspan="3">Số người</td>
                {elmPersonInShifts.length > 0 ? (
                  elmPersonInShifts
                ) : (
                  <Fragment>
                    <td colspan="1"></td>
                    <td colspan="1"></td>
                    <td colspan="1"></td>
                    <td colspan="1"></td>
                    <td colspan="1"></td>
                    <td colspan="1"></td>
                    <td colspan="1"></td>
                    <td colspan="1"></td>
                    <td colspan="1"></td>
                    <td colspan="1"></td>
                    <td colspan="1"></td>
                    <td colspan="1"></td>
                    <td colspan="1"></td>
                    <td colspan="1"></td>
                    <td colspan="1"></td>
                    <td colspan="1"></td>
                    <td colspan="1"></td>
                    <td colspan="1"></td>
                    <td colspan="1"></td>
                    <td colspan="1"></td>
                    <td colspan="1"></td>
                  </Fragment>
                )

                }
                {/* {elmPersonInShifts} */}
                <td colspan="3">
                  <button

                    className="btn btn-success"
                  >
                    Chỉnh sửa
                  </button>
                  <button
                    className="btn btn-danger"
                  >
                    Xóa
                  </button>
                </td>
              </tr>

              {elmUsers}
            </tbody>
          </table>
        </div>



        {/* Test table flex */}
        <div className="wrapper">
          <div className="Rtable Rtable--5cols Rtable--collapse">
            <div className="Rtable-row Rtable-row--head">
              <div className="Rtable-cell date-cell column-heading">Họ và tên</div>
              <div className="Rtable-cell header-cell-1  column-heading">Thứ 2 (<Moment format="DD/MM">{monday}</Moment>)</div>
              <div className="Rtable-cell header-cell-allnot1 column-heading">Thứ 3 (<Moment format="DD/MM">{tuesday}</Moment>)</div>
              <div className="Rtable-cell header-cell-allnot1 column-heading">Thứ 4 (<Moment format="DD/MM">{wednesday}</Moment>)</div>
              <div className="Rtable-cell header-cell-allnot1 column-heading">Thứ 5 (<Moment format="DD/MM">{thursday}</Moment>)</div>
              <div className="Rtable-cell header-cell-allnot1 column-heading">Thứ 6 (<Moment format="DD/MM">{friday}</Moment>)</div>
              <div className="Rtable-cell header-cell-allnot1 column-heading">Thứ 7 (<Moment format="DD/MM">{saturday}</Moment>)</div>
              <div className="Rtable-cell header-cell-allnot1 column-heading">Chủ nhật (<Moment format="DD/MM">{sunday}</Moment>)</div>
              <div className="Rtable-cell action-cell column-heading">Hành động</div>
            </div>
            <div className="Rtable-row">
              <div className="Rtable-cell date-cell">
                <div className="Rtable-cell--content date-content"><span className="webinar-date">August 2nd, 2016</span><br />6:00 pm (CDT)</div>
              </div>
              <div className="Rtable-cell monday-cell">
                <div className="Rtable-cell--content access-link-content"><a href="#0"><i className="ion-link" />Thứ 2</a></div>
              </div>
              <div className="Rtable-cell tuesday-cell">
                <div className="Rtable-cell--content access-link-content"><a href="#0"><i className="ion-link" />Thứ 2</a></div>
              </div>
              <div className="Rtable-cell wednesday-cell">
                <div className="Rtable-cell--content access-link-content"><a href="#0"><i className="ion-link" />Thứ 2</a></div>
              </div>
              <div className="Rtable-cell thursday-cell">
                <div className="Rtable-cell--content access-link-content"><a href="#0"><i className="ion-link" />Thứ 2</a></div>
              </div>
              <div className="Rtable-cell friday-cell">
                <div className="Rtable-cell--content access-link-content"><a href="#0"><i className="ion-link" />Thứ 2</a></div>
              </div>
              <div className="Rtable-cell saturday-cell">
                <div className="Rtable-cell--content access-link-content"><a href="#0"><i className="ion-link" />Thứ 2</a></div>
              </div>
              <div className="Rtable-cell sunday-cell">
                <div className="Rtable-cell--content access-link-content"><a href="#0"><i className="ion-link" />Thứ 2</a></div>
              </div>
              <div className="Rtable-cell action-cell">
                <div className="Rtable-cell--content access-link-content"><a href="#0"><i className="ion-link" />Thứ 2</a></div>
              </div>
            </div>
            <div className="Rtable-row is-striped">
              <div className="Rtable-cell date-cell">
                <div className="Rtable-cell--content date-content"><span className="webinar-date">Ca</span></div>
              </div>
              <div className="Rtable-cell monday-cell">
                {elmShifts}
              </div>
              <div className="Rtable-cell tuesday-cell">
                {elmShifts}
              </div>
              <div className="Rtable-cell wednesday-cell">
                {elmShifts}
              </div>
              <div className="Rtable-cell thursday-cell">
                {elmShifts}
              </div>
              <div className="Rtable-cell friday-cell">
                {elmShifts}
              </div>
              <div className="Rtable-cell saturday-cell">
                {elmShifts}
              </div>
              <div className="Rtable-cell sunday-cell">
                {elmShifts}
              </div>
              <div className="Rtable-cell action-cell">
                {elmShifts}
              </div>
            </div>
            {/* <div className="Rtable-row">
              {personInShifts.map((personInShiftsItem) => (
                <PersonInShiftList key={personInShiftsItem._id} personInShiftsItem={personInShiftsItem} />
              ))}
            </div> */}





          </div>
        </div>
        {/* End of add table flex */}

      </div>
    </Fragment>
  );
};

ShiftRegisters.propTypes = {
  getAllShifts: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  getPersonInShift: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  auth: state.auth,
  shift: state.shift,
  personInShift: state.personInShift,
});

export default connect(mapStateToProps, {
  getAllShifts,
  getAllUsers,
  getPersonInShift,
})(ShiftRegisters);
