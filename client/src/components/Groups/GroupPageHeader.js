import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../../styles/PageStyles/GroupPage.css";
/**
 *
 * @PageLocation GroupPage
 * @Component GroupPageHeader
 * @Description Component display for group title, and memberlist
 *
 *
 */
export const GroupPageHeader = (props) => {
  const [showMembers, setShowMembers] = useState(false);
  const PageInfo = useSelector((state) => state.group.pageGroup);
  return (
    <div className="UserPageHeader">
      <div className="UserInfo">
        {PageInfo.name && <div className="UserInfoName">{PageInfo.name}</div>}

        <div className="Avatars">
          {PageInfo.members &&
            PageInfo.members.length <= 3 &&
            PageInfo.members.map((member, index) => (
              <>
                <span className="Avatar" key={index}>
                  <a
                    onClick={() => {
                      window.location.href = `/groups/${props.GID}/users/${member.id}`;
                    }}
                  >
                    <img
                      height="65px"
                      width="70px"
                      src={`/api/images/${member.profileimage}`}
                      alt="User Avatar"
                      title={member.name}
                    ></img>
                  </a>
                </span>
              </>
            ))}
          {PageInfo.members &&
            PageInfo.members.length > 3 &&
            PageInfo.members.map((member, index) => {
              if (index > PageInfo.members.length - 4) {
                return (
                  <>
                    <span className="Avatar" key={index}>
                      <a
                        onClick={() => {
                          window.location.href = `/groups/${props.GID}/users/${member.id}`;
                        }}
                      >
                        <img
                          className="AvatarImage"
                          height="65px"
                          width="70px"
                          title={member.name}
                          src={`/api/images/${member.profileimage}`}
                        ></img>
                      </a>
                    </span>
                  </>
                );
              } else if (index === 0) {
                return (
                  <>
                    <span
                      className="Avatar"
                      id="ExtraMembers"
                      onClick={() => setShowMembers(!showMembers)}
                      key={index}
                      title="More Users"
                    >
                      <div className="ExtraLabel">
                        {PageInfo.members.length - 3}
                      </div>
                    </span>
                  </>
                );
              }
            })}
          {PageInfo.members && PageInfo.members.length === 1 && (
            <div className="SingleMemberCount">1 member</div>
          )}

          {PageInfo.members && PageInfo.members.length > 1 && (
            <div className="MultiMemberCount">
              {PageInfo.members.length} members
            </div>
          )}

          <div
            className="MemberList"
            style={{ display: showMembers ? "block" : "none" }}
          >
            <hr />
            {PageInfo.members &&
              PageInfo.members.map((member, index) => (
                <a
                  onClick={() => {
                    window.location.href = `/groups/${props.GID}/users/${member.id}`;
                  }}
                >
                  <div className="UserMemberContainer" key={index}>
                    <div style={{ flex: 1 }}>
                      <img
                        className="AvatarImage"
                        height="25px"
                        width="30px"
                        title={member.name}
                        style={{ borderRadius: "50%" }}
                        src={`/api/images/${member.profileimage}`}
                      ></img>
                    </div>
                    <div style={{ flex: 5 }}>{member.name}</div>
                  </div>
                </a>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
