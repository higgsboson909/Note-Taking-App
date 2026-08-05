import Container from "../components/Container"
import { NoteForm } from "../components/NoteForm"
import type { NoteData, Tag } from "../App"

type NewNoteProps = {
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}
export const NewNote = ({ onSubmit, onAddTag, availableTags }: NewNoteProps) => {
  return (
    <Container>
      <div className=" border border-white/80  p-5 sm:p-7">
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-900">
          New Note
        </h1>
        <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} />
      </div>
    </Container>
  )
}

