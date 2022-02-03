import React from 'react';
import Player from './Player';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

describe('Player', () => {
	const mockPlayer = {
		id: 1,
		name: 'Mock Player',
		active: false,
	}

	it('renders without error', () => {
		const props = {
			player: mockPlayer,
		}
		const wrapper = shallow(<Player {...props} />);
		expect(wrapper.length).toEqual(1);
	});

	it('renders player correctly', () => {
		const props = {
			player: mockPlayer,
		}
		const player = renderer.create(<Player {...props} />).toJSON();
		expect(player).toMatchSnapshot();
	});

	describe('handleRemoveClick', () => {
		it('should call onRemove', () => {
			const props = {
				player: mockPlayer,
				onRemoveClick: jest.fn(),
			}
			const wrapper = shallow(<Player {...props} />);
			wrapper.instance().handleRemoveClick();
			expect(props.onRemoveClick).toBeCalled();
		});

		it('doesn\'t error when onRemoveClick prop is undefined', () => {
			const props = {
				player: mockPlayer,
			}
			const wrapper = shallow(<Player {...props} />);
			expect(wrapper.instance().handleRemoveClick).not.toThrow();
		});
	});

	describe('handleCheckboxClick', () => {
		it('calls onCheckboxClick', () => {
			const props = {
				player: mockPlayer,
				onCheckboxClick: jest.fn(),
			}
			const wrapper = shallow(<Player {...props} />);
			wrapper.instance().handleCheckboxClick();
			expect(props.onCheckboxClick).toBeCalled();
		});

		it('doesn\'t error when onCheckboxClick prop is undefined', () => {
			const props = {
				player: mockPlayer,
			}
			const wrapper = shallow(<Player {...props} />);
			expect(wrapper.instance().handleCheckboxClick).not.toThrow();
		});
	});
});
