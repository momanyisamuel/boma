const InventoryItem = ({ data, onItemDelete, idx, item, onItemsChange }) => {
  function onProductChange(event, value) {
    const newItem = item;
    try {
      newItem[event.target.name] = event.target.value || value;
      onItemsChange(newItem, idx);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex w-full p-2">
      <div className="w-full">
        <label for="product" className="text-sm mb-1 block">
          Product
        </label>
        <select
          name="productId"
          onChange={(value) => onProductChange(value)}
          className="block w-full border rounded py-2 px-2 font-light text-sm bg-white focus:outline-none"
          placeholder="Select Product"
          id=""
        >
          <option value="0">Select Product</option>
          {data?.map((item, key) => (
            <>
              <option key={item._id} value={item._id}>
                {item.pname}
              </option>
            </>
          ))}
        </select>
      </div>
      <div className="w-full ml-1">
        <label for="region" className="text-sm mb-1 block">
          Region
        </label>
        <select
          name="region"
          className="block w-full border rounded py-2 px-2 font-light text-sm bg-white focus:outline-none"
          onChange={(value) => onProductChange(value)}
        >
          <option value="0">Select Region</option>
          <option value="Malaba">Malaba</option>
          <option value="Matete">Matete</option>
          <option value="Kakamega">Kakamega</option>
          <option value="Container">Container</option>
        </select>
      </div>
      <div className="w-full ml-1">
        <label for="expecting" className="text-sm mb-1 block">
          Expecting
        </label>
        <input
          type="number"
          name="expecting"
          onChange={(event) => onProductChange(event)}
          className="block border rounded py-2 px-2 font-light text-sm"
          placeholder="0"
        />
      </div>

      <div className="w-full ml-1">
        <label for="received" className="text-sm mb-1 block">
          Received
        </label>
        <input
          type="number"
          name="received"
          onChange={(event) => onProductChange(event)}
          className="block border rounded py-2 px-2 font-light text-sm"
          placeholder="0"
        />
      </div>
      <div className="w-full ml-1">
        <label for="quantity" className="text-sm mb-1 block">
          Damaged
        </label>
        <input
          type="number"
          name="damaged"
          onChange={(event) => onProductChange(event)}
          className="block border rounded py-2 px-2 font-light text-sm"
          placeholder="0"
        />
      </div>

      <button
        className="text-sm ml-auto text-gray-500 mt-3 p-4"
        onClick={(e) => onItemDelete(idx)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
  );
};
export default InventoryItem;
