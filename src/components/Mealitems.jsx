import { currencyFormater } from "../util/formatting";
import Button from "./UI/Button";

import Contenxt from "../store/CartContent";
export default function Mealitems({ meal }) {
  const CasrtCtx = Contenxt();

  function handleMealtoCart() {
    CasrtCtx.addItem(meal);
  }

  return (
    <>
      <li className="meal-item">
        <article>
          <img src={`http://localhost:3001/${meal.image}`} alt="" />
          <div>
            <h3>{meal.name}</h3>
            <p className="meal-item-price">
              {currencyFormater.format(meal.price)}
            </p>
            <p className="meal-item-description">{meal.description}</p>
          </div>
          <p className="meal-item-actions">
            <Button onClick={handleMealtoCart}>Add to cart</Button>
          </p>
        </article>
      </li>
    </>
  );
}
