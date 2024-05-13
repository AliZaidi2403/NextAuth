export default function UserInfo() {
  return (
    <div className="grid place-content-center h-screen">
      <div className="shadow-lg p-8 bg-zinc-300/10 flex flex-col gap-2 my-6">
        <div>
          Name : <span className="font-bold">Amaan</span>
        </div>
        <div>
          Email : <span className="font-bold">amaanzaidi567@gmail.com</span>
        </div>
        <button className="bg-red-500 text-white font-bold mt-3 px-6 py-2">
          LogOut
        </button>
      </div>
    </div>
  );
}