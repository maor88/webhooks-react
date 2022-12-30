import React from "react";
import { CardContainer, CardContent } from "./styles";

export interface CardItem {
  title: string;
  id: string;
  date: number;
}

const Card: React.FC<CardItem> = (props) => {
  return (
    <CardContainer>
      <CardContent>
        <div>{props.title}</div>
        <div>{props.id}</div>
        <div>{props.date}</div>
      </CardContent>
    </CardContainer>
  );
};
export default Card;
