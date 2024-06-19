import { currencyFormater } from "../util/formatting";

export default function Cartitems({
  name,
  quantity,
  price,
  onIncrease,
  onDencrease,
}) {
  return (
    <>
      <li className="cart-item">
        <p>
          {name} - {quantity}*{currencyFormater.format(price)}
        </p>
        <p className="cart-item-actions">
          <button onClick={onIncrease}>+</button>
          <span>{quantity}</span>
          <button onClick={onDencrease}>-</button>
        </p>
      </li>
    </>
  );
}
