import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Manually set total items
    setTotalItems(state, action) {
      state.totalItems = action.payload;
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
    },

    // Add course to cart
    addToCart(state, action) {
      const payload = action.payload;

      // Handle both { _id, courseName, price, thumbnail } and { courseId }
      const courseId = payload._id || payload.courseId;
      const course = {
        _id: courseId,
        courseName: payload.courseName || "",
        price: payload.price || 0,
        thumbnail: payload.thumbnail || "",
      };

      const exists = state.cart.some((item) => item._id === courseId);

      if (!exists) {
        state.cart.push(course);
        state.totalItems += 1;
        toast.success("Course added to cart");
      } else {
        toast.error("Course already in cart");
      }

      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
    },

    // Remove course from cart
    removeFromCart(state, action) {
      const courseId = action.payload;
      const updatedCart = state.cart.filter((item) => item._id !== courseId);

      if (updatedCart.length !== state.cart.length) {
        state.cart = updatedCart;
        state.totalItems -= 1;
        toast.success("Course removed from cart");
        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
      } else {
        toast.error("Course not found in cart");
      }
    },

    // Reset entire cart
    resetCart(state) {
      state.cart = [];
      state.totalItems = 0;
      localStorage.removeItem("cart");
      localStorage.removeItem("totalItems");
    },
  },
});

export const {
  setTotalItems,
  addToCart,
  removeFromCart,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
