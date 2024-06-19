import Modal from "./UI/Modal";
import Contenxt from "../store/CartContent";
import { currencyFormater } from "../util/formatting";
import Button from "./UI/Button";
import Progress_Context from "../store/UserProgressContenct";
import Cartitems from "./Cartitems";

export default function Cart() {
  const CasrtCtx = Contenxt();
  const ProgressCtx = Progress_Context();

  const CartTotal = CasrtCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0
  );

  function handleCloseCart() {
    ProgressCtx.hidecart();
  }

  function handleGoToCheckout() {
    ProgressCtx.showcheckout();
    console.log("Show Checkout");
  }

  return (
    <>
      <Modal
        className="cart"
        open={ProgressCtx.progress == "cart"}
        onClose={ProgressCtx.progress == "cart" ? handleCloseCart : null}
      >
        <h2>Your Cart</h2>

        <ul>
          {CasrtCtx.items.map((item) => (
            <Cartitems
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              onIncrease={() => {
                CasrtCtx.addItem(item);
              }}
              onDencrease={() => {
                CasrtCtx.removeItem(item.id);
              }}
            />
          ))}
        </ul>
        <p className="total">{currencyFormater.format(CartTotal)}</p>
        <p className="modal-actions">
          <Button textOnly onClick={handleCloseCart}>
            Close
          </Button>

          {CasrtCtx.items.length && (
            <Button textOnly onClick={handleGoToCheckout}>
              Go to Checkout
            </Button>
          )}
        </p>
      </Modal>
    </>
  );
}
