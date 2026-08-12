export default function PhoneFrame({ children }) {
  return (
    <div className="h-screen w-full bg-[#DCE3E8] flex items-center justify-center p-0 sm:p-4">
      <div className="w-full h-full sm:w-[390px] sm:h-[844px] sm:max-h-[calc(100vh-2rem)] bg-white sm:rounded-[40px] overflow-hidden sm:shadow-2xl relative flex flex-col">
        <div className="h-full w-full overflow-hidden">{children}</div>
      </div>
    </div>
  )
}
