/**
 *
 * @PageLocation Owned User Group/Event Page
 * @Component FilterColumn
 * @Description Displays information about current group and registry list. Allows for filtering of items.
 *
 */

import React, { useState, useEffect } from "react";
import "../../styles/FilterStyles/FilterColumn.css";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-dropdown-select";
import CurrencyInput from "../Items/CurrencyInput";
import { clearFilterItems, filterItems } from "../../actions/itemActions";
import { setFilterItem } from "../../actions/itemActions";
import { Link } from "react-router-dom";

const ModeList = {
  0: "Secret Santa",
  1: "Event",
  2: "Other",
};
export const FilterColumn = () => {
  const GroupData = useSelector((state) => state.group.pageGroup);
  const Items = useSelector((state) => state.item.memberItems);
  const UID = useSelector((state) => state.auth.user.id);
  const [lessFilter, SetLessFilter] = useState(0.0);
  const [moreFilter, SetMoreFilter] = useState(0.0);
  const [lessBtn, setLessBtn] = useState(false);
  const [moreBtn, setMoreBtn] = useState(false);
  const [searchFilterItem, setSearchFilterItem] = useState([]);
  const [avgPrice, SetAvgPrice] = useState(0);
  const dispatch = useDispatch();

  const handleFilterItems = () => {
    //Pass the filtered values as params only if the corresponding button is checked.
    //Otherwise send a null value.

    let FilterParams = {
      LowerThan: lessBtn ? lessFilter : null,
      MoreThan: moreBtn ? moreFilter : null,
    };

    dispatch(filterItems(FilterParams));
  };

  const handleFilterSearch = (values) => {
    setSearchFilterItem(values);
    if (values.length !== 0) {
      dispatch(setFilterItem(values[0]));
    }
  };

  const handleSearchClear = () => {
    dispatch(clearFilterItems());
    setSearchFilterItem([]);
  };

  useEffect(() => {
    let total = 0;
    if (Items) {
      for (let i = 0; i < Items.length; i++) {
        total += Number(Items[i].price.substring(1).replace(/,/g, ""));
      }
      SetAvgPrice((total / Items.length).toFixed(2));
    }
  }, [Items]);

  return (
    <>
      <div className="FilterColumnBackground">
        <div className="FilterColContainer">
          <div className="GroupInfo">
            {Items && (
              <>
                <p>Group Type: {ModeList[GroupData.grouptype]}</p>
              </>
            )}
            {GroupData.grouptype === 0 && (
              <>
                Assigned Member:
                <Link
                  to={`/groups/${GroupData.groupid}/users/${GroupData.partnerid}`}
                >
                  {GroupData.partner && <>{GroupData.partner}</>}
                </Link>
                {!GroupData.partner && <> None</>}
              </>
            )}
          </div>
          <hr />
          <div className="FilterColItems">
            <div className="FilterItemCount">
              {Items && Items.length !== 0 && (
                <>
                  <div className="ItemInfoContainer">
                    <div className="ItemInfoNumber">{Items.length}</div>
                    <div className="ItemInfoLabel">Total Wishlist Items</div>
                  </div>
                  <div className="ItemInfoContainer">
                    <div className="ItemInfoNumber">${avgPrice}</div>
                    <div className="ItemInfoLabel">Average Item Price</div>
                  </div>
                </>
              )}
              {(!Items || Items.length == 0) && (
                <>
                  <div className="ItemInfoContainer">
                    <div className="ItemInfoNumber">0</div>
                    <div className="ItemInfoLabel">Total Wishlist Items</div>
                  </div>
                  <div className="ItemInfoContainer">
                    <div className="ItemInfoNumber">0</div>
                    <div className="ItemInfoLabel">Average Item Price</div>
                  </div>
                </>
              )}
            </div>
          </div>
          <hr />
          {Items && Items.length !== 0 && (
            <>
              <div className="FilterSearch">
                <div>Search for an item</div>
                <Select
                  options={Items}
                  values={searchFilterItem}
                  labelField="name"
                  valueField="itemid"
                  placeholder={`Hehe`}
                  style={{
                    width: 200,
                    margin: "auto",
                    textAlign: "center",
                    backgroundColor: "white",
                  }}
                  searchBy="name"
                  onChange={(values) => handleFilterSearch(values)}
                  dropdownHeight="200px"
                  dropdownGap={-5}
                />
                <div style={{ marginTop: "0.5rem" }}>
                  <button
                    className="ClearFilterBtn"
                    onClick={() => handleSearchClear()}
                  >
                    CLEAR
                  </button>
                </div>
              </div>

              <div className="FilterButtons">
                Filter Items By Price
                <div className="FilterBtnItem">
                  <input
                    className="FilterBtn"
                    type="checkbox"
                    checked={lessBtn}
                    onChange={() => setLessBtn(!lessBtn)}
                  ></input>
                  <div className="FilterBtnLabel">{`Less than `}</div>
                  <CurrencyInput
                    className="FilterPriceInput"
                    placeholder="0.00"
                    onChange={(e) => SetLessFilter(e.target.value)}
                  />
                </div>
                <div className="FilterBtnItem">
                  <input
                    className="FilterBtn"
                    type="checkbox"
                    checked={moreBtn}
                    onChange={() => setMoreBtn(!moreBtn)}
                  ></input>
                  <div className="FilterBtnLabel">{`More than `}</div>
                  <CurrencyInput
                    className="FilterPriceInput"
                    placeholder="0.00"
                    onChange={(e) => SetMoreFilter(e.target.value)}
                  />
                </div>
                <button
                  className="FilterPriceBtn"
                  onClick={() => handleFilterItems()}
                >
                  Filter Items
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
