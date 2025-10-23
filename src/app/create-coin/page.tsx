"use client";
import CreateToken from "@/components/creatToken/index";

export default function Page() {

  return (
    <div className="relative flex flex-col py-8 w-full h-full min-h-[calc(100vh-250px)] object-cover overflow-hidde">
      <CreateToken />
    </div>
  );
}
