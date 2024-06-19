import { useReducer } from "react";
import { useContext } from "react";
import { createContext } from "react";

const CartContext = new createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearcart: () => {},
});

function cartReducer(state, action) {
  //   console.log(action.item.id);
  if (action.type == "ADD_ITEM") {
    console.log(state.items, "state.items,");
    const existingcartItemIndex = state.items.findIndex((item) => {
      console.log(item, "item id ", action.item.id, "action.item.id");

      return item.id === action.item.id;
    });

    const UpdatedItems = [...state.items];
    console.log(existingcartItemIndex, "existingcartItemIndex");
    if (existingcartItemIndex > -1) {
      const ExistingItem = state.items[existingcartItemIndex];
      const UpdatedItem = {
        ...ExistingItem,
        quantity: ExistingItem.quantity + 1,
      };

      UpdatedItems[existingcartItemIndex] = UpdatedItem;
    } else {
      UpdatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: UpdatedItems };
  }

  if (action.type == "REMOVE_ITEM") {
    const existingcartItemIndex = state.items.findIndex(
      (item) => item.id == action.id
    );
    const ExistingItem = state.items[existingcartItemIndex];

    const UpdatedItems = [...state.items];

    if (ExistingItem.quantity == 1) {
      const index = UpdatedItems.indexOf(ExistingItem);
      if (index !== -1) {
        UpdatedItems.splice(index, 1);
      }
    } else {
      const UpdatedItem = {
        ...ExistingItem,
        quantity: ExistingItem.quantity - 1,
      };

      UpdatedItems[existingcartItemIndex] = UpdatedItem;
    }

    return { ...state, items: UpdatedItems };
  }

  if ((action.type = "CLEAR_CART")) {
    const UpdatedItems = [];
    return { ...state, items: UpdatedItems };
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }

  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }

  function clearcart() {
    dispatchCartAction({ type: "CLEAR_CART" });
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearcart,
  };

  //console.log(cart);
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default function Contenxt() {
  return useContext(CartContext);
}
