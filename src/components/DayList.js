import React, { useLayoutEffect } from "react";
import { action } from "@storybook/addon-actions/dist/preview";
import { render } from "@testing-library/react";
import DayListItem from "./DayListItem";

export default function Daylist(props) {
  const days = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        setDay={props.setDay}
        selected={day.name === props.day}
      ></DayListItem>
    );
  });
  return <ul>{days}</ul>;
}
