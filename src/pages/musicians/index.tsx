import { api } from "~/utils/api";
import type { Musician } from "@prisma/client";
import { useSession } from "next-auth/react";

const Musicians = () => {
  const { data: allMusicians } = api.musician.getAll.useQuery();

  const { data: session } = useSession();

  const user = session?.user;
  const { mutate: addMusician } = api.musician.create.useMutation();

  const { mutate: deleteMusician } = api.musician.delete.useMutation();

  const handleCreateMusician = () => {
    try {
      // const result = api.post.create.useMutation();
      const result = addMusician({
        name: "Steven",
        instrument: "drums",
        phoneNumber: "201-314-1421",
        email: "scanavan@gmail.com",
      });
      console.log("result", result);

      // Access the result if needed
      // console.log(result.data);

      return result;
    } catch (error) {
      // Handle the error
      console.error("Error creating post:", error);
      throw error;
    }
  };

  const handleDeleteMusician = () => {
    try {
      const result = deleteMusician({
        id: "cls22nkbe000012p7l58fwq6l",
      });
      console.log("result", result);
      return result;
    } catch (error) {
      throw error;
    }
  };

  console.log("user", user);

  return (
    <>
      {allMusicians &&
        allMusicians.map((musician: Musician) => (
          <div className="flex" key={musician.id}>
            <p className="pr-1">{musician.name}</p>

            <p> {musician.instrument}</p>
          </div>
        ))}
      <button onClick={handleCreateMusician}>Add Musician</button>
      <button onClick={handleDeleteMusician}>Delete Musician</button>
    </>
  );
};

export default Musicians;
