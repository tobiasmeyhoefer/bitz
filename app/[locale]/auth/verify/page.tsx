const VerifyPage = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 text-center shadow">
        <h5 className="mb-2 flex flex-row items-center justify-center gap-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          Email verification 📧
        </h5>
        <div className="mb-4 font-normal text-gray-700 dark:text-gray-400">
           Please go to your email inbox and click the link for logging in
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default VerifyPage
