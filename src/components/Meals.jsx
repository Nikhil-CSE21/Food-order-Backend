import { useState, useMemo } from "react";

import Mealitems from "./Mealitems";
import Https from "../hooks/useHttps";

import Error from "./Error";

export default function Meals() {
  //const [loadedMealState, setloadedMealState] = useState([]);

  // useEffect(() => {
  //   async function fetchMeals() {
  //     console.log("Api call to fetch the data/meals");
  //     let response = await fetch("http://localhost:3001/meals");

  //     if (!response.ok) {
  //       //
  //     }

  //     const Meals = await response.json();
  //     setloadedMealState(Meals);
  //   }

  //   fetchMeals();
  // }, []);

  const url = "http://localhost:3001/meals";
  const config = useMemo(() => ({ method: "GET" }), []); // Memoizing config

  const { error, isLoading, Data } = Https(url, config);

  if (isLoading) {
    console.log("Component render");

    return <p className="center">Fetching Meals ...</p>;
  }

  if (error) {
    console.log(error);
    return <Error title="Failed to fetch meals" message={error.message} />;
  }

  return (
    <>
      {Data && Data.length > 0 && (
        <ul id="meals">
          {Data.map((meal) => (
            <Mealitems key={meal.id} meal={meal} />
          ))}
        </ul>
      )}
      {/* <ul id="meals">
        {Data.map((meal) => (
          <Mealitems key={meal.id} meal={meal} />
        ))}
      </ul> */}
    </>
  );
}
