"use client";

import { Button } from "@/components/base";
import { Wrapper } from "@/components/layout";
import { setShowCart } from "@/store/slices/cartSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { CartItem } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

const CartMenu = () => {
  const router = useRouter();
  const ref = useRef(null);
  const { items, showCart } = useAppSelector((store: RootState) => store.cart);
  const dispatch = useAppDispatch();
  const handleClickOutside = () => dispatch(setShowCart(false));
  useOnClickOutside(ref, handleClickOutside);

  const total = items.reduce(
    (t: number, i: any) => (t += i.price * i.quantity),
    0
  );
  const handleCartClick = () => {
    dispatch(setShowCart(false));
    router.push("cart");
  };
  if (!showCart) {
    return null;
  }
  return (
    <div className="w-[280px]  xs:w-[355px]  max-h-[550px] bg-slate-100 border p-4 absolute z-50 right-0 top-[63px]  overflow-y-scroll">
      <div
        className="w-full  mt-2 flex items-center justify-between "
        ref={ref}
      >
        <p className="text-md font-light text-slate-500">{total} TL</p>
        <Button text="SEPETE GIT" variant="primary" onClick={handleCartClick} />
      </div>
      <hr className="h-px my-4 bg-gray-200  dark:bg-slate-300"></hr>
      <div className="flex flex-col justify-center gap-6  ">
        {items?.map((i: CartItem) => (
          <div className="flex justify-between items-center gap-4" key={i.id}>
            <div className="flex items-center gap-2">
              <Image src={i.image} width={30} height={30} alt={i.title} />
              <p className="text-xs text-slate-500">
                {i.title} ({i.quantity})
              </p>
            </div>
            <p className="text-xs text-slate-500">{i.price * i.quantity}TL</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartMenu;