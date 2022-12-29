import React from "react";
import { CardContainer, CardContent } from "./styles";

export interface CardItem {
  title: string;
  description: string;
  date?: string;
}

const Card: React.FC<CardItem> = (props) => {
  return (
    <CardContainer>
      <CardContent>
        <div>{props.title}</div>
        <div>{props.description}</div>
        <div>{props.date}</div>
      </CardContent>
    </CardContainer>
  );
};
export default Card;
