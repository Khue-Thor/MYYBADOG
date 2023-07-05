"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast";
import { useToast } from "./use-toast";
import Logo from "@/public/images/bdco-skull-white-28x40.svg";
import Image from "next/image";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && (
                <ToastTitle>
                  <div className="z-20">{title}</div>{" "}
                  <div>
                    <Image
                      src={Logo}
                      height={60}
                      width={60}
                      alt="Bad Dogs Company | NFT Marketplace"
                      className="absolute z-0 opacity-30"
                      style={{ top: "-8px", right: "-4px" }}
                    />
                  </div>
                </ToastTitle>
              )}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
