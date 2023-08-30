import { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import configuration from "../configuration.json";

function SetSelect({onSetSelected}) {
  const sets = configuration.questionSets;
  const [set, setSet] = useState(sets[0].id);

  function onChange(event){
    const { value } = event.target;
    setSet(value);
  }

  function handleSelected(){
    var selected = sets.find((x) => x.id == set);
    onSetSelected(selected);
  }

  return (
    <>
    {sets.length > 0 ? (
      <div className="grid grid-cols-12">
        <div className="col-span-12 justify-self-center">
          <select
              name={"Select set"}
              value={set}
              onChange={onChange}
              id="custom-select"
              className="mx-auto"
          >
              {sets &&
                  sets.map((s, i) => {
                      return (
                          <option key={i} value={s.id}>
                              {s.name}
                          </option>
                      );
                  })
              }
          </select>
        </div>
        {set && (
          <div className="col-span-12 justify-self-center">
            <button onClick={handleSelected} className="px-8 py-2 bg-primary rounded-full text-4xl text-white">Select</button>
          </div>
        )}
        </div>

    ) : (
      <p>Loading sets</p>
    )}
    </>
  );
}

SetSelect.propTypes = {
  onSetSelected: PropTypes.func.isRequired,
  loadConfiguration: PropTypes.func.isRequired
};

const mapStateToProps = () => {
  return {
    
  };
};

export default connect(mapStateToProps)(SetSelect);
