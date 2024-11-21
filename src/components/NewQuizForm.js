import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ROUTES from "../app/routes";
// import selectors
import { selectTopics } from "../features/topics/topicsSlice";
import { addQuiz } from "../features/quizzes/quizzesSlice";
import { addCard } from "../features/cards/cardsSlice";

export default function NewQuizForm() {
  const [name, setName] = useState("");
  const [cards, setCards] = useState([]);
  const [topicId, setTopicId] = useState("");
  const navigate = useNavigate();
  const topics = useSelector(selectTopics);  // Replace with topics
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      return;
    }

    const cardIds = [];

    // create the new cards here and add each card's id to cardIds
    // create the new quiz here
    cards.forEach((card) => {
      let cardId = uuidv4();
      cardIds.push(cardId);
      console.log("Dispatching addCard:", { id: cardId, front: card.front, back: card.back });
      dispatch(addCard({ id: cardId, front: card.front, back: card.back }));
    });

    const quizId = uuidv4();

    console.log("topicId:", topicId);

    // dispatch add quiz action
    console.log("Dispatching addQuiz:", { id: quizId, title: name, topicId, cardIds });
    dispatch(
      addQuiz({
        id: quizId,
        title: name,
        topicId,
        cardIds,
      })
    );

    // navigate to the quiz page
    // use the navigate function from react-router-dom to navigate to the quiz page
    // replace the quizId with the id of the newly created quiz
    // e.g. navigate(`/quizzes/${quizId}`)
    // or navigate(ROUTES.quizRoute(quizId))

    // clear form state
    setName("");
    setCards([]);
    setTopicId("");

    // navigate back to the quizzes page
    // use the navigate function from react-router-dom to navigate back to the quizzes page
    // e.g. navigate(ROUTES.quizzesRoute())
    // or navigate(ROUTES.quizzesRoute())

    // you can also use the replace method to replace the current page in the browser history

    navigate(ROUTES.quizzesRoute())
  };

  const addCardInputs = (e) => {
    e.preventDefault();
    setCards(cards.concat({ front: "", back: "" }));
  };

  const removeCard = (e, index) => {
    e.preventDefault();
    setCards(cards.filter((card, i) => index !== i));
  };

  const updateCardState = (index, side, value) => {
    const newCards = cards.slice();
    newCards[index][side] = value;
    setCards(newCards);
  };

  return (
    <section>
      <h1>Create a new quiz</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="quiz-name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Quiz Title"
        />
        <select
          id="quiz-topic"
          onChange={(e) => setTopicId(e.currentTarget.value)}
          placeholder="Topic"
        >
          <option value="">Topic</option>
          {Object.values(topics).map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))}
        </select>
        {cards.map((card, index) => (
          <div key={index} className="card-front-back">
            <input
              id={`card-front-${index}`}
              value={cards[index].front}
              onChange={(e) =>
                updateCardState(index, "front", e.currentTarget.value)
              }
              placeholder="Front"
            />

            <input
              id={`card-back-${index}`}
              value={cards[index].back}
              onChange={(e) =>
                updateCardState(index, "back", e.currentTarget.value)
              }
              placeholder="Back"
            />

            <button
              onClick={(e) => removeCard(e, index)}
              className="remove-card-button"
            >
              Remove Card
            </button>
          </div>
        ))}
        <div className="actions-container">
          <button onClick={addCardInputs}>Add a Card</button>
          <button type="submit">Create Quiz</button>
        </div>
      </form>
    </section>
  );
}
