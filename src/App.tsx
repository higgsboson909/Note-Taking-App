import { v4 as uuidv4 } from "uuid";
import { RouterProvider } from "react-router";
import { getRoutes } from "./routes";
import useLocalStorage from "./useLocalStorage";
import { useMemo } from "react";
export type Note = {
  id: string;
} & NoteData;

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};
export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};
export type Tag = {
  id: string;
  label: string;
};

const initialTags: Tag[] = [
  { id: "tag-focus", label: "Focus" },
  { id: "tag-work", label: "Work" },
  { id: "tag-personal", label: "Personal" },
];

const initialNotes: RawNote[] = [
  {
    id: "note-weekly-planning",
    title: "Weekly planning",
    markdown:
      "## Priority list\n\n- Ship the notes app\n- Clean up the tag editor\n- Review the readme\n",
    tagIds: ["tag-work", "tag-focus"],
  },
  {
    id: "note-grocery-list",
    title: "Grocery list",
    markdown:
      "- Oat milk\n- Coffee\n- Tomatoes\n- Pasta\n\nRemember to use the market on the way home.",
    tagIds: ["tag-personal"],
  },
  {
    id: "note-ideas",
    title: "Feature ideas",
    markdown:
      "- Nested tags\n- Search by markdown\n- Archive notes instead of deleting them",
    tagIds: ["tag-work"],
  },
];

const App = () => {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", initialNotes);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", initialTags);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [tags, notes]);

  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidv4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  };
  const onUpdateNote = (id: string, { tags, ...data }: NoteData) => {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map((tag) => tag.id) };
        } else {
          return note;
        }
      });
    });
  };

  const onDeleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const addTag = (tag: Tag) => {
    setTags((prev) => [...prev, tag]);
  };

  const updateTag = (id: string, label: string) => {
    setTags((prevTags) =>
      prevTags.map((tag) => (tag.id === id ? { ...tag, label } : tag)),
    );
  };

  const deleteTag = (id: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag.id !== id));
  };
  const routes = useMemo(
    () =>
      getRoutes({
        onCreateNote,
        onUpdateNote,
        onDeleteNote,
        addTag,
        updateTag,
        deleteTag,
        tags,
        notesWithTags,
      }),

    [tags, notesWithTags],
  );
  return <RouterProvider router={routes}></RouterProvider>;
};

export default App;
