import "./SelectionComp.css";

const SelectionComp = () => {
  const optionCalss = ["Economy", "Premium Economy", "Business", "First"];
  return (
    <div className="custom-selection">
      <label htmlFor="formGroupExampleInput2" className="form-label">
        Preffered Class
      </label>
      <select className="form-select" id="formGroupExampleInput2" aria-label="Default select example">
        <option defaultValue>Preffered Class</option>
        {optionCalss.map((item, i) => (
          <option value={item} key={i}>
            {item}
          </option>
        ))}
        {/* <option value="2">Two</option>
        <option value="3">Three</option> */}
      </select>
    </div>
  );
};

export default SelectionComp;
