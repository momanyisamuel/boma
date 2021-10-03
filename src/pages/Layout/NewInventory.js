import { useState, useEffect } from "react";
import InventoryForm from "../../components/InventoryForm";
import axios from "axios";
import { Button } from "antd";
import Item from "antd/lib/list/Item";

const NewInventory = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await axios.get(
        "https://bomadistapi.herokuapp.com/api/v1/product"
      );
      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSumbit = event => {
    event.preventDefault();
    console.log(inventoryItems);
    if (inventoryItems) {
      for (let i = 0; i < inventoryItems.length; i++) {
        addInventory(
          inventoryItems[i].region,
          inventoryItems[i].productId,
          inventoryItems[i].expecting,
          inventoryItems[i].received,
          inventoryItems[i].damaged
        );
      }
    }
    window.location.reload(false);
  };

  const addInventory = async (
    region,
    productId,
    expecting,
    received,
    damaged
  ) => {
    console.log(region);
    try {
      await axios.post("https://bomadistapi.herokuapp.com/v1/inventory/", {
        region: region,
        productId: productId,
        expecting: expecting,
        received: received,
        damaged: damaged
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleItemsListChange = items => {
    setInventoryItems(items);
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="p-4">
      <form onSubmit={handleSumbit}>
        <InventoryForm
          items={inventoryItems}
          onItemListChange={handleItemsListChange}
          products={products}
        />
        <Button className="w-1/4" onClick={handleSumbit}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default NewInventory;
