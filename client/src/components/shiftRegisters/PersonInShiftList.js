import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";

const PersonInShiftList = ({
    personInShiftsItem: {_id, personNumber}
}) => (
    <Fragment>
        <div className="Rtable-cell date-cell">
            <div className="Rtable-cell--content date-content"><span className="webinar-date">Số người</span></div>
        </div>
        {/* <div className="Rtable-cell monday-cell">
            <div className="Rtable-cell--content boder-cell">{ele.personNumber}</div>
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
        </div> */}
    </Fragment>

);

PersonInShiftList.defaultProps = {
    showActions: true,
};

PersonInShiftList.propTypes = {
    personInShiftsItem: PropTypes.object.isRequired,
};

export default connect(null, {  })(
    PersonInShiftList
);
