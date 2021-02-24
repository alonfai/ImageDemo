import styled from 'styled-components';

export type Props = {};

const Wrapper = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const Grid: React.FC<Props> = props => {
  return <Wrapper>{props.children}</Wrapper>;
};

export default Grid;
