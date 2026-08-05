import { createBrowserRouter } from "react-router";
import { ErrorPage } from "./pages/ErrorPage";
import { NewNote } from "./pages/NewNote";
import type { Note, NoteData, Tag } from "./App";
import NotesList from "./components/NotesList";
import { NoteLayout } from "./components/NoteLayout";
import { NoteShow } from "./components/NoteShow";
import { EditNote } from "./pages/EditNote";

type RouteProps = {
  onCreateNote: (data: NoteData) => void;
  onUpdateNote: (id: string, data: NoteData) => void;
  onDeleteNote: (id: string) => void;
  addTag: (data: Tag) => void;
  updateTag: (id: string, label: string) => void;
  deleteTag: (id: string) => void;
  tags: Tag[];
  notesWithTags: Note[];
};
export const getRoutes = ({
  onCreateNote,
  onUpdateNote,
  onDeleteNote,
  addTag,
  updateTag,
  deleteTag,
  tags,
  notesWithTags,
}: RouteProps) => {
  return createBrowserRouter([
    {
      path: "/",
      element: (
        <NotesList
          availableTags={tags}
          notes={notesWithTags}
          onDelete={onDeleteNote}
          onEditTag={updateTag}
          onDeleteTag={deleteTag}
        ></NotesList>
      ),
      errorElement: <ErrorPage></ErrorPage>,
    },
    {
      path: "/new",
      element: (
        <NewNote
          onSubmit={onCreateNote}
          onAddTag={addTag}
          availableTags={tags}
        ></NewNote>
      ),
    },
    {
      path: "/:id",
      element: <NoteLayout notes={notesWithTags}></NoteLayout>,
      children: [
        {
          index: true,
          element: <NoteShow onDelete={onDeleteNote} />,
        },
        {
          path: "edit",
          element: (
            <EditNote
              onSubmit={onUpdateNote}
              onAddTag={addTag}
              availableTags={tags}
            />
          ),
        },
      ],
    },
  ]);
};
