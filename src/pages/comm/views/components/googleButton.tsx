import { Icon } from "@iconify/react";
export function GoogleButton() {
  return (
    <div className="my-5">
      <button className="hover:border-secondary-foreground flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border hover:border-2">
        <Icon icon="flat-color-icons:google" width="26" height="26" />
      </button>
    </div>
  );
}
