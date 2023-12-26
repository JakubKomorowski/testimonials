import { Post } from "@/types/Post";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  post: Post;
}

const Table = ({ children, post }: Props) => {
  return (
    <div className=" overflow-x-auto mx-[-30px] md:mx-[-40px]">
      <table className="border-collapse  w-full ">
        <caption className="text-xl  pb-4 text-left">{children}</caption>
        <thead className="">
          <tr className="bg-bg text-white rounded-sm">
            {post.customTable.rows[0].cells.map((el: string, i: number) => (
              <th
                key={i}
                className="px-4 py-3  text-left last-of-type:rounded-tr-lg first-of-type:rounded-tl-lg"
              >
                {el}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="[&>*:nth-child(even)]:bg-gray-100">
          {post.customTable.rows.map((row: any, i: number) => {
            if (i === 0) return;
            return (
              <tr
                key={row._key}
                className="
              last-of-type:border-solid last-of-type:border-b-2 last-of-type:border-bg"
              >
                {row.cells.map((cell: string, i: number) => (
                  <td
                    key={i}
                    className="px-4 py-3 "
                    data-cell={post.customTable.rows[0].cells[i]}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
