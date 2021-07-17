import React, { useEffect, useState } from "react";
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
  const [activeGroupName, setActiveGroupName] = useState("Select a Group");

  const groups = useSelector((state) => state.group.groups);
  const CurrentGroup = useSelector((state) => state.group.currentGroup.Group);
  const UID = useSelector((state) => state.auth.user.id);
  const showAddModal = useSelector(
    (state) => state.item.itemAddition.displayAddModal
  );
  const showEditModal = useSelector(
    (state) => state.item.selectedItem.displayEditModal
  );
  const dispatch = useDispatch();
  const handleChange = (values) => {
    dispatch(setActiveGroup(values[0]));
    let GroupID = values[0].id;
    dispatch(getItems(UID, GroupID));

    setActiveGroupName(values[0].name);
  };

  useEffect(() => {
    async function updateGroup() {
      if (CurrentGroup.id) {
        dispatch(getItems(UID, CurrentGroup.id));
      }
      if (CurrentGroup.groupname) {
        setActiveGroupName(CurrentGroup.groupname);
      }
    }
    updateGroup();
  }, []);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <div
          className="ActiveGroupHeader"
          style={{
            visibility: showAddModal || showEditModal ? "hidden" : "visible",
          }}
        >
          {groups && groups.length !== 0 && (
            <div style={{ position: "absolute", left: "50%", display: "flex" }}>
              <div style={{ position: "relative", left: "-50%" }}>
                <Select
                  options={groups}
                  onChange={(values) => handleChange(values)}
                  labelField="groupname"
                  valueField="id"
                  placeholder={`${activeGroupName} `}
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
