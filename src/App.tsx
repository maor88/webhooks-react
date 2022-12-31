import { useRef, useEffect, useState, useCallback } from "react";
import Card, { CardItem } from "./components/atoms/card/Card";
import { CardsItems } from "./components/molecules/cards/Cards";
import { AppContainer } from "./style";
import Select from "./components/atoms/card/select/Select";
import { uuidv4 } from "./helpers/generator";
import useWebsocket from "./hooks/useWebsocket";

function App() {
  const [isPaused, setPause] = useState<boolean>(false);
  const [cards, setCards] = useState<CardsItems>([]);
  const [groupKey, setGroupKey] = useState<string>('All');
  const [filteredCards, setFilteredCards] = useState<CardsItems>(cards);

  const ws = useWebsocket() //Custom hook for websocket 

  useEffect(() => {
    if (!ws.current) return;
    ws.current.onmessage = (e: MessageEvent) => {
      if (isPaused) return;
      const message = e.data;
      setCards([
        ...cards,
        {
          title: message,
          id: uuidv4(),
          date: Date.now(),
        },
      ]);
    };
    handleGrouping();
  }, [isPaused, cards]);

  useEffect(()=> {
    handleGrouping()
  },[groupKey])

  const handleGrouping = useCallback(() => {
      debugger
      if (groupKey === "All") {
        setFilteredCards(cards);
      } else {
        const res = cards.filter((card) => card.title.includes(groupKey));
        setFilteredCards(res);
      }
    },
    [cards, groupKey]
  );

  const onSelectGroup = (groupName: string) => {
    setGroupKey(groupName);
  };

  return (
    <div>
      <button onClick={() => setPause(!isPaused)}>
        {isPaused ? "Resume" : "Pause"}
      </button>
      <Select onSelect={onSelectGroup} />
      <AppContainer>
        {filteredCards?.map((card: CardItem) => (
          <Card title={card.title} id={card.id} date={card.date} key={card.id} />
        ))}
      </AppContainer>
    </div>
  );
}

export default App;
