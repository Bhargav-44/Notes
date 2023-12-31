import { useGlobalContext } from "../Context";

function Notes() {
  const {
    notes,
    temp,
    timestamp,
    storeNotes,
    handleDelete,
    logOut,
    handleLogin,
    curUser,
    setCurUser,
    people,
    setTemp,
  } = useGlobalContext();

  const handleConsole = () => {
    people.forEach((el) => {
      if (el.email === curUser) {
        console.log(el.name);
      }
    });
  };

  return (
    <div className="text-center bg-[#0C1030] min-h-screen no-repeat">
      {people
        .filter((person) => person.email == curUser)
        .map((filteredPerson) => (
          <h1 className="text-4xl text-white mb-7">
            {filteredPerson.name}'s Notes
          </h1>
        ))}
      <button
        className="rounded-2xl bg-blue-500 p-2 absolute right-0 top-0 mr-4 mt-4 text-white "
        onClick={logOut}
      >
        <span className="hidden lg:inline-block">Logout</span>
      </button>
      {/* <button onClick={()=>handleConsole()}>something</button> */}
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-10 text-white mx-10">
        <div className="justify-center bg-[#24294D]  rounded-2xl backdrop-blur-xl">
          <textarea
            className="bg-[#24294D] py-8 px-4 rounded-2xl border-none  focus:outline-0 resize-none "
            required
            placeholder="Type your note..."
            value={temp}
            onChange={(e) => setTemp(e.target.value)}
            cols="30"
            rows="8"
          ></textarea>
          <button
            className="rounded-2xl bg-blue-500 p-2 absolute right-0 bottom-0 mr-4 mb-4"
            onClick={storeNotes}
          >
            Save
          </button>
        </div>

        {notes
          .filter((note) => note.user === curUser)
          .map((element) => (
            <div className="relative p-16 bg-[#24294D] rounded-2xl break-words backdrop-blur-xl">
              <p className="uppercase font-mono overflow-y-auto max-h-40">
                {element.note}
              </p>
              <p className="font-mono p-2 absolute left-0 bottom-0 mr-4 mb-4">
                {element.timestamp.toLocaleString()}
              </p>
              <button
                className="rounded-2xl bg-blue-500 p-2 absolute right-0 bottom-0 mr-3 mb-4"
                onClick={() => {
                  handleDelete(element.id);
                }}
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Notes;
