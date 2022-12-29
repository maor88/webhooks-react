import "./App.css";
import { useRef, useEffect, useState, useCallback } from "react";
import Card, { CardItem } from "./components/atoms/card/Card";
import { CardsItems } from "./components/molecules/cards/Cards";
import { AppContainer } from "./style";
import Select from "./components/atoms/card/select/Select";

function App() {
  const [isPaused, setPause] = useState<boolean>(false);
  // const [groupBy, setGroupBy] = useState<string>("All");
  const [cards, setCards] = useState<CardsItems>([]);
  const [filteredCards, setFilteredCards] = useState<CardsItems>([]);

  const ws = useRef<any>(null);

  useEffect(() => {
    ws.current = new WebSocket(
      "wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self"
    );
    ws.current.onopen = () => console.log("ws opened");
    ws.current.onclose = () => console.log("ws closed");

    const wsCurrent = ws.current;
    return () => {
      wsCurrent.close();
      console.log("closeddd");
    };
  }, []);
  useEffect(() => {
    if (!ws.current) return;
    ws.current.onmessage = (e: MessageEvent) => {
      if (isPaused) return;
      const message = e.data;
      setCards([
        ...cards,
        {
          title: "new card",
          description: message + Math.floor(Math.random() * 10),
        },
      ]);
      setFilteredCards(cards);
    };
  }, [isPaused, cards]);

  const handleGrouping = useCallback(
    (groupName: string) => {
      if (groupName === "All") {
        setFilteredCards(cards);
      } else {
        const res = cards.filter((card) =>
          card.description.includes(groupName)
        );
        console.log("groupBy", groupName);
        setFilteredCards(res);
      }
    },
    [cards]
  );

  const onSelectGroup = (groupName: string) => {
    handleGrouping(groupName);
  };

  return (
    <div>
      <button onClick={() => setPause(!isPaused)}>
        {isPaused ? "Resume" : "Pause"}
      </button>
      <Select onSelect={onSelectGroup} />
      <AppContainer>
        {filteredCards.map((card: CardItem, index) => (
          <Card title={card.title} description={card.description} key={index} />
        ))}
      </AppContainer>
    </div>
  );
}

export default App;
