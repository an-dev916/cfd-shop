import React from "react";
import Select from "../../components/Select";
import { SORT_OPTIONS } from "../../constants/sortOptions";

const ToolsBox = ({ onSortChange, total, limit, activeSort }) => {
  const options = Object.keys(SORT_OPTIONS);

  const onSortFilter = (ev) => {
    const newObject = SORT_OPTIONS[ev.target.value].queryObject;
    onSortChange(newObject);
  };
  return (
    <div className="toolbox">
      <div className="toolbox-left">
        <div className="toolbox-info">
          {" "}
          Showing{" "}
          <span>
            {limit} of {total}
          </span>{" "}
          Products{" "}
        </div>
      </div>
      <div className="toolbox-right">
        <div className="toolbox-sort">
          <label htmlFor="sortby">Sort by:</label>
          <div className="select-custom">
            <select
              name="sortby"
              id="sortby"
              className="form-control"
              onChange={onSortFilter}
            >
              {options?.length > 0 &&
                options?.map((option, index) => {
                  return (
                    <option
                      value={SORT_OPTIONS[option]?.value}
                      key={option || index}
                      selected={activeSort === option}
                    >
                      {SORT_OPTIONS[option]?.label}
                    </option>
                  );
                })}
            </select>

            {/* <select name="sortby" id="sortby" className="form-control">
              <option value="popularity" selected>
                Most Popular
              </option>
              <option value="pricelow">Price Low to High</option>
              <option value="pricehight">Price Hight to Low </option>
              <option value="newest">Newest</option>
              <option value="rating">Most Rated</option>
            </select> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsBox;
