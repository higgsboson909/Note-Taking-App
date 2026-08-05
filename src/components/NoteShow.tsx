import Markdown from "react-markdown";
import Container from "./Container";
import { useNote } from "./NoteLayout";
import { Link, useNavigate } from "react-router";
type NoteShowProps = {
  onDelete: (id: string) => void;
};
export const NoteShow = ({ onDelete }: NoteShowProps) => {
  const note = useNote();
  return (
    <Container>
      <div className="mt-15 px-5">
        <div className="flex justify-between">
          <div>
            {/* for the col 1 */}
            <h1 className="font-medium text-4xl">{note.title}</h1>
            <div className="gap-2 pt-3 w-4/6  justify-start items-left flex-wrap">
              {note.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="text-truncate self-center w-min inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 inset-ring inset-ring-gray-400/20"
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>
          <div>
            {/* for the col 2 */}
            <div className="flex gap-4 ">
              <Link to="edit">
                <button
                  type="submit"
                  className="   bg-blue-400 rounded-md box-border border border-transparent hover:bg-blue-strong focus:ring-2 focus:ring-gray-500 shadow-xs font-medium leading-5 rounded-base text-md px-4 py-2.5 focus:outline-none"
                >
                  Edit
                </button>
              </Link>
              <button
                type="submit"
                className="   bg-blue-400 rounded-md box-border border border-transparent hover:bg-blue-strong focus:ring-2 focus:ring-gray-500 shadow-xs font-medium leading-5 rounded-base text-md px-4 py-2.5 focus:outline-none"
                onClick={() => {
                  onDelete(note.id);
                  useNavigate("/");
                }}
              >
                Delete
              </button>
              <Link to="..">
                <button
                  type="submit"
                  className="   bg-blue-400 rounded-md
                   box-border border border-transparent hover:bg-blue-strong focus:ring-2 focus:ring-gray-500 shadow-xs font-medium leading-5 rounded-base text-md px-4 py-2.5 focus:outline-none"
                >
                  Back
                </button>
              </Link>
            </div>
          </div>
        </div>
        <article className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl  max-w-none mt-10">
          <Markdown>{note.markdown}</Markdown>
        </article>
      </div>
    </Container>
  );
};
