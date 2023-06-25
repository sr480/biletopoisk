"use client"

import { useSelector } from "react-redux";
import { selectCartTotal } from "../store/features/cart/selector";
import { RootState } from "../store/store";
import { AppCard } from "../components/AppCard/AppCard";

export const CartTotal = () => {
  const total = useSelector((state: RootState) => selectCartTotal(state));

  return <AppCard
    header={() => <h3>Итого билетов:</h3>}
    subHeader={() => <h3>{total}</h3>}
  >
  </AppCard>
}