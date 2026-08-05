import { Dialog, ScrollArea } from "radix-ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Trash2 } from "lucide-react";
import type { Tag } from "../App";
type EditTagsModalProps = {
  availableTags: Tag[];
  onDeleteTag: (id: string) => void;
  onEditTag: (id: string, label: string) => void;
};
export const EditTagsModal = ({
  availableTags,
  onDeleteTag,
  onEditTag,
}: EditTagsModalProps) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button
        type="button"
        className=" hover:cursor-pointer inline-flex items-center justify-center rounded-lg border-2 border-blue-500 bg-transparent px-4 py-2 text-sm font-medium text-blue-500 shadow-[0_8px_24px_rgba(59,130,246,0.22)] transition hover:bg-blue-100 hover:border-blue-600 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
      >
        Edit Tags
      </button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-40 bg-blackA6 backdrop-blur-xs data-[state=open]:animate-overlayShow" />
      <Dialog.Content className="fixed left-1/2 top-2/4 z-50 max-h-[85vh] w-[90vw] border bg-white max-w-125 -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray1 p-6.25 shadow-(--shadow-6) focus:outline-none data-[state=open]:animate-contentShow">
        <Dialog.Title className="mb-3 text-[17px] font-medium text-mauve12">
          Edit Tags
        </Dialog.Title>

        <ScrollArea.Root
          className="relative"
          scrollbars="vertical"
          style={{ height: 400 }}
        >
          <ScrollArea.Viewport style={{ height: 400 }}>
            <div className="flex flex-col gap-2">
              {availableTags.map((tag) => (
                <div key={tag.id} className="flex w-full items-center gap-2">
                  <input
                    className="py-2 block w-full rounded-sm border border-gray-400 bg-white px-4 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#2196f3] focus:ring-1 focus:ring-[#2196f3] sm:text-sm"
                    onChange={(e) => onEditTag(tag.id, e.target.value)}
                    id={`tag-${tag.id}`}
                    value={tag.label}
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();

                      onDeleteTag(tag.id);
                    }}
                    className="p-2 border-red-400 font-medium inline-flex items-center justify-center rounded-lg border-2 transition hover:bg-red-50 hover:text-red-600 text-red-400 focus:outline-none focus:ring-4 focus:ring-red-200"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </ScrollArea.Viewport>

          <ScrollArea.Scrollbar orientation="vertical" />
        </ScrollArea.Root>
        <div className="mt-6.25 flex justify-end">
          <Dialog.Close asChild>
            <button className="inline-flex h-8.75 items-center justify-center rounded bg-green4 px-3.75 font-medium leading-none text-green11 outline-none outline-offset-1 hover:bg-green5 focus-visible:outline-2 focus-visible:outline-green6 select-none">
              Save changes
            </button>
          </Dialog.Close>
        </div>
        <Dialog.Close asChild>
          <button
            className="absolute right-2.5 top-2.5 inline-flex size-6.25 appearance-none items-center justify-center rounded-full text-violet11 bg-gray3 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
            aria-label="Close"
          >
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
