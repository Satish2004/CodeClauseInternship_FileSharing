import Image from "next/image";
import UploadButton from "./upload-button";

export function EmptyFiles() {
  return (
    <div className="flex flex-col gap-8 w-full items-center mt-12">
      <Image
        src={"/assets/empty-box.svg"}
        alt="Empty box"
        height={250}
        width={250}
        priority
        style={{ width: "250px", height: "250px" }}
      />
      <div className="flex text-xl items-center justify-center">
        You have no files yet, upload one now!
      </div>
      <UploadButton />
    </div>
  );
}

export function EmptyFavorite() {
  return (
    <div className="flex flex-col gap-8 w-full items-center mt-12">
      <Image
        src={"/assets/empty-favorite.svg"}
        alt="Empty box"
        height={250}
        width={250}
        priority
        style={{ width: "250px", height: "250px" }}
      />
      <div className="flex text-xl items-center justify-center">
        You have no favorites yet, add one now!
      </div>
    </div>
  );
}

export function EmptyTrash() {
  return (
    <div className="flex flex-col gap-8 w-full items-center mt-12">
      <Image
        src={"/assets/empty-trash.svg"}
        alt="Empty box"
        height={250}
        width={250}
        priority
        style={{ width: "250px", height: "250px" }}
      />
      <div className="flex text-xl items-center justify-center">
        No files in trash.
      </div>
    </div>
  );
}
