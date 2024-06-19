import Modal from "./UI/Modal";
import Contenxt from "../store/CartContent";
import { currencyFormater } from "../util/formatting";
import Progress_Context from "../store/UserProgressContenct";
import Button from "./UI/Button";

import Https from "../hooks/useHttps";

import Input from "./UI/Input";

import Error from "./Error";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
export default function Checkout() {
  const CasrtCtx = Contenxt();
  const ProgressCtx = Progress_Context();
  const CartTotal = CasrtCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0
  );

  function handleClose() {
    ProgressCtx.hidecheckout();
  }

  const url = "http://localhost:3001/orders";
  const { error, isLoading, Data, sendRequest, clear_Data } = Https(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    console.log(fd, "fd");
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: CasrtCtx.items,
          customer: customerData,
        },
      })
    );

    // fetch("http://localhost:3001/orders", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     order: {
    //       items: CasrtCtx.items,
    //       customer: customerData,
    //     },
    //   }),
    // });
  }

  function handlefinish() {
    ProgressCtx.hidecheckout();
    CasrtCtx.clearcart();
    clear_Data();
  }

  let actions = (
    <>
      <Button textOnly type="Button" onClick={handleClose}>
        Close
      </Button>
      <Button textOnly type="submit">
        Submit Order
      </Button>
    </>
  );

  if (isLoading) {
    actions = <span>Sending Data .... </span>;
  }

  if (Data && !error) {
    return (
      <Modal open={ProgressCtx.progress == "checkout"} onClose={handlefinish}>
        <h2>Success</h2>
        <p>Your order was submitted successfully. !!!</p>
        <p className="modal-actions">
          <button onClick={handlefinish}>Okay</button>
        </p>
      </Modal>
    );
  }
  return (
    <>
      <Modal open={ProgressCtx.progress == "checkout"}>
        <form onSubmit={handleSubmit}>
          <h2>Checkout</h2>
          <p>Total Amount: {currencyFormater.format(CartTotal)}</p>
          <Input label="name" id="name" type="text" name="name"></Input>
          <Input label="email" id="email" type="email" name="email"></Input>
          <Input label="Street" id="Street" type="text" name="street"></Input>
          <div>
            <Input
              label="Postal Code"
              id="Postal-Code"
              type="text"
              name="postal-code"
            ></Input>
            <Input label="City" type="text" id="city" name="city"></Input>
          </div>
          {error && (
            <Error title="failed to submit order" message={error.message} />
          )}
          <p className="modal-actions">{actions}</p>
        </form>
      </Modal>
    </>
  );
}
