import { Link } from "react-router";
import { useMemo, useState } from "react";
import Select from "react-select";
import { EditTagsModal } from "../components/EditTagsModal";
import type { Tag } from "../App";
import { Trash2 } from "lucide-react";

type NotesListProps = {
  availableTags: Tag[];
  notes: SimplifiedNote[];
  onDelete: (id: string) => void;
  onDeleteTag: (id: string) => void;
  onEditTag: (id: string, label: string) => void;
};

type SimplifiedNote = {
  id: string;
  title: string;
  tags: Tag[];
};

const NotesList = ({
  availableTags,
  notes,
  onDelete,
  onEditTag,
  onDeleteTag,
}: NotesListProps) => {
  const [title, setTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id),
          ))
      );
    });
  }, [selectedTags, notes, title]);

  return (
    <div className="max-w-7xl mx-auto ">
      <div className="flex flex-col gap-6 border border-white/80  p-5 backdrop-blur-sm sm:p-7 ">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="mt-2 text-4xl font-semibold uppercase tracking-tight text-slate-900">
              Notes
            </h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/new">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-medium text-white shadow-[0_8px_24px_rgba(59,130,246,0.22)] transition hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-200 hover:cursor-pointer"
              >
                Create
              </button>
            </Link>
            <EditTagsModal
              availableTags={availableTags}
              onDeleteTag={onDeleteTag}
              onEditTag={onEditTag}
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-slate-500"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="Search notes"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="py-2 block w-full rounded-sm border border-gray-400 bg-white px-4 text-base text-slate-900  outline-none transition placeholder:text-slate-400 focus:border-[#2196f3] focus:ring-1 focus:ring-[#2196f3] sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-slate-500"
            >
              Tags
            </label>
            <Select
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
              options={availableTags.map((tag) => ({
                label: tag.label,
                value: tag.id,
              }))}
              className="mt-2  rounded-sm  border-gray-600!"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2 xl:grid-cols-3">
          {filteredNotes.map((note) => (
            <div key={note.id}>
              <NoteCard
                id={note.id}
                title={note.title}
                tags={note.tags}
                onDelete={onDelete}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const NoteCard = ({
  id,
  title,
  tags,
  onDelete,
}: SimplifiedNote & { onDelete: (id: string) => void }) => {
  return (
    <Link to={`/${id}`} key={id}>
      <div className="group flex h-full w-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.06)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(15,23,42,0.10)] sm:p-6">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-[1.3rem] font-medium tracking-tight text-slate-900">
            {title}
          </h2>
          <button
            type="button"
            aria-label="Delete note"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete(id);
            }}
            className="cursor-pointer relative bottom-3 left-2 inline-flex items-center justify-center rounded-lg border-2 border-transparent transition  hover:bg-red-50 hover:text-red-600 text-red-400 focus:outline-none focus:ring-4 focus:ring-red-200"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag.id}
              className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500"
            >
              {tag.label}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default NotesList;
