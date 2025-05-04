import React from "react";
import { Button } from "@/core/components/ui/button";
import { X } from "lucide-react";
import { useContext } from "react";
import { ModalStatusContext } from "../login";

interface ModalForgotPasswordProps {
  children: React.ReactNode;
  active: boolean;
}

export function ModalForgotPassword({ children, active }: ModalForgotPasswordProps) {
  const { setIsModalForgotPasswordActive } = useContext(ModalStatusContext)!;
  if (!active) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-5">
        <div className="flex justify-end">
          <Button
            type="button"
            variant="ghost"
            className="p-0 transition-transform duration-500 hover:rotate-[360deg] [&_svg]:size-6"
            onClick={() => setIsModalForgotPasswordActive(false)}
          >
            <X />
          </Button>
        </div>
        {children}
        <Button type="button" variant="gradientVertical" className="mx-auto mt-8 mb-3 block w-[80px]">
          確認
        </Button>
      </div>
    </div>
  );
}
