import { useReducer } from "react";
import { useContext } from "react";
import { createContext } from "react";

const CartContext = createContext();

const initialState = {
  cart: [
    {
      image: {
        thumbnail: "../images/image-tiramisu-thumbnail.jpg",
        mobile: "../images/image-tiramisu-mobile.jpg",
        tablet: "../images/image-tiramisu-tablet.jpg",
        desktop: "../images/image-tiramisu-desktop.jpg",
      },
      name: "Classic Tiramisu",
      category: "Tiramisu",
      price: 5.5,
      id: "6fb8",
      count: 1,
    },
    {
      image: {
        thumbnail: "../images/image-creme-brulee-thumbnail.jpg",
        mobile: "../images/image-creme-brulee-mobile.jpg",
        tablet: "../images/image-creme-brulee-tablet.jpg",
        desktop: "../images/image-creme-brulee-desktop.jpg",
      },
      name: "Vanilla Bean Crème Brûlée",
      category: "Crème Brûlée",
      price: 7,
      id: "2288",
      count: 4,
    },
    {
      image: {
        thumbnail: "../images/image-panna-cotta-thumbnail.jpg",
        mobile: "../images/image-panna-cotta-mobile.jpg",
        tablet: "../images/image-panna-cotta-tablet.jpg",
        desktop: "../images/image-panna-cotta-desktop.jpg",
      },
      name: "Vanilla Panna Cotta",
      category: "Panna Cotta",
      price: 6.5,
      id: "ae6a",
      count: 2,
    },
  ],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "addDessert": {
      const existingCartItemIndex = state.cart.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      const existingCartItem = state.cart[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          count: existingCartItem.count + 1,
        };
        const updatedItems = [...state.cart];
        updatedItems[existingCartItemIndex] = updatedItem;
        return { ...state, cart: updatedItems };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, count: 1 }],
        };
      }
    }
    case "deleteDessert":
      return {
        ...state,
        cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
      };
    default:
      throw new Error("Action not recognised");
  }
};

function CartProvider({ children }) {
  const [{ cart }, dispatch] = useReducer(reducer, initialState);

  const handleAddDessertToCart = (dessert) => {
    dispatch({ type: "addDessert", payload: dessert });
  };

  const handleDeleteDessertFromCart = (id) => {
    dispatch({ type: "deleteDessert", payload: id });
  };

  return (
    <CartContext.Provider
      value={{ cart, handleAddDessertToCart, handleDeleteDessertFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  if (context === undefined)
    throw new Error("CartContext was used outside of CartProvider");
  return context;
}

export { CartProvider, useCart };
