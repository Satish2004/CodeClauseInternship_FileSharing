import Image from "next/image";

function Placeholder() {
  return (
    <div className="flex flex-col gap-8 w-full items-center mt-12">
      <Image
        src={"/assets/empty-box.svg"}
        alt="Empty box"
        height={250}
        width={250}
        priority
        style={{ width: "250", height: "250" }}
      />
      <div className="flex text-xl items-center justify-center">
        You have no files yet, upload one now!
      </div>
      <UploadButto />
    </div>
  );
}
