import React, { useEffect, useState } from "react";
import "../styles/PageStyles/UserPage.css";
import { useDispatch } from "react-redux";
import NavBar from "../components/Navigation/NavBar";
import { RegistryList } from "../components/Items/RegistryList";
import { getItems } from "../actions/itemActions";
import { getUser } from "../actions/userActions";
import { getGroup } from "../actions/groupActions";
import { FilterOtherUsers } from "../components/Filters/FilterOtherUsers";
/**
 *
 * @Page User Group Page
 * @Description Item page for a user in a specified group,
 * @route /groups/:GID/users/:UID
 *
 */
export const UserGroupPage = (props) => {
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState("DefaultProfileImage");
  const dispatch = useDispatch();
  const UID = props.match.params.id;
  const GID = props.match.params.gid;
  useEffect(() => {
    async function getData() {
      let userInfo = await dispatch(getUser(UID));
      setUserName(userInfo[0].name);
      setImage(userInfo[0].profileimage);
      await dispatch(getGroup(GID));
      await dispatch(getItems(UID, GID));
    }
    getData();
  }, []);

  return (
    <>
      <div className="UserPageContainer">
        <NavBar title="User Page" />
        <div className="UserPageBody">
          <FilterOtherUsers />
          <div className="registryContainer">
            <RegistryList />
          </div>
        </div>
      </div>
    </>
  );
};
