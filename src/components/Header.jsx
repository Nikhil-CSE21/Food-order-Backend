import Button from "./UI/Button";
import Contenxt from "../store/CartContent";
import Progress_Context from "../store/UserProgressContenct";

export default function Header() {
  const CasrtCtx = Contenxt();
  const ProgressCtx = Progress_Context();

  function handleshowCart() {
    ProgressCtx.showcart();
  }

  const totalCaritems = CasrtCtx.items.reduce(
    (totalitems, item) => totalitems + item.quantity,
    0
  );
  return (
    <header id="main-header">
      <div id="title">
        <img src="" alt="" />
        <h1>ReachFood</h1>
      </div>
      <nav>
        <Button onClick={handleshowCart} textOnly={true}>
          Cart (0) {totalCaritems}{" "}
        </Button>
      </nav>
    </header>
  );
}
