import styled from "styled-components";

const InputContainer = ({ className, width, ref, ...props }) => {
  return <input className={className} {...props} ref={ref} />;
};

export const Input = styled(InputContainer)`
  padding: 12px 15px;
  border-radius: 10px;
  border: 1px solid var(--color-silver);
  width: ${({ width = "100%" }) => width};
  background-color: var(--color-silver);
  font-size: 1rem;
  box-sizing: border-box;
  outline: none;

  &::placeholder {
    color: var(--color-gray);
    font-family: var(--font-primary);
    letter-spacing: 0.1rem;
  }
`;
