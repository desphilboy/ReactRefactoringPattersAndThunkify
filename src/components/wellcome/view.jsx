import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { setPetName } from '../../redux/reducers/pageInfo.reducer.js';
import withProps from '../higher-order/with-props';

const onSubmit = ({ history, setPetName }) => ({ typedName, selectedName }) => {
  console.log('History>>>>>>>>', history);
  console.log(typedName, selectedName);
  const name = typedName || selectedName;
  setPetName(name);
  history.push('/profile');
};

const nameTypesSelector = state => state.lookUp.nameTypes;

const mapNameTypesToList = nameTypes => nameTypes.map(nt => nt.name);

const extraProps = ({ setPetName, history }) => ({
  onSubmit: onSubmit({ history, setPetName }),
});

const mapStateToProps = state => ({
  petsList: mapNameTypesToList(nameTypesSelector(state)),
});

const mapDispatchToProps = dispatch => ({
  setPetName: name => dispatch(setPetName(name)),
});

export const WellComeView = ({ petsList, handleSubmit, onSubmit }) => (
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
      <button style={{ margin: '50px' }} type="submit">
        Submit
      </button>
    </form>
  </div>
);

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withProps(extraProps),
  reduxForm({ form: 'petNameForm' }),
)(WellComeView);
