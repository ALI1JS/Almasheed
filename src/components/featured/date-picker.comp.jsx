




export const DateBicker = ({lableNmae, setDate})=>{

    return (
        <div className="flex justify-between p-4">
          <div className="w-1/2 mr-4">
            <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">{lableNmae}</label>
            <input
              onChange={setDate}
              type="date"
              id="start-date"
              className="mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
        </div>
    )
}