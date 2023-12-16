import "./Modal.css";
import { FaAngleDown, FaUser } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import CategoryRow from "../categoryRow/CategoryRow";

const Modal = ({ adultHandler, childHandler, infantHandler, adult, child, infant }) => {
  return (
    <div className=" boking-modal">
      <label htmlFor="formGroupExampleInput2" className="form-label">
        Traveller(s)*
      </label>
      <button type="button" id="formGroupExampleInput2" className="btn custom-dd btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <FaUser className="eye-logo" /> <div>{adult} Adults </div> <GoDotFill className="eye-logo" /> <div>{child} Child</div>{" "}
        <GoDotFill className="eye-logo" /> <div>{infant} Infant</div> <FaAngleDown className="eye-logo" />
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{}}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Travellers
              </h1>
              {/* <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
            </div>
            <div className="modal-body">
              <CategoryRow category="Adults" counterHandler={adultHandler} />
              <CategoryRow category="Children (3-12yrs.)" counterHandler={childHandler} />
              <CategoryRow category="Infant (0-2yrs.)" counterHandler={infantHandler} />
            </div>
            <div className="modal-footer ">
              {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button> */}
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal">
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
