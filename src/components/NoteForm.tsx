import { useRef, useState } from "react";
import { v4 as uuidV4 } from "uuid";

import { Link, useNavigate } from "react-router";
import type { NoteData, Tag } from "../App";
import CreatableSelect from "react-select/creatable";
type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;
export const NoteForm = ({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
}: NoteFormProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const handleSubmit = (e: any) => {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });
    navigate("..");
  };
  return (
    <div className="pt-8 bg-gray-50">
      <form onSubmit={handleSubmit}>
        <div className="">
          <div className="grid grid-cols-2 gap-x-100">
            <div className=" ">
              <label htmlFor="title" className="block text-xl font-normal pb-1">
                Title
              </label>
              <input
                id="title"
                ref={titleRef}
                type="text"
                name="title"
                placeholder=""
                defaultValue={title}
                className="py-2 block w-full rounded-sm border border-gray-400 bg-white px-4 text-base text-slate-900  outline-none transition placeholder:text-slate-400 focus:border-[#2196f3] focus:ring-1 focus:ring-[#2196f3] sm:text-sm"
              />
            </div>
            <div className="">
              <label htmlFor="tags" className="block text-xl font-normal pb-1">
                Tags
              </label>

              <CreatableSelect
                onCreateOption={(label) => {
                  const newTag = { id: uuidV4(), label };
                  onAddTag(newTag);
                  setSelectedTags((prev) => [...prev, newTag]);
                }}
                isMulti
                value={selectedTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                onChange={(tags) =>
                  setSelectedTags(
                    tags.map((tag) => ({ id: tag.value, label: tag.label })),
                  )
                }
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                className=""
              ></CreatableSelect>
            </div>
          </div>

          <div className="mt-3">
            <label
              htmlFor="message"
              className="mb-1 text-heading block text-xl font-normal"
            >
              Body
            </label>
            <textarea
              id="message"
              ref={markdownRef}
              rows={15}
              className="bg-white py-2  outline-none text-heading text-sm rounded-base transition placeholder:text-slate-400 focus:border-[#2196f3] focus:ring-1 focus:ring-[#2196f3] block w-full p-3.5 shadow-xs placeholder:text-body rounded-md border-gray-400 border border-solid"
              placeholder="Write your thoughts here..."
              defaultValue={markdown}
            ></textarea>
          </div>
          <div className="mt-5 gap-4 flex justify-end">
            {/* <button
              type="submit"
              className="   bg-blue-400 rounded-md box-border border border-transparent hover:bg-blue-strong focus:ring-2 focus:ring-gray-500 shadow-xs font-medium leading-5 rounded-base text-md px-4 py-2.5 focus:outline-none"
            >
              Publish post
            </button>

            <Link to="..">
              <button
                type="submit"
                className="   bg-white rounded-md box-border border-gray-400  border-2 shadow-xs font-medium focus:ring-2 focus:border-transparent focus:ring-gray-500 leading-5 rounded-base text-md px-4 py-2.5 focus:outline-none"
              >
                Cancel
              </button>
            </Link> */}
            <button
              type="submit"
              className="rounded-md border border-transparent bg-blue-500 px-4 py-2.5 text-sm font-medium leading-5 text-white shadow-xs transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-gray-500 hover:cursor-pointer"
            >
              Publish post
            </button>

            <Link
              to=".."
              className="inline-flex items-center justify-center rounded-md border border-gray-400 bg-white px-4 py-2.5 text-sm font-medium leading-5 text-gray-700 shadow-xs transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 "
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
