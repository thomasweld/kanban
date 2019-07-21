import React from "react";

import "./App.css";

// const ls = JSON.parse(window.localStorage.getItem("state"));
let ls;
let initialState;

if (ls && ls.cards && ls.cards.length) {
  initialState = ls;
} else {
  initialState = {
    columns: [
      {
        title: "Work In Progress",
        id: 0
      },
      {
        title: "Current Sprint",
        id: 1
      },
      {
        title: "Icebox",
        id: 2
      },
      {
        title: "Done",
        id: 3
      }
    ],
    cards: [
      {
        content: "card content goes here 0",
        id: 0,
        column: 0
      },
      {
        content: "card content goes here 1",
        id: 1,
        column: 1
      },
      {
        content: "card content goes here 2",
        id: 2,
        column: 2
      },
      {
        content: "card content goes here 3",
        id: 3,
        column: 3
      },
      {
        content: "card content goes here 0",
        id: 4,
        column: 0
      },
      {
        content: "card content goes here 1",
        id: 5,
        column: 1
      },
      {
        content: "card content goes here 2",
        id: 6,
        column: 2
      },
      {
        content: "card content goes here 3",
        id: 7,
        column: 3
      }
    ]
  };
}

function reducer(state, action) {
  switch (action.type) {
    case "addCard":
      if (action.content) {
        return {
          ...state,
          cards: [
            ...state.cards,
            {
              content: action.content,
              id: state.cards.length,
              column: action.column
            }
          ]
        };
      } else {
        return {
          ...state
        };
      }
    case "moveCardButton":
      const cardToMove = state.cards.find(card => action.cardId === card.id);
      const i = state.cards.indexOf(card => action.cardId === card.id);
      const newCardsArray = [...state.cards];
      cardToMove.column = action.column + action.move;
      newCardsArray[i] = cardToMove;
      return {
        ...state,
        cards: newCardsArray
      };
    case "deleteButton":
      const filteredArray = state.cards.filter(
        card => action.cardId !== card.id
      );
      return {
        ...state,
        cards: filteredArray
      };
    default:
      throw new Error();
  }
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  React.useEffect(
    () => {
      window.localStorage.setItem("state", JSON.stringify(state));
    },
    [state]
  );
  return (
    <div className="App">
      {state.columns &&
        state.columns.map(column => (
          <div
            key={column.id}
            className={`column column-${column.id}`}
            id="column.id"
          >
            <div className={`title title-${column.id}`}>{column.title}</div>
            {state.cards
              .filter(card => card.column === column.id)
              .map(card => (
                <div className="cardWrapper" key={card.id}>
                  <div className="card">
                    {column.id !== 0 ? (
                      <button
                        type="button"
                        className="leftButton"
                        onClick={() => {
                          dispatch({
                            type: "moveCardButton",
                            column: column.id,
                            cardId: card.id,
                            move: -1
                          });
                        }}
                      >
                        {`<`}
                      </button>
                    ) : (
                      <div className="leftButton" />
                    )}

                    <div className="cardContent">{card.content}</div>

                    {column.id !== state.columns.length - 1 ? (
                      <button
                        type="button"
                        className="rightButton"
                        onClick={() => {
                          dispatch({
                            type: "moveCardButton",
                            column: column.id,
                            cardId: card.id,
                            move: 1
                          });
                        }}
                      >
                        {`>`}
                      </button>
                    ) : (
                      <div className="leftButton" />
                    )}
                  </div>

                  <button
                    type="button"
                    className="deleteButton"
                    onClick={() => {
                      dispatch({
                        type: "deleteButton",
                        cardId: card.id
                      });
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            <button
              type="button"
              className="addButton"
              onClick={() => {
                const content = window.prompt("Enter contnent for card:");
                dispatch({
                  type: "addCard",
                  content,
                  column: column.id
                });
              }}
            >
              + Add a card
            </button>
          </div>
        ))}
    </div>
  );
}

export default App;
