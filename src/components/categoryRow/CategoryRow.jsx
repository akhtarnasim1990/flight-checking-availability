import { useState } from "react";
import "./CategoryRow.css";
import { FaPlus, FaMinus } from "react-icons/fa6";

const CategoryRow = ({ category, counterHandler }) => {
  const [count, setCount] = useState(0);
  const increaseCountHandler = () => {
    setCount((a) => a + 1);
    counterHandler(count + 1);
  };
  const decreseCountHandler = () => {
    setCount((a) => {
      if (a > 0) {
        counterHandler(count - 1);
        return a - 1;
      }
      return 0;
    });
  };
  return (
    <div className="modal-body-container">
      <div className="category-row">
        <div className="category">{category}</div>
        <div className="category-btns">
          <button className="btn btn-primary" onClick={decreseCountHandler}>
            <FaMinus />
          </button>
          <div className="category-count">{count}</div>
          <button className="btn btn-primary" onClick={increaseCountHandler}>
            <FaPlus />
          </button>
        </div>
      </div>
      <div className="dropdown-divider border-bottom"></div>
    </div>
  );
};

export default CategoryRow;
