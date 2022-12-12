import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  let buttonClass = classNames("day-list__item", {
    "day-list__item--selected" : props.selected,
    "day-list__item--full" : !props.spots});
    console.log(buttonClass);
  return (
    <li data-testid="day" className={buttonClass} onClick={()=>props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots === 0 ? "no" : props.spots} {props.spots === 1 ? "spot" : "spots"} remaining</h3>
    </li>
  );
}