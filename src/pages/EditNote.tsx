import Container from "../components/Container";
import { NoteForm } from "../components/NoteForm";
import type { NoteData, Tag } from "../App";

import { useNote } from "../components/NoteLayout";

type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};
export const EditNote = ({
  onSubmit,
  onAddTag,
  availableTags,
}: EditNoteProps) => {
  const note = useNote();
  return (
    <Container>
      <div className="mt-10 p-5">
        <h1 className="mt-2 text-4xl font-semibold text-slate-900">Edit Note</h1>
        <NoteForm
          title={note.title}
          markdown={note.markdown}
          tags={note.tags}
          onSubmit={(data) => onSubmit(note.id, data)}
          onAddTag={onAddTag}
          availableTags={availableTags}
        />
      </div>
    </Container>
  );
};
