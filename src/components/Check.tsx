import { IconCheck } from "@tabler/icons-react";

// 22 is just over the check mark's path length, so one dash covers it all.
export default function Check({
  leaving,
  onLeft,
}: Readonly<{ leaving: boolean; onLeft: () => void }>) {
  return (
    <IconCheck
      aria-hidden="true"
      className={`ml-1.25 [&_path]:[stroke-dasharray:22] ${
        leaving
          ? "[&_path]:animate-[draw-out_400ms_cubic-bezier(0.65,0,0.35,1)_forwards]"
          : "[&_path]:animate-[draw-in_400ms_cubic-bezier(0.65,0,0.35,1)_backwards]"
      }`}
      onAnimationEnd={leaving ? onLeft : undefined}
    />
  );
}
