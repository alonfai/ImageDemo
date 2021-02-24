import styled from 'styled-components';
import { Interfaces } from 'utils';

export type Props = Interfaces.Color & Interfaces.Position;

const Component = styled.div.attrs<Props>(props => ({
  style: {
    backgroundColor: `rgb(${props.r}, ${props.g}, ${props.b})`,
    top: `${props.top}px`,
    left: `${props.left}px`,
    width: '1px',
    height: '1px',
    border: 0,
    position: 'absolute',
    padding: 0,
    margin: 0
  }
}));

const Color = Component<Props>``;

export default Color;
