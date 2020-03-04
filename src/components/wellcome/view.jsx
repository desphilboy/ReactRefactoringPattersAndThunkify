import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { useHistory } from "react-router-dom";
import { setPetName } from "../../redux/reducers/pageInfo.reducer.js";

const Wellcome = ({ handleSubmit }) => {
  const petsList = useSelector(state =>
    state.lookUp.nameTypes.map(nameType => nameType.name)
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = ({ typedName, selectedName }) => {
    console.log(typedName, selectedName);
    const name = typedName || selectedName;
    dispatch(setPetName(name));
    history.push("/profile");
  };

  return (
    <div>
      <h1> Wellcome to best FEnders! FrEnds! website</h1>
      <h2>Hi dear beloved owner</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {!!petsList.length && (
          <div>
            please select or Input pets name:
            <Field key="1" name="selectedName" component="select" width="20">
              <option key="noValue" />
              {petsList.map((pet, index) => (
                <option key={index} value={pet}>
                  {pet}
                </option>
              ))}
            </Field>
            <br />
            or:
            <br />
          </div>
        )}
        <label>Input your pet's name: </label>
        <Field key="2" name="typedName" component="input" type="text" />
        <br />
        <button style={{ margin: "50px" }} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default reduxForm({ form: "petNameForm" })(Wellcome);
