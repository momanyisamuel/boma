import InventoryItem from "../InventoryItem";
import { Link } from "react-router-dom";

const InventoryForm = ({ items, onItemListChange, products }) => {
  const data = products;
  function handleItemsChange(item, idx) {
    const newItems = [...items];
    newItems[idx] = item;
    // newItems[idx].total = newItems[idx].quantity * newItems[idx].price;
    onItemListChange(newItems);
  }

  function handleAddItem(e) {
    e.preventDefault();
    const newItem = {
      product: "",
      region: "",
      damaged: "",
      expecting: "",
      received: "",
    };
    onItemListChange([...items, newItem]);
  }

  function handleRemoveItem(idx) {
    const currentList = [...items];
    currentList.splice(idx, 1);
    onItemListChange(currentList);
  }

  return (
    <div>
      <div className="border-b mb-6 flex">
        <h3 className="text-2xl text-gray-500">New Inventory</h3>
        <div class="ml-auto text-gray-500 text-xs sm:inline-flex hidden items-center mb-4">
          <Link to="/inventory">
            <button className="h-8 px-3 rounded-md shadow text-gray-500 flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mt-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              <span class="mt-2 ml-2">Back to Inventory</span>
            </button>
          </Link>
        </div>
      </div>
      {items.map((item, idx) => (
        <InventoryItem
          key={idx}
          idx={idx}
          data={data}
          item={item}
          onItemsChange={handleItemsChange}
          onItemDelete={handleRemoveItem}
        />
      ))}
      <div className="w-full p-2">
        <button
          className="text-center py-2 px-2 border w-full"
          onClick={(e) => handleAddItem(e)}
        >
          Add New Item
        </button>
      </div>
    </div>
  );
};

export default InventoryForm;
