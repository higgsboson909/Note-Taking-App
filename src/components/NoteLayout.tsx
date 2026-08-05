import { Navigate, Outlet, useOutletContext, useParams } from "react-router";
import type { Note } from "../App";
type NoteLayoutProps = {
  notes: Note[]
}
export const NoteLayout = ({ notes }: NoteLayoutProps) => {
    const id = useParams().id;

    const note = notes.find((n) => n.id === id);
    if (!note) {
        return <Navigate to="/" />;
    }

  return (
    <Outlet context={note}></Outlet>
  )
}

export function useNote() {
    return useOutletContext<Note>(); 
}
