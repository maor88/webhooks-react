import React from "react";
import { CardItem } from "../../atoms/card/Card";
import { CardsContainer } from "./styles";

export interface CardsItems extends Array<CardItem> {}

const Cards: React.FC = (props) => {
  return <CardsContainer></CardsContainer>;
};

export default Cards;
