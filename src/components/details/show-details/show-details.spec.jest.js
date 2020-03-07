import React from 'react';
import component from './index.js';
import { shallow } from 'enzyme';
import { mapStateToProps, mapDispatchToProps, extraProps } from './logic.js';
import { TopSpinner, ShowDetailsBody } from './view.js';

describe('ShowDetails', () => {
	describe('index', () => {
		describe('component', () => {
			it('matches the snapshot', () => {
				expect(component.displayName).toMatchInlineSnapshot(`"Connect(withProps(withInit(ShowDetailsBody)))"`);
			});
		});
	});

	describe('logic', () => {
		describe('mapStateToProps', () => {
			let map;
			beforeEach(() => {
				map = mapStateToProps(sampleState);
			});

			it('brings nameTypes from the state', () => {
				expect(map.nameTypes).toEqual([{ name: 'n', petType: 'pt' }]);
			});

			it('brings inProgress from state lookup', () => {
				expect(map.typeInProgress).toEqual('whatever');
			});
		});

		describe('extraProps', () => {
			let map;
			beforeEach(() => {
				map = extraProps({
					nameTypes: [
						{ name: 'n', petType: 'pt' },
						{ name: 'nn', petType: 'pptt' },
					],
					petName: 'n',
				});
			});

			it('brings nameTypes from the state', () => {
				expect(map.nameType).toEqual({ name: 'n', petType: 'pt' });
			});

			it('if name not found returns undefined', () => {
				map = extraProps({ nameTypes: [{ name: 'n', petType: 'pt' }], petName: 't' });
				expect(map.nameType).toBeUndefined();
			});
		});
	});

	describe('views', () => {
		describe('TopSpinner', () => {
			it('match the snapshot', () => {
				const wrapper = shallow(<TopSpinner />);
				expect(wrapper).toMatchSnapshot();
			});
		});

		describe('ShowDetailsBody', () => {
			it('match the snapshot with invalid params', () => {
				const wrapper = shallow(<ShowDetailsBody />);
				expect(wrapper).toMatchSnapshot();
			});

			it('match the snapshot with params', () => {
				const wrapper = shallow(<ShowDetailsBody petName="maloo" nameType={{ maloo: 'baloo', petType: 'paloo' }} />);
				expect(wrapper).toMatchSnapshot();
			});
		});
	});
});

const sampleState = { lookUp: { nameTypes: [{ name: 'n', petType: 'pt' }], inProgress: 'whatever' } };
