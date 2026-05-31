import { useCallback } from "react";
import { useAuth } from "../context/AuthContext";

/**
 * useProtectedAction – wraps any action behind auth.
 * If user is logged in → runs the action.
 * If not → opens signup modal (signup FIRST, then login).
 *
 * Usage:
 *   const protect = useProtectedAction(openSignup)
 *   <button onClick={protect(() => addFavorite(match))}>❤️</button>
 */
const useProtectedAction = (openSignup) => {
  const { user } = useAuth();

  const protect = useCallback(
    (action) =>
      (...args) => {
        if (user) {
          action(...args);
        } else {
          openSignup(); // show signup first
        }
      },
    [user, openSignup],
  );

  return protect;
};

export default useProtectedAction;
