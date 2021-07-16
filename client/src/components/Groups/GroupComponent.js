import React from "react";
import "../../styles/Dash.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-dropdown-select";
import { setActiveGroup } from "../../actions/groupActions";
import { getItems } from "../../actions/itemActions";
/**
 *
 * @PageLocation Dashboard
 * @Component GroupComponent
 * @Description  Handles active group for the user
 *
 */
export const GroupComponent = ({}) => {
  const groups = useSelector((state) => state.group.groups);
  const UID = useSelector((state) => state.auth.user.id);
  const showAddModal = useSelector(
    (state) => state.item.itemAddition.displayAddModal
  );
  const dispatch = useDispatch();
  const handleChange = (values) => {
    dispatch(setActiveGroup(values[0]));
    let GroupID = values[0].id;
    dispatch(getItems(UID, GroupID));
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <div
          className="ActiveGroupHeader"
          style={{ visibility: showAddModal ? "hidden" : "visible" }}
        >
          {groups && groups.length !== 0 && (
            <div style={{ position: "absolute", left: "50%", display: "flex" }}>
              <div style={{ position: "relative", left: "-50%" }}>
                <Select
                  options={groups}
                  onChange={(values) => handleChange(values)}
                  labelField="groupname"
                  valueField="id"
                  placeholder="Select Group"
                  style={{
                    width: 300,
                    margin: "auto",
                  }}
                  dropdownHeight="200px"
                  dropdownGap={-5}
                />
              </div>
            </div>
          )}
          {groups && groups.length === 0 && (
            <Link
              to={`/managegroups`}
              style={{
                textDecoration: "none",
              }}
            >
              <div className="NullGroupPrompt">Join Or Create a Group!</div>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
