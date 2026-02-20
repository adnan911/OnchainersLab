import { EtheralShadow } from "@/components/ui/etheral-shadow";

export default function DemoPage() {
  return (
    <div className="flex w-full h-screen justify-center items-center relative overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <EtheralShadow
          color="rgba(128, 128, 128, 1)"
          animation={{ scale: 100, speed: 90 }}
          noise={{ opacity: 1, scale: 1.2 }}
          sizing="fill"
        />
      </div>
      <div className="z-10 text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
          Etheral Shadow Demo
        </h1>
        <p className="text-zinc-400">Background effect integrated successfully.</p>
      </div>
    </div>
  );
}
